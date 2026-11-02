/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#2373F4",
        sky2: "#578EF5",
        aqua: "#65D0F4",
        butter: "#F2F7A0",
        ink: "#111827",
        tint: "#F8FAFC",
      },
      fontFamily: {
        serif: ["Playfair Display", "Arapey", "serif"],
        sans: ["Biryani", "sans-serif"],
      },
    },
  },
  plugins: [],
};
