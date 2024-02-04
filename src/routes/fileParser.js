const express = require("express");
const router = express.Router();
const {
  getNumberOfWords,
  getNumberOfCharacters,
  getLongestWord,
  getNumberOfSentence,
  getNumberOfParagraphs,
} = require("../controllers/fileparser/file-parser.controller");
const withErrorHandler = require("../helpers/controllerErrorHandler");

router.get("/number-of-words", withErrorHandler(getNumberOfWords));
router.get("/number-of-characters", withErrorHandler(getNumberOfCharacters));
router.get("/longest-words", withErrorHandler(getLongestWord));
router.get("/number-of-sentences", withErrorHandler(getNumberOfSentence));
router.get("/number-of-paragraph", withErrorHandler(getNumberOfParagraphs));

module.exports = router;
