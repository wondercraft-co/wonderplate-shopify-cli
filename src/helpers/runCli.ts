import * as p from "@clack/prompts";

const DEFAULT_PROJECT_NAME = "wonderplate-shopify";

type ThemeOptionsLabels = "dawn" | "no";
type ThemeOptions = {
  value: ThemeOptionsLabels;
  hint?: string;
  label?: string;
}[];

export const runCli = async () => {
  const project = await p.group(
    {
      name: () => {
        return p.text({
          message:
            "What is the name of your project? This will be used in package.json",
          placeholder: DEFAULT_PROJECT_NAME,
        });
      },
      storeName: () => {
        return p.text({
          message:
            "What is the handle of your Shopify store (without myshopify.com)?",
          placeholder: "my-store-handle",
          validate: (input) => {
            if (input.includes("myshopify.com")) {
              return "Please enter the handle of your store without the myshopify.com";
            }
            if (input.includes("/") || input.includes(".")) {
              return "Please enter the handle of your store without slashes or dots";
            }
          },
        });
      },
      downloadTheme: () => {
        return p.select<ThemeOptions, ThemeOptionsLabels>({
          message: "Do you want to download a theme?",
          options: [
            { label: "Dawn", value: "dawn" },
            { label: "No", value: "no" },
          ],
          initialValue: "no",
        });
      },
      tailwind: () => {
        return p.confirm({
          message: "Will you be using Tailwind CSS for styling?",
        });
      },
    },
    {
      onCancel: () => {
        p.cancel("Exiting setup...");
        process.exit(0);
      },
    }
  );

  return { ...project, name: project.name || DEFAULT_PROJECT_NAME };
};
