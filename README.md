# Aura Bistro

A modern, componentized React application for a fictional fine dining restaurant, built with Vite and styled with Tailwind CSS.

## Project Overview

Aura Bistro is a single-page restaurant website featuring:
- Sticky navigation with mobile-responsive menu toggle
- Hero section with gradient background and call-to-action
- About section with restaurant story and imagery
- Interactive menu with category filtering and quantity selection
- Reservation form with controlled inputs
- Footer with business hours, contact info, and social links

## Tech Stack

- **React 19.3.1** - UI library for building component-based interfaces
- **Vite 8.3.4** - Fast build tool and development server
- **Tailwind CSS 3.4.17** - Utility-first CSS framework for styling
- **PostCSS & Autoprefixer** - CSS processing and browser compatibility

## Component Structure

```
src/
├── components/
│   ├── Header.jsx          - Sticky navigation with mobile menu toggle
│   ├── Hero.jsx            - Full-width hero with gradient and CTA
│   ├── About.jsx           - Restaurant story and image layout
│   ├── Menu.jsx            - Category filtering and menu display
│   ├── MenuItem.jsx        - Individual dish with quantity stepper
│   ├── QuantityStepper.jsx - Reusable controlled component
│   ├── Reservation.jsx     - Controlled form with validation
│   └── Footer.jsx          - Business info and social links
├── data/
│   └── menuData.js         - Hardcoded menu items array
├── App.jsx                 - Main component composition
├── main.jsx                - React entry point
└── index.css               - Tailwind directives
```

## How useState Handles Category Filtering

The `Menu.jsx` component uses React's `useState` hook to manage the selected category:

```javascript
const [selectedCategory, setSelectedCategory] = useState('All');
```

- **Initial State**: Set to `'All'` to show all menu items by default
- **State Updates**: When a category button is clicked, `setSelectedCategory` updates the state
- **Filtering Logic**: The component filters the `menuData` array based on the current `selectedCategory` value
- **Re-rendering**: React automatically re-renders the component when state changes, displaying only the filtered items

The filtering is performed with:
```javascript
const filteredItems = selectedCategory === 'All'
  ? menuData
  : menuData.filter(item => item.category === selectedCategory);
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

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the displayed local URL (typically `http://localhost:5173`)

### Building for Production

Create an optimized production build:
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## Features

- **Mobile-First Design**: All components use Tailwind's responsive utilities (`sm:`, `md:`, `lg:`) for optimal viewing on all devices
- **Zero Horizontal Scroll**: Root container has `overflow-x-hidden` to prevent horizontal scrolling
- **Interactive Menu**: Filter by category and adjust quantities with the stepper component
- **Form Validation**: Reservation form uses HTML5 validation and controlled inputs
- **Sticky Navigation**: Header stays visible while scrolling with mobile hamburger menu
- **Custom Theme**: Tailwind config extends with custom colors (primary, secondary, accent, dark)

## Data Structure

Menu items are stored in `src/data/menuData.js` as an array of objects:

```javascript
{
  id: number,
  name: string,
  category: 'Starters' | 'Mains' | 'Desserts',
  description: string,
  price: number,
  image: string (Unsplash URL)
}
```

## License

© 2024 Aura Bistro. All rights reserved.

