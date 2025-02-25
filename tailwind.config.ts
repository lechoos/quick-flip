import type { Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';

export default {
  darkMode: ['class'],
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  safelist: [
    {
      pattern: /(bg-.*|text-.*-foreground|border-.*-border|shadow-.*-normal|shadow-.*-border)$/,
      variants: ['primary', 'secondary', 'accent', 'destructive'],
    },
    'hover:shadow-primary-hover',
    'hover:shadow-secondary-hover',
    'hover:shadow-accent-hover',
    'hover:shadow-destructive-hover',
    'focus:shadow-primary-hover',
    'focus:shadow-secondary-hover',
    'focus:shadow-accent-hover',
    'focus:shadow-destructive-hover',
  ],
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
    spacing: {
      0: '0',
      0.5: '0.5rem',
      1: '1rem',
      2: '2rem',
      3: '3rem',
      4: '4rem',
      5: '5rem',
      6: '6rem',
      7: '7rem',
      8: '8rem',
      9: '9rem',
      10: '10rem',
      12: '12rem',
      16: '16rem',
      20: '20rem',
      24: '24rem',
      28: '28rem',
      32: '32rem',
      36: '36rem',
      40: '40rem',
      44: '44rem',
      48: '48rem',
      52: '52rem',
      56: '56rem',
      60: '60rem',
      64: '64rem',
      72: '72rem',
      80: '80rem',
      96: '96rem',
    },
    extend: {
      screens: {
        sm: '576px',
        lg: '992px',
        xxl: '1300px',
      },
      fontFamily: {
        'anonymous-pro': ['var(--font-anonymous-pro)'],
        inter: ['var(--font-inter)'],
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
          border: 'hsl(var(--primary-border))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          border: 'hsl(var(--secondary-border))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
          border: 'hsl(var(--accent-border))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
          border: 'hsl(var(--destructive-border))',
        },
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
        none: '0',
        sm: '0.2rem',
        DEFAULT: '0.4rem',
        md: '0.6rem',
        lg: '0.8rem',
        xl: '1.2rem',
        '2xl': '1.6rem',
        '3xl': '2.4rem',
        full: '100%',
      },
      boxShadow: {
        'primary-normal': 'hsl(var(--primary-border)) 0px 4px 0px',
        'primary-hover': 'hsl(var(--primary-border)) 0px 8px 0px',
        'primary-border': 'hsl(var(--primary-border)) 2px 2px 0px',
        'secondary-normal': 'hsl(var(--secondary-border)) 0px 2px 0px',
        'secondary-hover': 'hsl(var(--secondary-border)) 0px 8px 0px',
        'secondary-border': 'hsl(var(--secondary-border)) 6px 6px 0px',
        'destructive-normal': 'hsl(var(--destructive-border)) 0px 4px 0px',
        'destructive-hover': 'hsl(var(--destructive-border)) 0px 8px 0px',
        'destructive-border': 'hsl(var(--destructive-border)) 2px 2px 0px',
        'accent-normal': 'hsl(var(--accent-border)) 0px 4px 0px',
        'accent-hover': 'hsl(var(--accent-border)) 0px 8px 0px',
        'accent-border': 'hsl(var(--accent-border)) 2px 2px 0px',
      },
      keyframes: {
        slideIn: {
          from: {
            transform: 'translateY(-250px)',
          },
          to: {
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        slideIn: 'slideIn 0.5s forwards',
      },
    },
  },
  plugins: [animate],
} satisfies Config;
