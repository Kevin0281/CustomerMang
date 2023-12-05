const express = require("express")
const mysql = require("mysql")

const authRoutes = require("./routes/authRoutes")

const port = 3000
const app = express()

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "0000",
    database: "first_application"
})

function createDatabaseIfNotExists() {
    con.query("CREATE DATABASE IF NOT EXISTS first_application", function (err) {
        if (err) throw err
        console.log("Database created")
    })
}

function createTableIfNotExists() {
    con.query("CREATE TABLE IF NOT EXISTS db_users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), picture VARCHAR(255))", function (err) {
        if (err) throw err
        console.log("Table successfully created")
    })
}

con.connect(function (err) {
    if (err) throw err
    console.log("Successfully connected to Database")
})

// Middleware
app.set('view engine', 'ejs')
app.use(express.static(__dirname + "/public"))

//Standard Route
app.get('/', (req, res) => {
    res.render('index', { loggedIn: req.oidc.isAuthenticated() });
});

app.listen(port, () => {
    console.log(`Application live and listening on port ${port}`)
})

app.use(authRoutes)