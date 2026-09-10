/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        // MiCA-DATA — Apple-grade industrial palette
        // Canvas
        canvas: '#F5F5F7',
        titanium: '#0B0F17',
        // Single restrained accent — Deep Sapphire Blue
        sapphire: {
          DEFAULT: '#0066CC',
          ink: '#0077ED',
          bright: '#2f8cff',
          deep: '#004999',
        },
        // Verified / trust indicator only
        verified: '#059669',
        // Type
        primary: '#F5F5F7',
        muted: '#86868B',
        hairline: 'rgba(255, 255, 255, 0.1)',
        // shadcn compatibility (dark)
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'Inter',
          'Plus Jakarta Sans',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        display: [
          '-apple-system',
          'BlinkMacSystemFont',
          'SF Pro Display',
          'Inter',
          'Plus Jakarta Sans',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      boxShadow: {
        soft: '0 12px 40px rgba(0, 0, 0, 0.45)',
        titanium:
          '0 0 0 1px rgba(255, 255, 255, 0.22), 0 24px 70px rgba(0, 0, 0, 0.55)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        '4xl': '2rem',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
