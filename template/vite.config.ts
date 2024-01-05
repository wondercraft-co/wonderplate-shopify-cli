/** @type {import('vite').UserConfig} */
import fs from "fs";
import path from "path";
import { defineConfig } from "vite";

const inputDir = "./_src";

const entries = (subDir = "") =>
  fs
    .readdirSync(path.resolve(__dirname, inputDir, subDir))
    .filter((file) => file.endsWith(".js"))
    .reduce((entries, file) => {
      const name = path.basename(file, ".js"); // get the file name without the extension
      entries[path.join(name)] = path.join(inputDir, subDir, file); // add the entry to the entries object
      return entries;
    }, {});

export default defineConfig({
  build: {
    outDir: "assets",
    emptyOutDir: false,
    rollupOptions: {
      preserveEntrySignatures: "allow-extension",
      input: {
        app: "_src/js/app.js",
        styles: "_src/styles/main.scss",
        ...entries("js/sections"),
      },
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      },
    },
    watch: {
      include: ["./_src/**"],
    },
  },
});
