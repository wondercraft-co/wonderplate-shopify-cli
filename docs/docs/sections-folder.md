# Sections folder

The `_src/sections` folder is a little special and it is one of the only opinionated things on Wonderplate. Any js file inside this folder will be treated as a separate entry point for vite: Which means that each section will have its own js file and will be bundled separately. 

We do this because it allows to lazy load the js and css each section needs only if the section is in use. Instead of bundling everything in a single file and loading it on every page.

```
theme/
└─ _src/
  └─ js/
    ├─ app.js --> Main entry point becomes assets/app.js
    └─ sections/
      ├─ my-slider-section.js --> Becomes assets/my-slider-section.js
      └─ my-custom-form.js    --> Becomes assets/my-custom-form.js
```

## External modules

You can use external modules as you normally do  on any js project. If two section are using the same module, it will extracted in a separate js file and loaded only once. Thanks to browsers now supporting native ES modules. The sections file will resolve by itself the relative path to the module with the correct Shopify Asset folder CDN url.

For example: The following 2 sections are using the same module `swiper/bundle`:

```js
// _src/sections/my-slider-section.js
import Swiper from 'swiper/bundle';
const swiper = new Swiper('.swiper-container');


// _src/sections/my-custom-form.js
import Swiper from 'swiper/bundle';
const swiper = new Swiper('.swiper-container');
```

Vite will generate a `swiper.bundle.js` file in the `assets` folder and once the sections are loaded in the browser, the `swiper.bundle.js` file will be loaded only once.







