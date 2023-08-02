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
        customColor1: "#B6E26F",
        customColor2: "#A7E3F9",
        customColor3: "#F9F0A7",
        customColor4: "#F9BAA7",
      },
    },
  },
  plugins: [],
};
