const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./docs/*.html", "./docs/**/*.js"],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/.]+/g) || [],
  safelist: [
    /^dark:/,
    /^focus:/,
    /^hover:/,
    /^translate-/,
    /^grid-cols-/,
    /^stone-/,
    'dark',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    'focus:ring-stone-500',
    'bg-stone-300',
    'hover:bg-stone-300',
    'dark:hover:bg-stone-600',
    'hover:scale-105',
    'dark:bg-stone-600',
    'dark:text-stone-200',
    // Dark mode toggle classes
    'relative', 'inline-flex', 'items-center', 'h-6', 'w-11',
    'flex-shrink-0', 'cursor-pointer', 'rounded-full', 'border-2', 'border-transparent',
    'transition-colors', 'ease-in-out', 'duration-200',
    'bg-stone-200', 'bg-stone-600', 'bg-stone-700',
    'dark:bg-stone-500', 'dark:bg-stone-600', 'dark:bg-stone-700',
    'pointer-events-none', 'inline-block', 'h-5', 'w-5', 'rounded-full',
    'bg-white', 'shadow', 'transform', 'ring-0', 'transition', 'ease-in-out', 'duration-200',
    'flex', 'items-center', 'justify-center',
    'translate-x-0', 'translate-x-5', 'h-3.5', 'w-3.5', 'h-4', 'w-4', 'text-stone-400'
  ]
});

module.exports = {
  plugins: [
    require("@tailwindcss/postcss"),
    ...process.env.NODE_ENV === "build" ?
      [purgecss, require("cssnano")] : []
  ]
};
