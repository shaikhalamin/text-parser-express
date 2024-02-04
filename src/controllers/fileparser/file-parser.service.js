const {
  fileProcessor,
  getWordsCount,
  getCharacterCount,
  getLineCount,
  getLongestWord,
  getSentenceCount,
  getparagraphCount,
} = require("./file-parser.helper");

const getWords = (req, res) => {
  return fileProcessor(req, res, getWordsCount);
};

const getCharacters = (req, res) => {
  return fileProcessor(req, res, getCharacterCount);
};

const getLines = (req, res) => {
  return fileProcessor(req, res, getLineCount);
};

const getLongestWords = (req, res) => {
  return fileProcessor(req, res, getLongestWord);
};

const getSentences = (req, res) => {
  return fileProcessor(req, res, getSentenceCount);
};

const getParagraphs = (req, res) => {
  return fileProcessor(req, res, getparagraphCount);
};

module.exports = {
  getWords,
  getLines,
  getCharacters,
  getLongestWords,
  getSentences,
  getParagraphs,
};
