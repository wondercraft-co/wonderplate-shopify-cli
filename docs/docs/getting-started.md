
# Getting Started

Wonderplate is a simple CLI tool to drop some very basic scaffolding for a shopify theme. It intends to be minimal and easy to extend. We do not provide a theme but a set of tools to help you build your own.

The main use-case of the tool is when **your client already possesses a theme**, and you need to integrate a build system into it. Alternatively, it is useful if you aim to enhance a theme, such as Dawn or Debut.


You get:

- A basic Vite setup to bundle assets.
- Tailwind CSS.
- A components generator.

## Usage

Create a new folder or navigate to your theme's folder and run the CLI command and follow the prompts.

```bash
npm create @wondercraft/wonderplate-shopify@latest
```

::: warning
The command does not create a new folder so make sure you are in the right place.
:::

Install dependencies and run the project.

```bash
npm install
npm run dev
```



## Generate a new component

To generate a new component run the following command:

```bash
npm run generate
```


## Update theme.liquid with generated assets

Go to the `layout/theme.liquid` file and add the following code:

```liquid
<script src="{{ 'app.js' | asset_url }}" defer="defer"></script>
<script src="{{ 'main.css' | asset_url }}" defer="defer"></script>
```