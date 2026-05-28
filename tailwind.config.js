/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        navy: {
          DEFAULT: '#0D2340',
          mid: '#1A3A5C',
          light: '#2E5481',
        },
        accent: {
          DEFAULT: '#1D6A4A',
          alt: '#8B1A2B',
        },
        ivory: '#FAF8F4',
        paper: '#F3EFE8',
        rule: '#D9D0C3',
        muted: '#6B6560',
        body: '#2C2820',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Playfair Display', 'serif'],
        serif: ['var(--font-serif)', 'Source Serif 4', 'serif'],
        sans: ['var(--font-sans)', 'DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [  require('@tailwindcss/typography'),
   ],
}
