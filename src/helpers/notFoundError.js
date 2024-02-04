const { HTTP_NOT_FOUND } = require("../config/http-constants");

/**
 * 404 Not Found Error Handler
 * @param req
 * @param res
 */
module.exports = function (req, res) {
  res
    .status(HTTP_NOT_FOUND.code)
    .json({ suceess: false, message: HTTP_NOT_FOUND.message, data: null });
};
