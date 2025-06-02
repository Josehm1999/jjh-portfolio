import { defineConfig, envField } from "astro/config";

import expressiveCode from "astro-expressive-code";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import spectre from "./package/src";
import dotenv from "dotenv";
import cloudflare from "@astrojs/cloudflare";
import { spectreDark } from "./src/ec-theme";

dotenv.config();

// https://astro.build/config
export default defineConfig({
  env: {
    schema: {
      SITE_URL: envField.string({
        context: "client",
        access: "public",
        optional: false,
      }),
    },
  },
  vite: {
    ssr: {
      noExternal: ["dotenv", "@astrojs/cloudflare"],
      target: "webworker",
      external: [
        "path",
        "fs",
        "url",
        "module",
        "crypto",
        "os",
        "child_process",
        "util",
        "net",
      ],
    },
  },
  site: process.env.SITE_URL,
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
          title: "José HM",
          description: "Jose HM portfolio using the Spectre theme for Astro.",
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
        lang: "en",
      },
    }),
  ],
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
});
