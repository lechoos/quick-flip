import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontSize: {
      xs: ['1.2rem', { lineHeight: '1.6rem' }],
      sm: ['1.4rem', { lineHeight: '2rem' }],
      base: ['1.6rem', { lineHeight: '2.4rem' }],
      lg: ['1.8rem', { lineHeight: '2.8rem' }],
      xl: ['2rem', { lineHeight: '3rem' }],
      '2xl': ['2.4rem', { lineHeight: '3.2rem' }],
      '3xl': ['3rem', { lineHeight: '3.6rem' }],
      '4xl': ['3.6rem', { lineHeight: '4rem' }],
      '5xl': ['4.8rem', { lineHeight: '1' }],
      '6xl': ['6rem', { lineHeight: '1' }],
      '7xl': ['7.2rem', { lineHeight: '1' }],
      '8xl': ['9.6rem', { lineHeight: '1' }],
      '9xl': ['12.8rem', { lineHeight: '1' }],
    },
    extend: {
      screens: {
        sm: '576px',
        lg: '992px',
        xxl: '1300px',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        sm: 'calc(var(--radius) - 4px)',
        DEFAULT: '0.4rem',
        md: 'calc(var(--radius) - 2px)',
        lg: 'var(--radius)',
        xl: '1.2rem',
        '2xl': '1.6rem',
        '3xl': '2.4rem',
        full: '100%',
      },
    },
  },
  plugins: [animate],
} satisfies Config;
