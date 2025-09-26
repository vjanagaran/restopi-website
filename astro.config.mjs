import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  integrations: [
    tailwind(), 
    mdx(), 
    sitemap({
      // Sitemap configuration options
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      // Custom function to add/modify/filter sitemap entries
      customPages: [],
      // i18n configuration if needed
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en-US',
        },
      },
      // Specific page configurations
      serialize(item) {
        // Customize priority and changefreq for specific pages
        if (item.url === 'https://www.restopi.com/') {
          item.changefreq = 'daily';
          item.priority = 1.0;
        } else if (item.url.includes('/segments/')) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/solutions/')) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/calculator')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        } else if (item.url.includes('/about') || item.url.includes('/contact')) {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        }
        return item;
      }
    })
  ],
  site: 'https://www.restopi.com',
  adapter: vercel()
});