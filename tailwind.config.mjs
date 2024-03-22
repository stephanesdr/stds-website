import defaultTheme from 'tailwindcss/defaultTheme'
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");


/** @type {import('tailwindcss').Config} */


export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		
		extend: {
            fontSize: {
                xs: ['12px', '13.5px'],
                sm: ['15px', '18px'],
                base: ['17px', '22px'],
                lg: ['21px', '28px'],
                xl: ['34px', '40px'],
            },
			fontFamily: {
				sans: ['Interphase', ...defaultTheme.fontFamily.sans],
				serif: ['Tekst', ...defaultTheme.fontFamily.serif]
			  },
			  keyframes: {
				spotlight: {
					"0%": {
					  opacity: 0,
					  transform: "translate(-72%, -62%) scale(0.5)",
					},
					"100%": {
					  opacity: 1,
					  transform: "translate(-50%,-40%) scale(1)",
					},
				  },
				  moveHorizontal: {
					"0%": {
					  transform: "translateX(-50%) translateY(-10%)",
					},
					"50%": {
					  transform: "translateX(50%) translateY(10%)",
					},
					"100%": {
					  transform: "translateX(-50%) translateY(-10%)",
					},
				  },
				  moveInCircle: {
					"0%": {
					  transform: "rotate(0deg)",
					},
					"50%": {
					  transform: "rotate(180deg)",
					},
					"100%": {
					  transform: "rotate(360deg)",
					},
				  },
				  moveVertical: {
					"0%": {
					  transform: "translateY(-8%)",
					},
					"50%": {
					  transform: "translateY(8%)",
					},
					"80%": {
					  transform: "translateY(-8%)",
					},
				  },
			  },
			  animation: {
				'pulse-slow': 'pulse 8s ease-out infinite',
				'bounce-slow': 'bounce 8s ease-in infinite',
				spotlight: "spotlight 2s ease .75s 1 forwards",

				first: "moveVertical 30s ease infinite",
				second: "moveInCircle 20s reverse infinite",
				third: "moveInCircle 40s linear infinite",
				// fourth: "moveHorizontal 40s ease infinite",
				// fifth: "moveInCircle 20s ease infinite",

			  },

		},
	},
	plugins: [
		addVariablesForColors,
	],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
	let allColors = flattenColorPalette(theme("colors"));
	let newVars = Object.fromEntries(
	  Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);
   
	addBase({
	  ":root": newVars,
	});
  }
