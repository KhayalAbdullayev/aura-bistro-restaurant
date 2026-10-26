/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2c3e50',
        secondary: '#e67e22',
        accent: '#3498db',
        dark: '#121212',
      },
    },
  },
  plugins: [],
}
