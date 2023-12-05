const { Router } = require("express")
const authController = require("../controllers/authControllers")

// Invoke the Router we destructed
const router = Router()

// Routes for signing up
// These functions are all being imported from authControllers.js
router.get('/signup', authController.signup_get)

router.post('/signup', authController.signup_post)

// Routes for login
router.get('/login', authController.login_get)

router.post('/login', authController.login_post)

// Exports the router so we can use it in different files
module.exports = router