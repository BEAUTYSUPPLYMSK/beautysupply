module.exports = {
  plugins: {
    // Tailwind v4 ships its own PostCSS plugin with built-in vendor prefixes.
    // Do not stack classic autoprefixer here — it can double-process and warn.
    '@tailwindcss/postcss': {},
  },
};
