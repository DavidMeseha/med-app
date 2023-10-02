import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary': '#1D5ECD',
        'highlight': '#E9EFFF',
        'strong-highlight': '#D1DDFF',
        'gray-highlight': '#F8F8F8',
        'text-black': '#000000',
        'text-white': '#FFF',
        'backcolor': '#f9faff',
        'over-cover':'#1d5ecdd6'
      }
    },
  },
  plugins: [],
}
export default config
