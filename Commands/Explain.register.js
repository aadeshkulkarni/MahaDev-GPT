const vscode = require("vscode");
const ExplainCode = require("../src/ExplainCode");

module.exports = function (context) {
  let disposable = vscode.commands.registerCommand("mahadev-gpt.analyseCode", () => {
    ExplainCode();
  });
  context.subscriptions.push(disposable);
};
