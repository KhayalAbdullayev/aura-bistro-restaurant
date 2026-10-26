import express from 'express';
import pool from '../db.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/session/:sessionId', requireAuth, async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user.id;

    console.log('ORDERS: Fetching order for session:', sessionId, 'user:', userId);

    const orderResult = await pool.query(
      `SELECT o.id, o.total_amount, o.status, o.created_at, 
              oi.quantity, oi.unit_price, 
              mi.name as item_name, mi.image as item_image
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       LEFT JOIN menu_items mi ON oi.menu_item_id = mi.id
       WHERE o.stripe_session_id = $1 AND o.user_id = $2
       ORDER BY o.id DESC`,
      [sessionId, userId]
    );

    console.log('ORDERS: Found', orderResult.rows.length, 'rows');

    if (orderResult.rows.length === 0) {
      console.log('ORDERS: Order not found, returning pending status');
      return res.status(200).json({ status: 'pending', items: [] });
    }

    const order = {
      id: orderResult.rows[0].id,
      total_amount: orderResult.rows[0].total_amount,
      status: orderResult.rows[0].status,
      created_at: orderResult.rows[0].created_at,
      items: orderResult.rows.map(row => ({
        name: row.item_name,
        quantity: row.quantity,
        price: row.unit_price,
        image: row.item_image,
        subtotal: row.quantity * row.unit_price
      }))
    };

    console.log('ORDERS: Returning order with status:', order.status);
    res.json(order);
  } catch (error) {
    console.error('ORDERS ERROR:', error.message);
    console.error('ORDERS ERROR STACK:', error.stack);
    res.status(500).json({ error: error.message || 'Failed to fetch order' });
  }
});

export default router;
