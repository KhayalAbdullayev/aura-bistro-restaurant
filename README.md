# Aura Bistro

A full-stack restaurant web application with Node.js/Express backend, PostgreSQL database (Neon), JWT authentication, and React frontend.

## Project Overview

Aura Bistro is a complete full-stack application featuring:
- **Backend**: Node.js + Express REST API with PostgreSQL database
- **Frontend**: React with Tailwind CSS for responsive UI
- **Authentication**: JWT-based auth with bcrypt password hashing
- **Database**: PostgreSQL (Neon) with users and menu_items tables
- **Features**: User registration/login, menu filtering, quantity selection, reservation form

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express 4.21.2** - Web framework
- **PostgreSQL (pg 8.13.1)** - Database
- **bcryptjs 2.4.3** - Password hashing
- **jsonwebtoken 9.0.2** - JWT token generation
- **cors 2.8.5** - Cross-origin resource sharing
- **dotenv 16.4.7** - Environment variable management

### Frontend
- **React 19.3.1** - UI library
- **Vite 8.3.4** - Build tool and dev server
- **Tailwind CSS 3.4.17** - Utility-first CSS framework

## Project Architecture

```
aura-bistro/
├── server/                          # Backend API
│   ├── index.js                    # Express app entry point
│   ├── db.js                       # PostgreSQL connection pool
│   ├── schema.sql                  # Database schema definition
│   ├── seed.js                     # Database seeding script
│   ├── routes/
│   │   ├── menu.js                 # Menu API endpoints
│   │   └── auth.js                 # Authentication endpoints
│   ├── package.json                # Backend dependencies
│   └── .env.example                # Backend env template
├── src/                            # Frontend React App
│   ├── components/
│   │   ├── Header.jsx              # Navigation with auth state
│   │   ├── Hero.jsx                # Hero section
│   │   ├── About.jsx               # About section
│   │   ├── Menu.jsx                # Menu with API integration
│   │   ├── MenuItem.jsx            # Individual menu item
│   │   ├── QuantityStepper.jsx     # Reusable stepper component
│   │   ├── Reservation.jsx         # Reservation form
│   │   ├── Footer.jsx              # Footer component
│   │   └── AuthModal.jsx           # Sign in/Sign up modal
│   ├── context/
│   │   └── AuthContext.jsx         # Authentication state management
│   ├── data/
│   │   └── menuData.js             # Legacy hardcoded menu data
│   ├── App.jsx                     # Main component
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Tailwind directives
├── .env.example                    # Frontend env template
├── package.json                    # Frontend dependencies
├── tailwind.config.js              # Tailwind configuration
└── README.md                       # This file
```

## Database Schema

### users table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Purpose**: Stores user account information for authentication.

**Fields**:
- `id`: Auto-incrementing primary key
- `name`: User's full name
- `email`: Unique email address for login
- `password`: Hashed password (bcrypt)
- `created_at`: Account creation timestamp

### menu_items table
```sql
CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  image TEXT
);
```

**Purpose**: Stores restaurant menu items with pricing and images.

**Fields**:
- `id`: Auto-incrementing primary key
- `name`: Dish name
- `category`: Menu category (Starters, Mains, Desserts)
- `description`: Detailed dish description
- `price`: Item price (numeric with 2 decimal places)
- `image`: URL to dish image (Unsplash)

## Authentication Flow

### 1. User Registration (Sign Up)

**Frontend**: User submits name, email, password via `AuthModal.jsx`

**Backend** (`POST /api/auth/signup`):
1. Check if email already exists in database
2. Hash password using `bcrypt.hash(password, 10)` (10 salt rounds)
3. Insert user into `users` table with hashed password
4. Generate JWT token with user ID payload
5. Return `{ user, token }` to frontend

**Frontend**:
1. Store token in `localStorage.setItem('token', token)`
2. Update AuthContext state with user and token
3. Close modal and update UI to show logged-in state

### 2. User Login

**Frontend**: User submits email, password via `AuthModal.jsx`

**Backend** (`POST /api/auth/login`):
1. Find user by email in database
2. If user exists, compare password using `bcrypt.compare(password, hashedPassword)`
3. If password matches, generate JWT token
4. Return `{ user, token }` to frontend

**Frontend**:
1. Store token in `localStorage`
2. Update AuthContext state
3. Close modal and update UI

### 3. Session Persistence

**On Page Load** (`AuthContext.jsx` `useEffect`):
1. Check `localStorage.getItem('token')`
2. If token exists, call `GET /api/auth/me` with `Authorization: Bearer <token>` header
3. Backend verifies JWT signature and returns user data
4. Frontend updates AuthContext with user state
5. User remains logged in across page refreshes

### 4. Logout

**Frontend**:
1. Call `logout()` from AuthContext
2. Remove token from `localStorage`
3. Clear user and token state
4. Update UI to show logged-out state

## API Endpoints

### Menu Endpoints

**GET /api/menu**
- Returns all menu items ordered by category
- Response: `[{ id, name, category, description, price, image }, ...]`

### Authentication Endpoints

