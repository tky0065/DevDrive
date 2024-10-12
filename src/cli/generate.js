const { program } = require("commander");
const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

program
  .version("1.0.0")
  .description("CLI to generate DTO, Service, Entity, Controller, and Route");

program
  .command("generate <type> <name>")
  .description("Generate a new file")
  .action((type, name) => {
    const validTypes = ["dto", "service", "entity", "controller", "route"];
    if (!validTypes.includes(type)) {
      console.error(`Invalid type. Choose from: ${validTypes.join(", ")}`);
      return;
    }

    const templatePath = path.join(
      __dirname,
      "..",
      "templates",
      `${type}.template.ts`
    );
    const outputDir = path.join(__dirname, "..", "src", `${type}s`);
    const outputPath = path.join(outputDir, `${name}.${type}.ts`);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const template = fs.readFileSync(templatePath, "utf8");
    const rendered = ejs.render(template, {
      name,
      nameLower: name.toLowerCase(),
    });

    fs.writeFileSync(outputPath, rendered);
    console.log(`Generated ${type}: ${outputPath}`);

    // Si on génère un contrôleur, générer aussi la route correspondante
    if (type === "controller") {
      const routeTemplatePath = path.join(
        __dirname,
        "..",
        "templates",
        "route.template.ts"
      );
      const routeOutputDir = path.join(__dirname, "..", "src", "routes");
      const routeOutputPath = path.join(
        routeOutputDir,
        `${name.toLowerCase()}.route.ts`
      );

      if (!fs.existsSync(routeOutputDir)) {
        fs.mkdirSync(routeOutputDir, { recursive: true });
      }

      const routeTemplate = fs.readFileSync(routeTemplatePath, "utf8");
      const renderedRoute = ejs.render(routeTemplate, {
        name,
        nameLower: name.toLowerCase(),
      });

      fs.writeFileSync(routeOutputPath, renderedRoute);
      console.log(`Generated route: ${routeOutputPath}`);
    }
  });

program.parse(process.argv);
