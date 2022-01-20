const express = require("express");
const database = require("../common/connect.js");
const logger = require("../common/log.js");

// define a router
var router = express.Router();
router.use(express.json({ type: "*/*" }));

router.get("/", function (req, res) {
  res.json({ message: "Server alive" });
});

/**
 * 1. Get the stock code from the client request.
 * 2. Query the database for the stock code.
 * 3. If the stock code is not found, return an error message.
 * 4. If the stock code is found, return the stock information.
 *
 */
router.get("/getStockInfo", function (req, res) {
  var code = req.query.code;
  console.log(`Client request ${code}`);
  logger.info(`Client request ${code}`);

  //database query
  var query = `SELECT * FROM stock WHERE code= '${code}';`;

  var conn = database.createConnection();

  conn.query(query, function (err, result) {
    if (err) {
      res.status(400).json({ error: "Error in database operation" });
      logger.error(`Call api select ${code} failed. Error: ${err.stack}`);
    } else {
      if (!result.length) {
        res.status(200).json({ error: code + " not found" });
      } else res.status(200).json(result[0]);
    }
  });
  conn.end();
});

module.exports = router;
