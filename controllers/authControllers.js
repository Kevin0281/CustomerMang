// Export all functions so we can use it in authRoutes.js

// Function for the signup GET route
module.exports.signup_get = (req, res) => {
    res.render('signup')
}

// Function for the login GET route
module.exports.login_get = (req, res) => {
    res.render('login') 
}

// Function for the signup POST route
module.exports.signup_post = (req, res) => {
    res.send("new signup")
}

// Function for the login POST route
module.exports.login_post = (req, res) => {
    res.send("user login")
}