import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();

const menuItems = [
  // Starters
  {
    name: 'Truffle Bruschetta',
    category: 'Starters',
    description: 'Toasted sourdough with truffle-infused ricotta, wild honey, and microgreens',
    price: 14,
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Seared Scallops',
    category: 'Starters',
    description: 'Pan-seared Atlantic scallops with citrus beurre blanc and crispy pancetta',
    price: 18,
    image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Burrata Salad',
    category: 'Starters',
    description: 'Fresh burrata with heirloom tomatoes, basil pesto, and aged balsamic',
    price: 16,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=400&q=80'
  },
  // Mains
  {
    name: 'Herb-Crusted Lamb Rack',
    category: 'Mains',
    description: 'New Zealand lamb with rosemary crust, served with fondant potatoes and red wine jus',
    price: 42,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Pan-Seared Sea Bass',
    category: 'Mains',
    description: 'Chilean sea bass with saffron risotto, asparagus, and lemon butter sauce',
    price: 38,
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Filet Mignon',
    category: 'Mains',
    description: '8oz prime beef tenderloin with truffle mashed potatoes and grilled vegetables',
    price: 45,
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=400&q=80'
  },
  // Desserts
  {
    name: 'Chocolate Fondant',
    category: 'Desserts',
    description: 'Warm dark chocolate cake with molten center, served with vanilla bean ice cream',
    price: 12,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Lemon Tart',
    category: 'Desserts',
    description: 'Classic French lemon tart with torched meringue and fresh berries',
    price: 10,
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=400&q=80'
  },
  {
    name: 'Crème Brûlée',
    category: 'Desserts',
    description: 'Traditional vanilla custard with caramelized sugar crust',
    price: 11,
    image: 'https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=400&q=80'
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to database...');
    
    // Create tables
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS menu_items (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        description TEXT,
        price NUMERIC(10, 2) NOT NULL,
        image TEXT
      )
    `);

    console.log('Tables created or already exist.');

    // Clear existing menu items
    await pool.query('DELETE FROM menu_items');
    console.log('Cleared existing menu items.');

    // Insert menu items
    for (const item of menuItems) {
      await pool.query(
        'INSERT INTO menu_items (name, category, description, price, image) VALUES ($1, $2, $3, $4, $5)',
        [item.name, item.category, item.description, item.price, item.image]
      );
    }

    console.log(`Inserted ${menuItems.length} menu items.`);
    console.log('Database seeded successfully!');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await pool.end();
  }
}

seedDatabase();
