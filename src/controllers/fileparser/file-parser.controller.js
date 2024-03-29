const {
  getWords,
  getLines,
  getCharacters,
  getLongestWords,
  getSentences,
  getParagraphs,
} = require("./file-parser.service");

const getNumberOfWords = (req, res) => {
  return getWords(req, res);
};

const getNumberOfLines = (req, res) => {
  return getLines(req, res);
};

const getNumberOfCharacters = (req, res) => {
  return getCharacters(req, res);
};

const getLongestWord = (req, res) => {
  return getLongestWords(req, res);
};

const getNumberOfSentence = (req, res) => {
  return getSentences(req, res);
};

const getNumberOfParagraphs = (req, res) => {
  return getParagraphs(req, res);
};

module.exports = {
  getNumberOfWords,
  getNumberOfLines,
  getNumberOfCharacters,
  getLongestWord,
  getNumberOfSentence,
  getNumberOfParagraphs,
};
