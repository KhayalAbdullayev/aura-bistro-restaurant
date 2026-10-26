import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    const stripe = (await import('stripe')).default(process.env.STRIPE_SECRET_KEY);
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('WEBHOOK: Signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log('WEBHOOK: Received event:', event.type);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const sessionId = session.id;
    const orderId = session.metadata?.orderId;

    console.log('WEBHOOK: Checkout session completed:', sessionId);
    console.log('WEBHOOK: Order ID from metadata:', orderId);

    try {
      // Try to update by stripe_session_id first (more reliable)
      const result = await pool.query(
        'UPDATE orders SET status = $1 WHERE stripe_session_id = $2 RETURNING id',
        ['paid', sessionId]
      );

      if (result.rows.length > 0) {
        console.log(`WEBHOOK: Order ${result.rows[0].id} marked as paid via session_id`);
      } else if (orderId) {
        // Fallback: try updating by order ID from metadata
        const fallbackResult = await pool.query(
          'UPDATE orders SET status = $1 WHERE id = $2 RETURNING id',
          ['paid', orderId]
        );
        if (fallbackResult.rows.length > 0) {
          console.log(`WEBHOOK: Order ${fallbackResult.rows[0].id} marked as paid via order_id`);
        } else {
          console.error('WEBHOOK: Order not found for session:', sessionId);
        }
      } else {
        console.error('WEBHOOK: No order_id in metadata and no match by session_id');
      }
    } catch (error) {
      console.error('WEBHOOK: Error updating order status:', error.message);
      console.error('WEBHOOK: Error stack:', error.stack);
    }
  }

  res.json({ received: true });
});

export default router;
