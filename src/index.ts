#!/usr/bin/env node
import ora from "ora";
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
  // fs.copySync(srcDir, projectDir);
  process.exit(0); 
};

init();
