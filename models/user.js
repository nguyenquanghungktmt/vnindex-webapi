const conn = require('../common/connect.js')
const logger = require('../common/log.js')

// var conn = db.getConnection()

function selectStock(code) {
	
    query = "SELECT * FROM stock WHERE code='" + code + "';"
	conn.query(query, function (err, result) {
		if (err) {
            logger.error(`Call api select ${code} failed. Error in database operation: ${error.message}`)
            return {"error": "Error in database operation" + error.message}
        }
        else {
            if (!result.length){
                return {"error": code + " not found"}
            }
            return result[0]
        }
  	})

	// return false;
}

module.exports = {
	selectStock: selectStock
}