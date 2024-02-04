const readline = require("readline");
const fs = require("fs");
const { resolve } = require("path");
const { HTTP_OK } = require("../../config/http-constants");
const LineByLineReader = require("line-by-line");

const fileName = "seed_data_four_million.txt";
const filekey = fileName.split(".")[0];

let lineCount = 0;
let wordCount = 0;
let longestWord = "";
let sentenceCount = 0;
let paragraphCount = 0;
let inParagraph = false;

const counterMap = new Map();

const processLineCount = function () {
  lineCount++;
};

const processParagraphCount = function (line) {
  if (line.trim() === "") {
    if (inParagraph) {
      inParagraph = false;
      paragraphCount++;
    }
  } else {
    inParagraph = true;
  }
};

const processSentenceCount = function (line) {
  sentenceCount += (line.match(/[.!?]+/g) || []).length;
};

const processWordCountAndLongestWord = function (line) {
  const words = line.split(/\s+/);
  words.forEach((word) => {
    if (word.length > longestWord.length) {
      longestWord = word;
    }
  });
  wordCount += words.length;
};

const increaseParagraphCounter = function () {
  if (inParagraph) {
    paragraphCount++;
  }
};

const processAllCounter = function (line) {
  processLineCount();
  processParagraphCount(line);
  processSentenceCount(line);
  processWordCountAndLongestWord(line);
};

const setAllMapKey = function () {
  counterMap.set(`${filekey}_word_count`, wordCount);
  counterMap.set(`${filekey}_line_count`, lineCount);
  counterMap.set(`${filekey}_longest_word`, longestWord);
  counterMap.set(`${filekey}_sentence_count`, sentenceCount);
  counterMap.set(`${filekey}_paragraph_count`, paragraphCount);
};

const resetAllVariable = function () {
  lineCount = 0;
  wordCount = 0;
  paragraphCount = 0;
  longestWord = "";
  sentenceCount = 0;
};

const getWordsCount = function () {
  return {
    value: counterMap.get(`${filekey}_word_count`),
    message: "Number of words from text file",
  };
};

const getLineCount = function () {
  return {
    value: counterMap.get(`${filekey}_line_count`),
    message: "Number of lines from text file",
  };
};
const getLongestWord = function () {
  return {
    value: counterMap.get(`${filekey}_longest_word`),
    message: "Longest words in paragraphs from text file",
  };
};

const getSentenceCount = function () {
  return {
    value: counterMap.get(`${filekey}_sentence_count`),
    message: "Number of sentence count from text file",
  };
};
const getparagraphCount = function () {
  return {
    value: counterMap.get(`${filekey}_paragraph_count`),
    message: "Number of paragraph count from text file",
  };
};

const fileProcessor = function (req, res, callback) {
  const { value: cacheValue, message: cacheValueMessage } = callback();
  if (cacheValue && cacheValue !== undefined) {
    res.status(HTTP_OK.code).json({
      suceess: true,
      message: cacheValueMessage,
      data: cacheValue,
    });
    return;
  }

  const filePath = resolve(__dirname, "../../seeder/data/" + fileName);

  // const readLine = readline.createInterface({
  //   input: fs.createReadStream(filePath),
  //   crlfDelay: Infinity,
  // });

  const readLine = new LineByLineReader(filePath);

  readLine.on("line", (line) => {
    processAllCounter(line);
  });
  readLine.on("end", () => {
    increaseParagraphCounter();
    setAllMapKey();
    resetAllVariable();
    const { value, message } = callback();
    res.status(HTTP_OK.code).json({
      suceess: true,
      message: message,
      data: value,
    });
  });
};

module.exports = {
  getWordsCount,
  getLineCount,
  getLongestWord,
  getSentenceCount,
  getparagraphCount,
  fileProcessor,
};
