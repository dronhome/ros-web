// tailwind.config.cjs
module.exports = {
  content: ['./src/**/*.{html,svelte,js,ts}'], // Adjust to your project structure
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        dayBlue: '#6ec6ff', // Custom blue for day mode
        nightBrown: '#5c4033', // Custom brown for night mode
        nightYellow: '#f1c40f', // Custom yellow for night highlights
      },
    },
  },
  plugins: [],
};
