const mysql = require("mysql")

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "0000",
    database: "customers"
})

module.exports = con