import { defineConfig } from "astro/config";

import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import spectre from "./package/src";

import node from "@astrojs/node";
import { spectreDark } from "./src/ec-theme";

// https://astro.build/config
export default defineConfig({
  site: "https://portfolio.sleepyduck.dev",
  output: "static",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    fallback: {
      es: "en",
    },
  },
  integrations: [
    expressiveCode({
      themes: [spectreDark],
    }),
    mdx(),
    sitemap(),
    spectre({
      name: "José HM",
      openGraph: {
        home: {
          title: "Spectre",
          description: "Jose HM portfolio using the Spectre them for Astro.",
        },
        blog: {
          title: "Blog",
          description: "Unorganized ideas.",
        },
        projects: {
          title: "Projects",
        },
      },
      giscus: {
        repository: "Josehm1999/jjh-portfolio",
        repositoryId: "R_kgDOOweVJg",
        category: "General",
        categoryId: "DIC_kwDOOweVJs4CqlYy",
        mapping: "pathname",
        strict: true,
        reactionsEnabled: true,
        emitMetadata: false,
        lang: "es",
      },
    }),
  ],
  adapter: node({
    mode: "standalone",
  }),
});

