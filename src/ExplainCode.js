// @ts-nocheck
const vscode = require("vscode");
const config = require("../config.json");
const { callGPT } = require("./GPT");
const { wordWrap } = require("./helper");
const { PREFIX } = config

async function ExplainCode() {
  try {
    const API_KEY = vscode.workspace.getConfiguration().get('mahadev-gpt.apiKey');
    console.log("Explain Code: OpenAI key: ",API_KEY)
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
    let multiLineText = `Analyse this code snippet \n ${selection}`;
    vscode.window.showInformationMessage(`Analysing query now. Please wait...`);
    const response = await callGPT(API_KEY, "Code analysis: ", multiLineText);    
    generateFileForAnalysis(`/* \n${wordWrap(response, 100)} \n*/`);
    vscode.window.showInformationMessage(`${PREFIX}: Analysis done.`);
  } catch (error) {
    if (error.code === "ENOTFOUND") {
      vscode.window.showErrorMessage(`${PREFIX} Failed: Unable to connect to AI model. Please make sure you're connected to the Internet.`);
    } else {
      vscode.window.showErrorMessage(`${PREFIX} error: ${error.message}`);
    }
    console.log(error.message);
  }
}

function generateFileForAnalysis(data) {
  vscode.window.activeTextEditor;
  vscode.workspace.openTextDocument({ content: data }).then((document) => {
    vscode.window.showTextDocument(document, {
      viewColumn: vscode.ViewColumn.Two,
    });
    vscode.window.showInformationMessage(`${PREFIX}: Analysis complete.`);
  });
}

module.exports = ExplainCode;
