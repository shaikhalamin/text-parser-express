const { HTTP_INTERNAL_SERVER_ERROR } = require("../config/http-constants");
/**
 * @description any uncaught global error or exception will be caught here and handled
 * @param err
 * @param req
 * @param res
 * @returns {*}
 */
module.exports = function (err, req, res) {
  console.info("Global error handler");
  console.error(err);
  return res.status(HTTP_INTERNAL_SERVER_ERROR.code).json({
    suceess: false,
    message: HTTP_INTERNAL_SERVER_ERROR.message,
    data: null,
  });
};
