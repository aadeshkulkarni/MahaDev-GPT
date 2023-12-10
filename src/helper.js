function wordWrap(string, CHAR_LIMIT) {
  let newString = "";
  let currentLength = 0;

  for (let char of string) {
    if (currentLength > CHAR_LIMIT && char === " ") {
      newString += "\n";
      currentLength = 0;
    }
    newString += char;
    currentLength++;
  }

  return newString;
}

module.exports = { wordWrap };
