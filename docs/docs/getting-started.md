
# Getting Started

Wonderplate is a simple CLI tool to drop some very basic scaffolding for a shopify theme. It intends to be minimal and easy to extend. We do not provide a theme but a set of tools to help you build your own.

You get:

- A basic Vite setup to bundle assets.
- Tailwind CSS.
- A components generator.

## Usage

Run the CLI command and follow the prompts.

```bash
npm create @wondercraft/wonderplate-shopify@latest
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