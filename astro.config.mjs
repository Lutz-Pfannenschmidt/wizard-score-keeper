import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: 'https://lutz-pfannenschmidt.github.io',
  base: '/wizard-score-keeper',
  integrations: [tailwind()]
});