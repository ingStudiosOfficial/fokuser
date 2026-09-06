// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/icon", "@nuxtjs/seo"],
  css: ["@/assets/css/main.css"],

  site: {
    url: "https://fokuser.ingstudios.dev",
    name: "Fokuser - A FOSS M3E Chrome Extension Site Blocker and Focus Timer",
  },

  app: {
    head: {
      link: [{ rel: "icon", type: "image/png", href: "/logo.png" }],
    },
  },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith("m3e-"),
    },
  },

  routeRules: {
    "/": { prerender: true },
  },
});
