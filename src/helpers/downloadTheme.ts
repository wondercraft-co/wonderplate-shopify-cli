import { execSync } from "child_process";
import extract from "extract-zip";
import fs from "fs-extra";
import path from "path";

export const themesZip = {
  dawn: {
    zip: "https://github.com/Shopify/dawn/archive/master.zip",
    extracted: "dawn-main",
  },
} as const;

export default async function downloadTheme(
  themeName: keyof typeof themesZip,
  projectDir: string
) {

  // download zip theme with curl so it follows redirects
  const cmd = `curl --output theme.zip -L -O ${themesZip[themeName].zip}`;
  execSync(cmd);

  await extract(path.join(projectDir, "theme.zip"), {
    dir: projectDir,
  })
    .then(() => console.log("Extraction complete"))
    .catch((err) =>
      console.error("Error occurred while extracting zip file", err)
    );

  const extractedFolder = path.join(projectDir, themesZip[themeName].extracted);

  // Move all files from extracted folder to project root
  fs.readdirSync(extractedFolder).forEach((file) => {
    if (
      !file.startsWith(".") &&
      fs.lstatSync(path.join(extractedFolder, file)).isDirectory()
    ) {
      fs.moveSync(
        path.join(extractedFolder, file),
        path.join(projectDir, file)
      );
    }
  });

  // Cleanup extracted folder and zip file
  fs.removeSync(extractedFolder);
  fs.removeSync(path.join(projectDir, "theme.zip"));
}
