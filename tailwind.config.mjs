/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
	  extend: {
		colors: {
		  'pi-indigo': '#2D2A6E',
		  'spiced-saffron': '#C2410C',
		}
	  },
	},
	plugins: [],
  }