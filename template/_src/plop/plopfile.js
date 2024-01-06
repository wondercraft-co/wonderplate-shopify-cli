export default (plop) => {
  plop.setHelper("eq", (v1, v2) => v1 === v2);
  plop.setGenerator("component", {
    description: "Generate a new component",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Enter the name of the component:",
      },
      {
        type: "list",
        name: "type",
        message: "Select the type of component:",
        choices: ["Section", "Snippet"],
      },
      {
        type: "confirm",
        name: "javascript",
        message: "Needs JavaScript?",
        when: (answers) => answers.type == "Section",
      },
      {
        type: "confirm",
        name: "css",
        message: "Needs CSS module?",
        when: (answers) => answers.type == "Section",
      },
    ],
    actions: function (data) {
      const actions = [];

      if (data.type == "Section") {
        actions.push({
          type: "add",
          path: "../../sections/{{dashCase name}}.liquid",
          templateFile: "./section-liquid.hbs",
          data,
        });
        if (data.css) {
          actions.push({
            type: "add",
            path: "../../_src/js/sections/{{dashCase name}}.scss",
            templateFile: "./section-scss.hbs",
            data,
          });
        }
        if (data.javascript) {
          actions.push({
            type: "add",
            path: "../../_src/js/sections/{{dashCase name}}.js",
            templateFile: "./section-js.hbs",
            data,
          });
        }
      }

      if (data.type == "Snippet") {
        actions.push({
          type: "add",
          path: "../../snippets/{{dashCase name}}.liquid",
          templateFile: "./snippet-liquid.hbs",
        });
      }

      return actions;
    },
  });
};
