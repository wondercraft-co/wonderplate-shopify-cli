/** @type {import('vite').UserConfig} */
import fs from "fs";
import path from "path";
import { defineConfig } from "vite";

const inputDir = "./src";

const entries = (subDir = "") =>
  fs
    .readdirSync(path.resolve(__dirname, inputDir, subDir))
    .filter(
      (file) =>
        file.endsWith(".js") || file.endsWith(".scss") || file.endsWith(".css")
    )
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
      input: {
        app: "src/app.js",
        ...entries("scripts/components"),
        ...entries("styles"),
      },
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      },
    },
    watch: {
      include: ["./src/**"],
    },
  },
});
