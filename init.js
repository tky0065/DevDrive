const inquirer = require("inquirer");
const fs = require("fs-extra");
const path = require("path");
const { execSync } = require("child_process");

async function initProject() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "What is the name of your project?",
      default: "my-dev-drive-api",
    },
    {
      type: "list",
      name: "orm",
      message: "Which ORM would you like to use?",
      choices: ["TypeORM", "Prisma"],
    },
  ]);

  const projectPath = path.join(process.cwd(), answers.projectName);

  // Copier les fichiers de base
  await fs.copy(path.join(__dirname, "templates", "base"), projectPath);

  // Copier les fichiers spécifiques à l'ORM choisi
  await fs.copy(
    path.join(__dirname, "templates", answers.orm.toLowerCase()),
    projectPath
  );

  // Installer les dépendances
  process.chdir(projectPath);
  execSync("npm install", { stdio: "inherit" });

  console.log(
    `Project ${answers.projectName} created successfully with ${answers.orm}!`
  );
}

initProject();
