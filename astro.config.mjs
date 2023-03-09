import { defineConfig } from 'astro/config';

// https://astro.build/config
import react from "@astrojs/react";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  output: 'static',
  build: {
    format: 'file'
  },
  site: 'https://buushido.ml',
  integrations: [react(), sitemap()]
});