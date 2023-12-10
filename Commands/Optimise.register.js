const vscode = require("vscode");
const CustomExecute = require("../src/DocString");

module.exports = function (context) {
  let disposable = vscode.commands.registerCommand("mahadev-gpt.optimise", () => {
    CustomExecute('Optimise');
  });
  context.subscriptions.push(disposable);
};
