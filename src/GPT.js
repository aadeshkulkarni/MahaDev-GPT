const { Configuration, OpenAIApi } = require("openai");

const MODEL_OPTIONS = {
  model: "text-davinci-003",
  n: 1,
  stop: null,
  temperature: 0.5,
  max_tokens: 2000,
};

async function callGPT(apiKey, fileName, userPrompt) {
  const configuration = new Configuration({
    apiKey: apiKey,
  });
  
  const openai = new OpenAIApi(configuration);
  
  const completion = await openai.createCompletion({ ...MODEL_OPTIONS, prompt: userPrompt });
  return `// ${fileName} \n ${completion.data.choices[0].text}`;
}

module.exports = { callGPT };