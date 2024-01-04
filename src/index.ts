#!/usr/bin/env node
import ora from "ora";
import fs from "fs-extra";
import path from "path";
import { PKG_ROOT } from "~/consts.js";
import { runCli } from "./helpers/runCli.js";

import { type PackageJson } from "type-fest";

console.log(`
 _    _  _____  _  _  ____  ____  ____  ____  __      __   ____  ____ 
( \\/\\/ )(  _  )( \\( )(  _ \\( ___)(  _ \\(  _ \\(  )    /__\\ (_  _)( ___)
 )    (  )(_)(  )  (  )(_) ))__)  )   / )___/ )(__  /(__)\\  )(   )__) 
(__/\\__)(_____)(_)\\_)(____/(____)(_)\\_)(__)  (____)(__)(__)(__) (____)

`);

const init = async () => {
  const projectDir = path.resolve(process.cwd());
  const srcDir = path.join(PKG_ROOT, "template");

  const project = await runCli();
  const spinner = ora(`Scaffolding in: ${projectDir}...\n`).start();

  // Copying root config files
  ["package.json", "vite.config.ts"].forEach((file) => {
    fs.copySync(path.join(srcDir, file), path.join(projectDir, file));
  });

  //Copying src files
  fs.copySync(path.join(srcDir, "src"), path.join(projectDir, "src"));

  const pkgJson = fs.readJSONSync(
    path.join(projectDir, "package.json")
  ) as PackageJson;
  pkgJson.name = project.name;

  // Configuring tailwind
  if (project.tailwind) {
    ["tailwind.config.js", "postcss.config.js"].forEach((file) => {
      fs.copySync(path.join(srcDir, file), path.join(projectDir, file));
    });
  } else {
    delete pkgJson.devDependencies["tailwindcss"];
    delete pkgJson.devDependencies["autoprefixer"];
    delete pkgJson.devDependencies["postcss"];
    fs.removeSync(path.join(projectDir, "src/styles/tailwind.css"));
  }

  //Update package.json
  fs.writeJSONSync(path.join(projectDir, "package.json"), pkgJson, {
    spaces: 2,
  });
  spinner.succeed("Scaffolding complete!");
  process.exit(0);
};

init();
