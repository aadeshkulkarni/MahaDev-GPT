// @ts-nocheck
const vscode = require("vscode");
const config = require("../config.json");
const { callGPT } = require("./GPT");
const { PREFIX } = config
async function GenerateCode() {
  try {
    let editor = vscode.window.activeTextEditor;
    if (editor.document.getText().trim() === "") {
      vscode.window.showErrorMessage("File is empty. Kindly insert your query and select it and try again.");
      return;
    }
    let selection = editor.selection;
    let multiLineText = editor.document.getText(selection);
    await fetchUserInputs(multiLineText);
  } catch (error) {
    vscode.window.showErrorMessage("Failed with the following error: ", error);
  }
}

async function fetchUserInputs(multiLineText) {
  const API_KEY = vscode.workspace.getConfiguration().get('mahadev-gpt.apiKey');
  console.log("Explain Code: OpenAI key: ",API_KEY)
    
  let Lines = multiLineText.split("\n");
  for (let i = 0; i < Lines.length; i++) {
    let fileName = Lines[i].split(">").length > 1 ? Lines[i].split(">")[0] : null;
    let userPrompt = Lines[i].split(">").length > 1 ? Lines[i].split(">")[1] : Lines[i].split(">")[0];
    if (userPrompt === undefined || userPrompt === null || userPrompt.trim() === "") {
      vscode.window.showInformationMessage(`${PREFIX}: Empty selection. Kindly select your query and try again.`);
    } else {
      vscode.window.showInformationMessage(`${PREFIX}: Creating ${fileName ? fileName : "file"} now. Loading ... Please wait`);
      const fileHeading = fileName ? fileName : userPrompt;
      const response = await callGPT(API_KEY, fileHeading, userPrompt);
      generateFile(fileName, response);
    }
  }
}

function generateFile(fileName, data) {
  vscode.window.activeTextEditor;
  vscode.workspace.openTextDocument({ language: "javascript", content: data }).then((document) => {
    vscode.window.showTextDocument(document);
    vscode.window.showInformationMessage(`${PREFIX}: ${fileName ? fileName : "code"} generated successfully`);
  });
}

module.exports = GenerateCode;
