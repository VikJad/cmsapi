const poolPromise = require("../database/sql_conn");
const mysql = require("mysql2");

module.exports.crud = async (uspName, params) => {
    let paramLength = '';

    if (typeof (params) !== "string") {
        for (let i = 0; i < params.length; i++) {
            if (params.length === i + 1) {
                paramLength += '?'
            } else {
                paramLength += '?,'
            }
        }
    } else {
        paramLength = '?'
    }
    return await poolPromise.query(`call ${uspName}(${paramLength})`, params)
}
