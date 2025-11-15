// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    starlight({
      //Todo: Change title
      title: "Mach",
      sidebar: [
        {
          label: "Getting Started",
          items: ["getting-started/installation", "getting-started/hello-world"],
        },
        {
          label: "Language",
          items: ["language/variables"],
        },
      ],
    }),
  ],
});
