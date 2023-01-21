import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";

export default defineConfig({
  integrations: [
    tailwind(),
    mdx(),
    node({
      mode: "standalone",
    }),
  ],
  output: "server",
});
