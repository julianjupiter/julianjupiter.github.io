import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import sitemap from "@astrojs/sitemap";

import { SITE_URL } from './src/consts';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [tailwind(), sitemap()]
});