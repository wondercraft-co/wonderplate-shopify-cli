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
  const cmd = `curl --output theme.zip -L -O ${themesZip[themeName].zip}`;
  execSync(cmd);

  await extract(path.join(projectDir, "theme.zip"), {
    dir: projectDir,
  })
    .then(() => console.log("Extraction complete"))
    .catch((err) =>
      console.error("Error occurred while extracting zip file", err)
    );

  fs.rename(
    path.join(projectDir, themesZip[themeName].extracted),
    path.join(projectDir, "shopify")
  );
}
