import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://делочести.рф',
  integrations: [react(), sitemap()],
});
