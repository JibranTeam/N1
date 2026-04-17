import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        forest:    { DEFAULT: '#2d5a3d', dark: '#1e3d2a', mid: '#3d7a54', light: '#5a9e70', pale: '#e4f0e8', bg: '#f0f7f2' },
        gold:      { DEFAULT: '#b8860b', light: '#d4a017', pale: '#fef9ec' },
        crimson:   { DEFAULT: '#8b1a1a', pale: '#fdf0f0' },
        sapphire:  { DEFAULT: '#1a3a6b', pale: '#eef3fb' },
        hm_slate:  { DEFAULT: '#1c2b3a', mid: '#2e4057', soft: '#6b7f94', pale: '#cdd7e2' },
        cream:     '#fdfcf9',
        primary:   { DEFAULT: '#5B7553', dark: '#3D5438', light: '#8FA888', bg: '#F0F4EE' },
        accent:    { DEFAULT: '#C4883A', light: '#F5E6D0' },
        danger:    { DEFAULT: '#C0392B', light: '#FDECEA' },
        success:   { DEFAULT: '#27AE60', light: '#EAFAF1' },
        warning:   { DEFAULT: '#F39C12', light: '#FEF9E7' },
        info:      { DEFAULT: '#2980B9', light: '#EBF5FB' },
        purple:    { DEFAULT: '#7B5EA7', light: '#F3EFF8' },
      },
      fontFamily: {
        display: ['Lora', 'serif'],
        body:    ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
