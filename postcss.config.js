module.exports = {
  plugins: {
    "@tailwindcss/postcss": {},
    ...(process.env.NODE_ENV === "build" && {
      cssnano: {},
    }),
  },
};
