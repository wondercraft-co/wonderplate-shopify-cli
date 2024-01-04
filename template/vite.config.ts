/** @type {import('vite').UserConfig} */
import fs from "fs";
import path from "path";

const inputDir = "./src/scripts"; // replace with your input directory
const outputDir = "./hello"; // replace with your output directory

const entries = fs
  .readdirSync(path.resolve(__dirname, inputDir))
  .filter((file) => file.endsWith(".js")) // only include .js files
  .reduce((entries, file) => {
    const name = path.basename(file, ".js"); // get the file name without the extension
    // entries[path.join(outputDir, name)] = path.join(inputDir, file); // add the entry to the entries object
    entries[path.join( name)] = path.join(inputDir, file); // add the entry to the entries object
    return entries;
  }, {});
console.log("🚀 ~ file: vite.config.ts:15 ~ entries:", entries);

export default {
  build: {
    outDir: "assets",
    rollupOptions: {
      input: entries,
      // output: {
      //   assetFileNames: `${outputDir}/[name]`,
      // },
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `assets/[name].[ext]`
      }
    },
    rollupOutputOptions: {
      entryFileNames: '[name]',
    }
  },
};
