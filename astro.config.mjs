// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
import db from "@astrojs/db";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  // The `site` property specifies the base URL for your site.
  // Be sure to update this to your own domain (e.g., "https://yourdomain.com") before deploying.
  site: "https://data-nova.vercel.app",
  prefetch: true,
  trailingSlash: "never",
  experimental: {
    clientPrerender: true,
  },
  integrations: [
    react(),
    markdoc(),
    ...(process.env.SKIP_KEYSTATIC ? [] : [keystatic()]),
    db(),
    svelte(),
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      fs: {
        allow: [
          // Allow serving files from the project root
          '.',
          // Allow serving files from parent directory (for node_modules)
          '..',
          // Explicitly allow astro runtime files
          'C:/Users/Administrator/Desktop/node_modules'
        ]
      }
    },
    resolve: {
      alias: {
        '@': '/src',
        '@data': '/src/data',
        '@common': '/src/components/common',
        '@megaMenu': '/src/components/common/MegaMenu',
        '@images': '/src/assets/images',
        '@layout': '/src/layout',
        '@ui': '/src/components/ui',
        '@sections': '/src/components/sections',
        '@styles': '/src/assets/styles',
        '@utils': '/src/utils'
      }
    }
  },
  output: "server",
  adapter: vercel(),
});
