import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Wonderplate Docs",
  description: "A simple build system to add to your Shopify theme",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Docs", link: "/docs/getting-started" },
      { text: "Examples", link: "/markdown-examples" },
    ],
    
    search: {
      provider: "local",
    },

    sidebar: {
      "/docs/": {
        base: "/docs/",
        items: [
          {
            text: "Introduction",
            collapsed: false,
            items: [
              { text: "Getting Started", link: "/getting-started" },
              // { text: "Assumptions", link: "/placeholder" },
              { text: "Assets", link: "/assets" },
              { text: "Sections folder", link: "/sections-folder" },
            ],
          },
          {
            text: "JS Frameworks",
            collapsed: false,
            items: [
              { text: "Vue", link: "/vue" },
              { text: "React", link: "/react" },
            ],
          },
        ],
      },
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/wondercraft-co/wonderplate-shopify-cli",
      },
    ],
  },
  base: "/wonderplate-shopify-cli/",
});
