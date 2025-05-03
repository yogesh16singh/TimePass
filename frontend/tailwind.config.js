/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f0f7ff", // Light blue background
        secondary: "#3b82f6", // Blue for accents
        accent: "#2563eb", // Darker blue for highlights
        danger: "#ef4444", // Red for delete buttons
        success: "#3b82f6", // Blue for success
        dark: "#1e3a8a", // Dark blue for text
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      backgroundImage: {
        'gradient-1': 'linear-gradient(to right, #3b82f6, #1d4ed8)', // Light blue to dark blue
        'gradient-2': 'linear-gradient(to right, #60a5fa, #3b82f6)', // Sky blue to blue
        'gradient-3': 'linear-gradient(to right, #93c5fd, #60a5fa)', // Lighter blue to sky blue
        'gradient-4': 'linear-gradient(to right, #bfdbfe, #93c5fd)', // Very light blue to lighter blue
        'gradient-5': 'linear-gradient(to right, #dbeafe, #bfdbfe)', // Pale blue to very light blue
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -1px rgba(59, 130, 246, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(59, 130, 246, 0.1), 0 4px 6px -2px rgba(59, 130, 246, 0.05)',
      },
    },
  },
  plugins: [],
};
