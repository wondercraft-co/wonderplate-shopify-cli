import * as p from "@clack/prompts";

const DEFAULT_PROJECT_NAME = "wonderplate-shopify";

type ThemeOptionsLabels = "dawn" | "none";
type FrameworkOptionsLabels = "react" | "vue" | "alpine" | "htmx" | "none";
type ThemeOptions<T> = {
  value: T;
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
      jsFramework: () => {
        return p.select<
          ThemeOptions<FrameworkOptionsLabels>,
          FrameworkOptionsLabels
        >({
          message: "Which JS framework will you be using?",
          options: [
            { label: "None", value: "none" },
            { label: "Alpine", value: "alpine" },
          ],
          initialValue: "none",
        });
      },
      downloadTheme: () => {
        return p.select<ThemeOptions<ThemeOptionsLabels>, ThemeOptionsLabels>({
          message: "Do you want to download a theme?",
          options: [
            { label: "None", value: "none" },
            { label: "Dawn", value: "dawn" },
          ],
          initialValue: "none",
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
