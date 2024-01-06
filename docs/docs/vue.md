# Guide to add Vue to your project

To use Vue in your project you need to install the `vue` package and the `@vitejs/plugin-vue` plugin.

```bash
npm install vue
```

```bash
npm install -D @vitejs/plugin-vue
```


Add the vite plugin to the `vite.config.ts` file

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()]
})
``` 


Create a new vue component somewhere in the `_src/js` folder

```vue
// _src/js/vue/App.vue
<template>
  <h1>Hello {{ name }}!</h1>
</template>
```

And import the component and initialize Vue in the main js entry file `_src/js/app.js` file

```js
import { createApp } from "vue";
import App from "./vue/App.vue";

createApp(App).mount("#hello");
```

## State management recommendation

We recommend not using Vuex for state management, but instead using the [pinia](https://pinia.esm.dev/) library.

```bash
npm install pinia
```


## Initialize multiple Vue apps

::: warning
**TODO: Explain how to initialize multiple Vue apps in the same page.**

A possible good idea to follow is what [Shopify Theme Labs](https://github.com/uicrooks/shopify-theme-lab) does.
They have a way of mounting multiple Vue apps that share the same vuex store, you can see more details on how this works in their [main.js](https://github.com/uicrooks/shopify-theme-lab/blob/main/src/main.js) file.
The idea is to provide here the snippets to make this work with Wonderplate.
:::