**POST /api/auth/signup**
- Body: `{ name, email, password }`
- Creates new user account
- Returns: `{ user: { id, name, email }, token }`

**POST /api/auth/login**
- Body: `{ email, password }`
- Authenticates existing user
- Returns: `{ user: { id, name, email }, token }`

**GET /api/auth/me**
- Headers: `Authorization: Bearer <token>`
- Returns current user data
- Response: `{ user: { id, name, email } }`

## Environment Setup

### Backend (server/)

1. Copy environment template:
```bash
cd server
cp .env.example .env
```

2. Edit `.env` with your values:
```
PORT=5000
DATABASE_URL=postgres://user:password@ep-your-project.neon.tech/neondb?sslmode=require
JWT_SECRET=your_super_secret_jwt_key_change_this
CLIENT_URL=http://localhost:5173
```

3. Install dependencies:
```bash
cd server
npm install
```

4. Seed the database:
```bash
npm run seed
```

5. Start the server:
```bash
npm run dev
```

### Frontend (root)

1. Copy environment template:
```bash
cp .env.example .env
```

2. Edit `.env` (optional, defaults to localhost:5000):
```
VITE_API_URL=http://localhost:5000
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

## Deployment

### Backend Deployment (Render/Railway)

1. **Prepare for deployment**:
   - Ensure `.env` is in `.gitignore`
   - Push code to GitHub
   - Create a PostgreSQL database (Neon recommended)

2. **Deploy to Render**:
   - Connect GitHub repository to Render
   - Select "Web Service"
   - Set build command: `cd server && npm install`
   - Set start command: `cd server && node index.js`
   - Add environment variables in Render dashboard:
     - `DATABASE_URL`: Your Neon connection string
     - `JWT_SECRET`: Generate a secure random string
     - `CLIENT_URL`: Your frontend URL (e.g., https://your-app.vercel.app)
     - `PORT`: 5000 (or let Render assign)

3. **Run seed script** (one-time):
   - Use Render's "Shell" feature or deploy a separate seed job
   - Run: `node seed.js`

### Frontend Deployment (Vercel)

1. **Prepare for deployment**:
   - Update `.env` with production API URL
   - Push code to GitHub

2. **Deploy to Vercel**:
   - Connect GitHub repository to Vercel
   - Vercel will auto-detect Vite + React
   - Add environment variable in Vercel dashboard:
     - `VITE_API_URL`: Your deployed backend URL (e.g., https://your-api.onrender.com)

3. **Build settings** (auto-configured):
   - Build command: `npm run build`
   - Output directory: `dist`

## How useState Handles Category Filtering

The `Menu.jsx` component uses React's `useState` hook to manage the selected category:

```javascript
const [selectedCategory, setSelectedCategory] = useState('All');
```

- **Initial State**: Set to `'All'` to show all menu items by default
- **State Updates**: When a category button is clicked, `setSelectedCategory` updates the state
- **Filtering Logic**: The component filters the fetched menu items array based on the current `selectedCategory` value
- **Re-rendering**: React automatically re-renders the component when state changes, displaying only the filtered items

The filtering is performed with:
```javascript
const filteredItems = selectedCategory === 'All'
  ? menuItems
  : menuItems.filter(item => item.category === selectedCategory);
```

## How QuantityStepper Operates as a Reusable Controlled Component

The `QuantityStepper` is a controlled component that receives its state and update functions as props:

**Props:**
- `quantity` (number) - Current quantity value
- `onIncrement` (function) - Callback to increase quantity
- `onDecrement` (function) - Callback to decrease quantity

**Controlled Pattern:**
1. Parent component (`MenuItem.jsx`) manages the actual state with `useState`
2. Parent passes the current quantity and update functions to `QuantityStepper`
3. `QuantityStepper` renders UI but doesn't manage state internally
4. When user clicks +/- buttons, `QuantityStepper` calls the parent-provided callbacks
5. Parent updates its state and re-renders with new quantity

This pattern makes `QuantityStepper` reusable across different contexts since it doesn't contain business logic about what the quantity represents.

## Build and Run Instructions

### Development (Local)

1. **Setup Backend**:
```bash
cd server
npm install
cp .env.example .env
# Edit .env with your DATABASE_URL and JWT_SECRET
npm run seed
npm run dev
```

2. **Setup Frontend** (new terminal):
```bash
npm install
cp .env.example .env
npm run dev
```

3. **Access Application**:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - API Health Check: http://localhost:5000/

### Production Build

**Frontend**:
```bash
npm run build
```

**Backend**:
```bash
cd server
npm start
```

## Security Considerations

- **Passwords**: Never stored in plain text. Always hashed with bcrypt before database storage.
- **JWT Secrets**: Never commit to git. Use environment variables. Generate strong random secrets.
- **Environment Variables**: `.env` files are in `.gitignore`. Use `.env.example` as templates.
- **CORS**: Configured to allow requests from specific frontend URL in production.
- **SQL Injection**: Using parameterized queries with `pg` library prevents SQL injection.

## License

© 2026 Aura Bistro. All rights reserved.

