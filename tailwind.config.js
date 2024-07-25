/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors:{
        Grite:{
          600:'#06141B',
          500:'#11212D',
          400:'#253745',
          300:'#4A5C6A',
          200:'#9BA8AB',
          100:'#CCD0CF',
        },
      }
      
    },
  },
  plugins: [],
};
