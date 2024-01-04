/** @type {import('vite').UserConfig} */
import fs from "fs";
import path from "path";

const inputDir = "./src/scripts"; // replace with your input directory

const entries = (subDir = "") =>
  fs
    .readdirSync(path.resolve(__dirname, inputDir, subDir))
    .filter((file) => file.endsWith(".js")) // only include .js files
    .reduce((entries, file) => {
      const name = path.basename(file, ".js"); // get the file name without the extension
      entries[path.join(name)] = path.join(inputDir, subDir, file); // add the entry to the entries object
      return entries;
    }, {});

export default {
  build: {
    outDir: "assets",
    rollupOptions: {
      input: { app: "src/app.js", ...entries("components") },
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
    rollupOutputOptions: {
      entryFileNames: "[name]",
    },
  },
};
