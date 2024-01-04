#!/usr/bin/env node
import ora from "ora";
import fs from "fs-extra";
import path from "path";
import { PKG_ROOT } from "~/consts.js";
import { runCli } from "./helpers/runCli.js";

console.log("******************************");
console.log("**********  index.js *********");
console.log("******************************");

const init = async () => {
  const projectDir = path.resolve(process.cwd());
  const srcDir = path.join(PKG_ROOT, "template");

  const project = await runCli();

  const spinner = ora(`Scaffolding in: ${projectDir}...\n`).start();

  // Copying root config files
  ["package.json", "vite.config.ts"].forEach((file) => {
    fs.copySync(path.join(srcDir, file), projectDir);
  });

  // configuring tailwind
  if (project.tailwind) {
    fs.copySync(
      path.join(srcDir, "tailwind.config.js", "postcss.config.js"),
      projectDir
    );
  }
  process.exit(0);
};

init();
