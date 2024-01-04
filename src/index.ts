#!/usr/bin/env node
import ora from "ora";
import path from "path";
import fs from "fs-extra";
import { PKG_ROOT } from "~/consts.js";

console.log("******************************");
console.log("**********  index.js *********");
console.log("******************************");


const init = async () => {
  const projectDir = path.resolve(process.cwd());
  const srcDir = path.join(PKG_ROOT, "template");
  console.log("🚀 ~ file: index.ts:15 ~ init ~ srcDir:", srcDir);
  console.log(projectDir);
  const spinner = ora(`Scaffolding in: ${projectDir}...\n`).start();

  fs.copySync(srcDir, projectDir);
  process.exit(0);
};

init();
