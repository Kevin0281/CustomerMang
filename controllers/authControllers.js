const validator = require("validator")

const bcrypt = require("bcryptjs")

const dbHandler = require("../databasehandler/sqlDatabase")

const jwt = require("jsonwebtoken")

// Function to error general field validation from backend
function handleErrors(res, email, password) {
    dbHandler.query(`SELECT * FROM db_users WHERE email = "${email}"`, async function (err, results) {
        if (err) throw err
        if (results.length > 0) {
            res.status(400).json({ "message": "Email already exists" })
        } else {
            if (validator.isEmail(email)) {
                if (validator.isLength(password, { min: 8 })) {
                    // Generate a salt
                    const salt = await bcrypt.genSalt()
                    // Hashed version of the password
                    const hashedPassword = await bcrypt.hash(password, salt)
                    dbHandler.query(`INSERT IGNORE INTO db_users(email, password) VALUES ("${email}", "${hashedPassword}")`, function (err) {
                        if (err) throw err
                        res.status(201).send("New Signup")
                    })
                } else {
                    res.status(400).json({ "message": "Password needs to be atleat 8 characters." })
                }
            } else {
                res.status(400).json({ "message": "Please fill in a correct email address." })
            }
        }
    })
}


module.exports.signup_get = (req, res) => {
    res.render('signup')
}

module.exports.login_get = (req, res) => {
    res.render('login')
}

module.exports.signup_post = (req, res) => {
    const { email, password } = req.body
    try {
        handleErrors(res, email, password)
    } catch (error) {
        console.log(error)
    }
}

module.exports.login_post = (req, res) => {
    res.send("user login")
}