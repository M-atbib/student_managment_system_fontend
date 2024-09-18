export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      backendUrl:
        process.env.NUXT_PUBLIC_BACKEND_ENDPOINT ||
        "https://gestion-groupeelhouria-d5bfba1b9bb0.herokuapp.com",
      fileStorage:
        process.env.NUXT_PUBLIC_FILE_STORAGE ||
        " https://f003.backblazeb2.com/file/groupeelhourria",
    },
  },
  nitro: {
    firebase: {
      gen: 2,
    },
  },
  app: {
    head: {
      title: "Gestion Etudiant",
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1, maximum-scale=1, shrink-to-fit=no",
        },
        { hid: "description", name: "description", content: "" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Merriweather+Sans:ital,wght@0,300..800;1,300..800&display=swap",
        },
      ],
    },
  },
  css: ["~/assets/css/tailwind.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["@pinia/nuxt", "@nuxt/icon"],
  plugins: ["~/plugins/vue-cookies.js"],
});