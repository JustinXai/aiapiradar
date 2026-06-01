import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://aiapiradar.com',
  output: 'static',
  build: {
    assets: '_assets',
  },
});
