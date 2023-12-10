const vscode = require("vscode");

module.exports = async function (context) {
  let disposable = vscode.commands.registerCommand("mahadev-gpt.config", async ()=>{
    
  const apiKey = await vscode.window.showInputBox({
    placeHolder: 'Enter your API key',
  });

  if (!apiKey) {
    vscode.window.showErrorMessage('Invalid API key');
    return;
  }

  setSecretKey(apiKey)

  vscode.window.showInformationMessage('API key saved successfully');
  });
  context.subscriptions.push(disposable);
};

async function setSecretKey(API_KEY) {
  const configuration = vscode.workspace.getConfiguration();
  await configuration.update('mahadev-gpt.apiKey', API_KEY, vscode.ConfigurationTarget.Workspace);
}