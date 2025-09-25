import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

import vercel from '@astrojs/vercel';

export default defineConfig({
  integrations: [tailwind(), mdx(), sitemap()],
  site: 'https://www.restopi.com',
  adapter: vercel()
});