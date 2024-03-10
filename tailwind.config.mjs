import defaultTheme from 'tailwindcss/defaultTheme'
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");


/** @type {import('tailwindcss').Config} */


export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		
		extend: {
            fontSize: {
                xs: ['12px', '13.5px'],
                sm: ['15px', '18px'],
                base: ['17px', '21px'],
                lg: ['21px', '28px'],
                xl: ['56px', '64px'],
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
			  },
			  animation: {
				'pulse-slow': 'pulse 8s ease-out infinite',
				'bounce-slow': 'bounce 8s ease-in infinite',
				spotlight: "spotlight 2s ease .75s 1 forwards",
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
