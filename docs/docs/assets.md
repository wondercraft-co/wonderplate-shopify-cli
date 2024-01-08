# Assets

To keep things simple we leverage Shopify's assets folder to hold of static files and we refrain from compiling them through vite. This includes images, fonts, and other files.

## Local fonts

1. Upload your fonts to the `/assets` folder.

```
theme/
└─ assets/
  ├─ open-sans-regular.static.woff
  └─ open-sans-regular.static.woff2
```

2. Create a shopify snippet running the generator command. The following command will generate the file `snippets/fonts.liquid`

```
npm run generate -- -- --name "fonts" --type "snippet"
```

3. Add the following code to the new `snippets/fonts.liquid` file.

```liquid
{% style %}
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    src: url('{{ 'open-sans-regular.static.woff2' | asset_url }}') format('woff2'),
         url('{{ 'open-sans-regular.static.woff' | asset_url }}') format('woff');
  }
{% endstyle %}
```

4. Render the fonts snippet in the `layout/theme.liquid` file.

```liquid
{% render 'fonts' %}
```

5. Use the font in your css.

```css
body {
  font-family: 'Open Sans', sans-serif;
}
```

## Images inside CSS files

1. Upload your images to the `/assets` folder.
2. Use a relative url path to the image (No initial slash)

```css
body {
  background-image: url('bg.png');
}
```
::: tip
This works because the loaded css file is in the same folder as the image. Resolved the relative path to the correct Shopify CDN url.
:::