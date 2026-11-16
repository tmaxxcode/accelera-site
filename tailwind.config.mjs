/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        accelera: {
          // Mirrors src/styles/tokens.css (navy + orange, 2026-11-15).
          bg: '#FFFFFF',
          fg: '#0A1929',
          primary: '#1A2A47',
          cta: '#FF6B00',
          accent: '#FF6B00',
          'accent-ink': '#B84A00',
          muted: '#5B6270',
          card: '#F7F8FA',
          error: '#DC2626',
          border: '#E3E6EC',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.25rem, 5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['clamp(1.75rem, 3.5vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'subhead': ['clamp(1.125rem, 2.5vw, 1.375rem)', { lineHeight: '1.5', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '500' }],
        'small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'cta': ['1rem', { lineHeight: '1', fontWeight: '600' }],
      },
      spacing: {
        'section': 'clamp(3rem, 8vw, 6rem)',
        'container': '1280px',
        'container-padding': '24px',
      },
      animation: {
        'count-up': 'countUp 1.2s ease-out forwards',
        'fade-in': 'fadeIn 400ms ease-out forwards',
        'slide-up': 'slideUp 400ms ease-out forwards',
        'slide-down': 'slideDown 200ms ease-out forwards',
      },
      keyframes: {
        countUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}