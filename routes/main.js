const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const indexController = require('../controllers/index')
const { ensureAuth,ensureGuest } = require('../middleware/authMiddleware')
const passport = require('passport')


router.get('/', indexController.getIndex)
router.get('/auth/google',passport.authenticate('google',{scope: ['profile']}))
// router.post('/login', authController.postLogin)

router.post('/logout', authController.logout)

router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/'}),(req, res)=>{
    console.log("redir")
    res.redirect('/home')
})
// router.get('/signup', authController.getSignup)
// router.post('/signup', authController.postSignup)

module.exports = router

// app.get('/auth/google',passport.authenticate('google',{scope: ['profile']}))
