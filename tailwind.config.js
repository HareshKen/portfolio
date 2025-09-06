import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    // "./mdx-components.tsx",
    // "content/**/*.mdx",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      typography: {
        quoteless: {
          css: {
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:first-of-type::after": { content: "none" },
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        display: ["var(--font-calsans)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(50% 50% at 50% 50%, var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-shimmer": "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
      },
      boxShadow: {
        'glow': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-lg': '0 0 40px rgba(59, 130, 246, 0.4)',
        'inner-glow': 'inset 0 0 20px rgba(59, 130, 246, 0.1)',
      },
      animation: {
        // Existing animations with improvements
        "fade-in": "fade-in 1s ease-in-out forwards",
        "fade-out": "fade-out 0.5s ease-in-out forwards",
        "slide-up": "slide-up 0.6s ease-out forwards",
        "slide-down": "slide-down 0.6s ease-out forwards",
        "scale-in": "scale-in 0.4s ease-out forwards",
        "bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
        
        // Title and hero animations
        "title": "title 1.2s ease-out forwards",
        "title-glow": "title-glow 3s ease-in-out infinite alternate",
        
        // Directional fades
        "fade-left": "fade-left 1s ease-in-out forwards",
        "fade-right": "fade-right 1s ease-in-out forwards",
        "fade-up": "fade-up 0.8s ease-out forwards",
        
        // Glow and pulse effects
        "glow": "glow 2s ease-in-out infinite alternate",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        
        // Rotation and spin
        "spin-slow": "spin 3s linear infinite",
        "spin-reverse": "spin-reverse 3s linear infinite",
        
        // Shimmer and loading
        "shimmer": "shimmer 2s ease-in-out infinite",
        "loading": "loading 1.5s ease-in-out infinite",
        
        // Hover effects
        "float": "float 6s ease-in-out infinite",
        "wobble": "wobble 1s ease-in-out",
      },
      keyframes: {
        // Enhanced fade animations
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-out": {
          "0%": {
            opacity: "1",
            transform: "translateY(0)",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
        },
        
        // Slide animations
        "slide-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "slide-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        
        // Scale animation
        "scale-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.9)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        
        // Gentle bounce
        "bounce-gentle": {
          "0%, 100%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
          "50%": {
            transform: "translateY(-5px)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
        },
        
        // Directional fades
        "fade-left": {
          "0%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
          "30%": {
            transform: "translateX(0%)",
            opacity: "1",
          },
          "100%": {
            opacity: "0.3",
          },
        },
        "fade-right": {
          "0%": {
            transform: "translateX(-100%)",
            opacity: "0",
          },
          "30%": {
            transform: "translateX(0%)",
            opacity: "1",
          },
          "100%": {
            opacity: "0.3",
          },
        },
        
        // Enhanced title animation
        "title": {
          "0%": {
            "line-height": "0%",
            "letter-spacing": "0.25em",
            opacity: "0",
            transform: "scale(0.8)",
          },
          "25%": {
            "line-height": "0%",
            opacity: "0",
          },
          "50%": {
            opacity: "0.5",
            transform: "scale(0.9)",
          },
          "80%": {
            opacity: "1",
            transform: "scale(1)",
          },
          "100%": {
            "line-height": "100%",
            opacity: "1",
            transform: "scale(1)",
          },
        },
        
        "title-glow": {
          "0%": {
            "text-shadow": "0 0 20px rgba(255,255,255,0.1)",
          },
          "100%": {
            "text-shadow": "0 0 30px rgba(255,255,255,0.3), 0 0 40px rgba(59,130,246,0.2)",
          },
        },
        
        // Glow effects
        "glow": {
          "0%": {
            opacity: "0.5",
            filter: "brightness(0.8)",
          },
          "100%": {
            opacity: "1",
            filter: "brightness(1.2)",
          },
        },
        
        "pulse-slow": {
          "0%, 100%": {
            opacity: "0.7",
          },
          "50%": {
            opacity: "1",
          },
        },
        
        "pulse-glow": {
          "0%, 100%": {
            "box-shadow": "0 0 5px rgba(59, 130, 246, 0.3)",
          },
          "50%": {
            "box-shadow": "0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.3)",
          },
        },
        
        // Rotation
        "spin-reverse": {
          "from": {
            transform: "rotate(360deg)",
          },
          "to": {
            transform: "rotate(0deg)",
          },
        },
        
        // Shimmer effect
        "shimmer": {
          "0%": {
            "background-position": "-200px 0",
          },
          "100%": {
            "background-position": "calc(200px + 100%) 0",
          },
        },
        
        // Loading animation
        "loading": {
          "0%": {
            transform: "translateX(-100%)",
          },
          "50%": {
            transform: "translateX(0%)",
          },
          "100%": {
            transform: "translateX(100%)",
          },
        },
        
        // Float effect
        "float": {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
        
        // Wobble effect
        "wobble": {
          "0%": {
            transform: "translateX(0%)",
          },
          "15%": {
            transform: "translateX(-25%) rotate(-5deg)",
          },
          "30%": {
            transform: "translateX(20%) rotate(3deg)",
          },
          "45%": {
            transform: "translateX(-15%) rotate(-3deg)",
          },
          "60%": {
            transform: "translateX(10%) rotate(2deg)",
          },
          "75%": {
            transform: "translateX(-5%) rotate(-1deg)",
          },
          "100%": {
            transform: "translateX(0%)",
          },
        },
      },
      
      // Transition timing functions
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'snappy': 'cubic-bezier(0.4, 0, 1, 1)',
      },
      
      // Custom transition durations
      transitionDuration: {
        '250': '250ms',
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
        '1500': '1500ms',
        '2000': '2000ms',
      },
    },
  },
  plugins: [
    // Add custom plugin for utilities
    function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0,0,0,0.10)',
        },
        '.text-shadow-md': {
          textShadow: '0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)',
        },
        '.text-shadow-lg': {
          textShadow: '0 15px 30px rgba(0,0,0,0.11), 0 5px 15px rgba(0,0,0,0.08)',
        },
        '.text-shadow-none': {
          textShadow: 'none',
        },
      }
      
      addUtilities(newUtilities)
    }
  ],
};