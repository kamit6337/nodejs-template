#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const GITIGNORE = require("./gitignore");

function createGitignore(destFolder) {
  const gitignorePath = path.join(destFolder, ".gitignore");

  const gitignoreContent = GITIGNORE;

  fs.writeFileSync(gitignorePath, gitignoreContent.trim());
  console.log(".gitignore created successfully in server folder.");
}

function copyTemplate(destFolder, templateName) {
  const templatePath = path.join(__dirname, templateName);

  try {
    // Copy template files into the destination folder's root
    fs.cpSync(templatePath, destFolder, { recursive: true });
    console.log(`Template files copied successfully.`);
  } catch (err) {
    console.error("Error copying template files:", err.message);
    process.exit(1);
  }
}

function installDependencies(destFolder) {
  console.log("Installing dependencies...");

  try {
    // Change directory to server and run npm install
    execSync("npm install", { cwd: destFolder, stdio: "inherit" });
    console.log("Dependencies installed successfully");
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

  // NOTE: QUESTION 1

  let templateName = "rest-api";

  // Ask the user for API type preference
  const answer1 = await askQuestion(
    "Which API style would you like to use? (REST-APIs or graphql, default is REST-APIs): "
  );

  if (answer1?.toLowerCase().trim() === "graphql") {
    templateName = "graphql";
  } else {
    const answer2 = await askQuestion(
      "Want to include socket.io? (yes or no, default is no): "
    );

    if (
      answer2?.toLowerCase().trim() === "y" ||
      answer2?.toLowerCase().trim() === "yes"
    ) {
      const answer3 = await askQuestion(
        "Want to include supabase(SQL) ? (yes or no, default is MongoDB (NO-SQL)): "
      );

      if (
        answer3?.toLowerCase().trim() === "y" ||
        answer3?.toLowerCase().trim() === "yes"
      ) {
        templateName = "rest-api-socketio-supabase";
      } else {
        templateName = "rest-api-socketio";
      }
    } else {
      const answer4 = await askQuestion(
        "Want to include supabase(SQL) ? (yes or no, default is MongoDB (NO-SQL)): "
      );

      if (
        answer4?.toLowerCase().trim() === "y" ||
        answer4?.toLowerCase().trim() === "yes"
      ) {
        templateName = "rest-api-supabase";
      } else {
        templateName = "rest-api";
      }
    }
  }

  // Copy template files to root project directory
  copyTemplate(projectPath, templateName);

  createGitignore(serverPath);
  installDependencies(projectPath);

  console.log(`${apiChoice} Node.js server created successfully!`);
}

main();
