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

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   },
    // ],

    sidebar: {
      "/docs/": {
        base: "/docs/",
        items: [
          {
            text: "Introduction",
            collapsed: false,
            items: [
              { text: "Getting Started", link: "/docs/getting-started" },
              { text: "Installation", link: "/docs/installation" },
              { text: "Configuration", link: "/docs/configuration" },
              { text: "Usage", link: "/docs/usage" },
            ],
          },
        ],
      },
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
  base: "/wonderplate-shopify-cli/"
});
