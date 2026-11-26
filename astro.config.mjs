// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'static',
  site: 'https://accelera.studio', // real domain (Name.com, GitHub Pages custom domain)
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'auto',
  },
  // Analytics (populated after GA4/Clarity creation)
  // VITE_ANALYTICS_GCLOUD: process.env.VITE_ANALYTICS_GCLOUD,
  // VITE_CLARITY_ID: process.env.VITE_CLARITY_ID,
});