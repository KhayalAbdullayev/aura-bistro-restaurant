import express from 'express';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/', requireAuth, async (req, res) => {
  const client = await pool.connect();
  
  try {
    console.log('CHECKOUT: Starting checkout process');
    
    const { items } = req.body;
    const userId = req.user.id;

    console.log('CHECKOUT: User ID:', userId);
    console.log('CHECKOUT: Items received:', items);

    if (!items || items.length === 0) {
      console.error('CHECKOUT ERROR: No items provided');
      return res.status(400).json({ error: 'No items provided' });
    }

    // Check if Stripe secret key is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('CHECKOUT ERROR: STRIPE_SECRET_KEY not configured');
      return res.status(500).json({ error: 'Stripe not configured on server' });
    }

    await client.query('BEGIN');

    // Fetch menu items from database to get actual prices
    // Convert item IDs to numbers to ensure correct type
    const itemIds = items.map(item => parseInt(item.id));
    console.log('CHECKOUT: Fetching items with IDs:', itemIds);
    
    const result = await client.query(
      'SELECT id, name, price FROM menu_items WHERE id = ANY($1)',
      [itemIds]
    );

    const menuItems = result.rows;
    console.log('CHECKOUT: Found menu items:', menuItems.length);
    
    const menuItemsMap = new Map(menuItems.map(item => [item.id, item]));

    // Calculate total and prepare order items
    let totalAmount = 0;
    const orderItemsData = [];

    for (const item of items) {
      const itemId = parseInt(item.id);
      const menuItem = menuItemsMap.get(itemId);
      
      if (!menuItem) {
        console.error(`CHECKOUT ERROR: Menu item with id ${itemId} not found`);
        throw new Error(`Menu item with id ${itemId} not found`);
      }

      const subtotal = menuItem.price * item.quantity;
      totalAmount += subtotal;

      orderItemsData.push({
        menu_item_id: itemId,
        quantity: item.quantity,
        unit_price: menuItem.price
      });
    }

    console.log('CHECKOUT: Total amount:', totalAmount);
    console.log('CHECKOUT: Creating order...');

    // Create order
    const orderResult = await client.query(
      'INSERT INTO orders (user_id, total_amount, status) VALUES ($1, $2, $3) RETURNING id',
      [userId, totalAmount, 'pending']
    );

    const orderId = orderResult.rows[0].id;
    console.log('CHECKOUT: Order created with ID:', orderId);

    // Insert order items
    for (const orderItem of orderItemsData) {
      await client.query(
        'INSERT INTO order_items (order_id, menu_item_id, quantity, unit_price) VALUES ($1, $2, $3, $4)',
        [orderId, orderItem.menu_item_id, orderItem.quantity, orderItem.unit_price]
      );
    }

    await client.query('COMMIT');
    console.log('CHECKOUT: Database transaction committed');

    // Import stripe here to avoid issues if not configured
    const stripe = (await import('stripe')).default(process.env.STRIPE_SECRET_KEY);
    console.log('CHECKOUT: Stripe initialized');

    // Create Stripe Checkout Session
    console.log('CHECKOUT: Creating Stripe session...');
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: orderItemsData.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: menuItemsMap.get(item.menu_item_id).name
          },
          unit_amount: Math.round(item.unit_price * 100)
        },
        quantity: item.quantity
      })),
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/?canceled=true`,
      client_reference_id: orderId.toString(),
      metadata: {
        orderId: orderId.toString(),
        userId: userId.toString()
      }
    });

    console.log('CHECKOUT: Stripe session created:', session.id);

    // Update order with stripe session id
    await pool.query(
      'UPDATE orders SET stripe_session_id = $1 WHERE id = $2',
      [session.id, orderId]
    );

    console.log('CHECKOUT: Order updated with session ID');
    res.json({ url: session.url });

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('CHECKOUT ERROR:', error.message);
    console.error('CHECKOUT ERROR STACK:', error.stack);
    res.status(500).json({ error: error.message || 'Failed to create checkout session' });
  } finally {
    client.release();
  }
});

export default router;
