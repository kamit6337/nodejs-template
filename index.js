#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

function createGitignore(destFolder) {
  const gitignorePath = path.join(destFolder, ".gitignore");

  const gitignoreContent = `
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*
.pnpm-debug.log*

# Diagnostic reports
report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory
coverage
*.lcov

# Dependency directories
node_modules/
jspm_packages/

# TypeScript cache
*.tsbuildinfo

# Optional cache and build directories
.npm
.eslintcache
.stylelintcache
.cache
.parcel-cache
.next
out
dist

# dotenv environment variable files
.env
.env.local
.env.*.local

# Yarn v2
.yarn/cache
.yarn/unplugged
.yarn/build-state.yml
.yarn/install-state.gz
.pnp.*
`;

  fs.writeFileSync(gitignorePath, gitignoreContent.trim());
  console.log(".gitignore created successfully in server folder.");
}

function copyTemplate(destFolder, apiChoice, isIncludeSocketIo) {
  let filePath = "";

  if (apiChoice === "graphql") {
    filePath = "template-graphql";
  } else if (isIncludeSocketIo) {
    filePath = "template-rest-api-socketio";
  } else {
    filePath = "template-rest-api";
  }

  const templatePath = path.join(__dirname, filePath);

  try {
    // Copy template files into the destination folder's root
    fs.cpSync(templatePath, destFolder, { recursive: true });
    console.log(`Template files for ${apiChoice} copied successfully.`);
  } catch (err) {
    console.error("Error copying template files:", err.message);
    process.exit(1);
  }
}

function installDependencies(destFolder) {
  const serverPath = path.join(destFolder, "server");
  console.log("Installing dependencies in server folder...");

  try {
    // Change directory to server and run npm install
    execSync("npm install", { cwd: serverPath, stdio: "inherit" });
    console.log("Dependencies installed successfully in server folder.");
  } catch (err) {
    console.error("Error installing dependencies:", err.message);
    process.exit(1);
  }
}

async function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans.trim());
    })
  );
}

async function main() {
  const projectName = process.argv[2] || "my-nodejs-server";
  const isCurrentDir = projectName === ".";
  const projectPath = isCurrentDir
    ? process.cwd()
    : path.resolve(process.cwd(), projectName);

  if (!isCurrentDir && fs.existsSync(projectPath)) {
    console.log(`Error: Directory ${projectName} already exists.`);
    process.exit(1);
  }

  if (!isCurrentDir) {
    fs.mkdirSync(projectPath);
  }

  // Ask the user for API type preference
  const answer = await askQuestion(
    "Which API style would you like to use? (rest-api or graphql, default is rest-api): "
  );
  const apiChoice = answer.toLowerCase() === "graphql" ? "graphql" : "rest-api";

  let isIncludeSocketIo = false;

  if (apiChoice === "rest-api") {
    const answer = await askQuestion(
      "Want to include socket.io? (yes or no, default is no): "
    );

    if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
      isIncludeSocketIo = true;
    } else {
      isIncludeSocketIo = false;
    }
  }

  // Copy template files to root project directory
  copyTemplate(projectPath, apiChoice, isIncludeSocketIo);

  // Go into the server folder, create .gitignore, install dependencies, and come back
  const serverPath = path.join(projectPath, "server");
  if (!fs.existsSync(serverPath)) {
    fs.mkdirSync(serverPath);
  }
  createGitignore(serverPath);
  installDependencies(projectPath);

  console.log(`${apiChoice} Node.js server created successfully!`);
}

main();
