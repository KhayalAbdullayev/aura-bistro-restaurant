import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import menuRoutes from './routes/menu.js';
import authRoutes from './routes/auth.js';
import checkoutRoutes from './routes/checkout.js';
import webhookRoutes from './routes/webhook.js';
import ordersRoutes from './routes/orders.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Log environment configuration (without secrets)
console.log('=== SERVER STARTUP ===');
console.log('PORT:', PORT);
console.log('CLIENT_URL:', process.env.CLIENT_URL);
console.log('DATABASE_URL configured:', !!process.env.DATABASE_URL);
console.log('STRIPE_SECRET_KEY configured:', !!process.env.STRIPE_SECRET_KEY);
console.log('JWT_SECRET configured:', !!process.env.JWT_SECRET);
console.log('=====================');

// Webhook route must be BEFORE express.json() to receive raw body
app.post('/api/webhook', webhookRoutes);

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));

// Routes
app.use('/api/menu', menuRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/checkout', checkoutRoutes);
app.use('/api/orders', ordersRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'Aura Bistro API Running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
