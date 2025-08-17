/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#10B981",
        accent: "#F43F5E",
        background: "#111827",
        surface: "#1F2937",
        text: "#F9FAFB",
      },
      fontFamily: {
        sans: ["'Orbitron'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(79, 70, 229, 0.7), 0 0 10px rgba(79, 70, 229, 0.5)' },
          '100%': { boxShadow: '0 0 10px rgba(79, 70, 229, 0.9), 0 0 20px rgba(79, 70, 229, 0.7), 0 0 30px rgba(79, 70, 229, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}
