/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-dark": "#222831",
        "secondary-dark": "#64748B",
        "t-dark": "#EEEEEE",
        "primary-light": "#52D3D8",
        "secondary-light": "#F7418F",
        "t-light": "#222831",
      },
    },
  },
  plugins: [],
};
