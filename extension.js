// @ts-nocheck
global.__basedir = __dirname;

const vscode = require("vscode");

const RegisterInitApp = require("./Commands/Activate.register.js");
const RegisterGenerateCode = require("./Commands/Generate.register.js");
const RegisterExplainCode = require("./Commands/Explain.register.js");
const RegisterDocString = require("./Commands/DocString.register.js");
const OptimiseDocString = require("./Commands/Optimise.register.js");
const RefactorDocString = require("./Commands/Refactor.register.js");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  vscode.window.showInformationMessage("Mahadev GPT activated now.");
  
  RegisterInitApp(context);
  RegisterGenerateCode(context);
  RegisterExplainCode(context);
  RegisterDocString(context);
  OptimiseDocString(context);
  RefactorDocString(context);
}

function deactivate() {
  console.log("Mahadev GPT de-activated.");
}

module.exports = {
  activate,
  deactivate,
};
