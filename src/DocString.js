// @ts-nocheck
const vscode = require("vscode");
const config = require("../config.json");
const { wordWrap } = require("./helper");
const { callGPT } = require("./GPT");
const { PREFIX } = config;

const PROMPT_PREFIX = {
  DocString: "Generate an elaborate, high quality docstring for the below function:",
  Refactor: "Refactor this code:",
  Optimise: "Optimise this code:",
};
async function CustomExecute(PromptPrefix) {
  try {
    const API_KEY = vscode.workspace.getConfiguration().get('mahadev-gpt.apiKey');

    let editor = vscode.window.activeTextEditor;
    if (editor.document.getText().trim() === "") {
      vscode.window.showErrorMessage(`${PREFIX}: File is empty. Kindly insert your query and select it and try again.`);
      return;
    }
    let selection = editor.document.getText(editor.selection);
    if (selection.trim() === "") {
      vscode.window.showErrorMessage(`${PREFIX}: Selection is empty. Kindly select your query and try again.`);
      return;
    }
    selection = `${PROMPT_PREFIX[PromptPrefix]} \n${selection}`;
    console.log(selection);
    vscode.window.showInformationMessage(`${PREFIX}: Analysing your query. Loading ... Please wait`);
    const response = await callGPT(API_KEY, PromptPrefix, selection);
    generateFileForAnalysis(wordWrap(response, 100), PromptPrefix);
  } catch (error) {
    if (error.code === "ENOTFOUND") {
      vscode.window.showErrorMessage(`${PREFIX} Failed: Unable to connect to AI model. Please make sure you're connected to the Internet.`);
    } else {
      vscode.window.showErrorMessage(`${PREFIX} error: ${error.message}`);
    }
    console.log(error.message);
  }
}

function generateFileForAnalysis(data, PromptPrefix) {
  vscode.window.activeTextEditor;
  vscode.workspace.openTextDocument({ content: data }).then((document) => {
    vscode.window.showTextDocument(document, {
      viewColumn: vscode.ViewColumn.Two,
    });
    vscode.window.showInformationMessage(`${PREFIX}: ${PromptPrefix} generated.`);
  });
}

module.exports = CustomExecute;
