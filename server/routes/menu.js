import express from 'express';
import pool from '../db.js';

const router = express.Router();

// GET /api/menu - Fetch all menu items
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM menu_items ORDER BY category, id'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

export default router;
