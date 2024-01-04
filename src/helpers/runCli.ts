import * as p from "@clack/prompts";

export const runCli = async () => {
  const project = await p.group({
    tailwind: () => {
      return p.confirm({
        message: "Will you be using Tailwind CSS for styling?",
      });
    },
  });

  return project;
};
