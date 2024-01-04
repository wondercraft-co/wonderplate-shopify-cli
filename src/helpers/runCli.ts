import * as p from "@clack/prompts";

const DEFAULT_PROJECT_NAME = "wonderplate-shopify";

export const runCli = async () => {
  const project = await p.group({
    name: () => {
      return p.text({
        message:
          "What is the name of your project? This will be used in package.json",
        placeholder: DEFAULT_PROJECT_NAME,
      });
    },
    tailwind: () => {
      return p.confirm({
        message: "Will you be using Tailwind CSS for styling?",
      });
    },
  });

  return { ...project, name: project.name || DEFAULT_PROJECT_NAME };
};
