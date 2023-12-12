const express = require("express")
const cookieParser = require('cookie-parser')
const mysqlDB = require('./databasehandler/sqlDatabase')
const authRoutes = require("./routes/authRoutes")

const port = 3000
const app = express()

// MySQL connection
mysqlDB.connect(function (err) {
    if (err) throw err
    console.log("Successfully connected to Database")
})

// Middleware
app.set('view engine', 'ejs')
app.use(express.static(__dirname + "/public"))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => {
    console.log(`Application live and listening on port ${port}`)
})

app.use(authRoutes)