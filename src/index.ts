#!/usr/bin/env node
import fs from "fs-extra";
import ora from "ora";
import path from "path";
import { PKG_ROOT } from "~/consts.js";
import { runCli } from "./helpers/runCli.js";

import { type PackageJson } from "type-fest";
import downloadTheme from "./helpers/downloadTheme.js";

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
  // NPM tarballs don't include dot files, so we have to rename them
  ["_shopifyignore", "_gitignore"].forEach((file) => {
    fs.copySync(
      path.join(srcDir, file),
      path.join(projectDir, file.replace("_", "."))
    );
  });

  //Copying src files
  fs.copySync(path.join(srcDir, "_src"), path.join(projectDir, "_src"));

  const pkgJson = fs.readJSONSync(
    path.join(projectDir, "package.json")
  ) as PackageJson;

  // Update package.json with users input
  pkgJson.name = project.name;
  if (project.storeName) {
    pkgJson.config.store = project.storeName;
  }

  // Configuring tailwind
  if (project.tailwind) {
    ["tailwind.config.js", "postcss.config.js"].forEach((file) => {
      fs.copySync(path.join(srcDir, file), path.join(projectDir, file));
    });

    const pkgDeps = fs.readJSONSync(
      path.join(PKG_ROOT, "src/packageMappers/package.tailwind.json")
    ) as PackageJson;

    pkgJson.dependencies = {
      ...pkgJson.dependencies,
      ...pkgDeps.dependencies,
    };
    pkgJson.devDependencies = {
      ...pkgJson.devDependencies,
      ...pkgDeps.devDependencies,
    };

    const tailwindStr = `@tailwind base;\n@tailwind components;\n@tailwind utilities;`;
    await fs.appendFileSync(
      path.join(projectDir, "_src/styles/main.scss"),
      tailwindStr,
      function (err) {
        if (err) throw err;
        console.log("Saved!");
      }
    );
  } else {
    fs.removeSync(path.join(projectDir, "_src/styles/tailwind.css"));
  }

  // Download theme
  const themeName = project.downloadTheme;
  if (themeName === "dawn") {
    spinner.info(`Downloading ${themeName} theme...`);
    await downloadTheme(themeName, projectDir);
  }

  // Install Js frameworks
  const jsFramework = project.jsFramework;
  if (jsFramework == "alpine") {
    spinner.info(`Installing ${jsFramework}...`);
    const pkgDeps = fs.readJSONSync(
      path.join(PKG_ROOT, `src/packageMappers/package.${jsFramework}.json`)
    ) as PackageJson;

    pkgJson.dependencies = {
      ...pkgJson.dependencies,
      ...pkgDeps.dependencies,
    };
    pkgJson.devDependencies = {
      ...pkgJson.devDependencies,
      ...pkgDeps.devDependencies,
    };
    const appJsStr = `import Alpine from 'alpinejs'\nwindow.Alpine = Alpine\nAlpine.start()\n`;
    await fs.appendFileSync(
      path.join(projectDir, "_src/js/app.js"),
      appJsStr,
      function (err) {
        if (err) throw err;
        console.log("Saved!");
      }
    );
  }

  //Update package.json
  fs.writeJSONSync(path.join(projectDir, "package.json"), pkgJson, {
    spaces: 2,
  });
  spinner.succeed("Scaffolding complete!");
  process.exit(0);
};

init();
