# Wonderplate Shopify CLI

A simple CLI tool to drop some very basic scaffolding for a shopify theme.

What do you get when you run the command:

- A basic Vite setup to bundle assets
- Tailwind CSS
- A set of scripts to create new components using plop (TODO)

You do not get a full shopify theme, you will need to add the required files yourself. You can [download Dawn](https://github.com/Shopify/dawn) from the shopify git page. or it can be provided by the client.

This CLI is heavily inspired by the [create-t3-app](https://github.com/t3-oss/create-t3-app) project.

## Usage

```bash
npm create @wondercraft/wonderplate-shopify@latest
```

## Contribute

This is mainly a CLI project, which means the code for that is in the `/src` folder, then the `/template` folder is what is going to be "downloaded" or copied into the client machine when the cli runs.

So once you clone the repo and install the dependencies you can run `npm run dev` to build the cli.

Then, to test your work, create a new folder somewhere and run the cli from that folder with `node /path/to/wonderplate-shopify/dist/index.js` and it will create a new project in the folder you are in.
TODO: look into how to make this easier with `npm link`.
