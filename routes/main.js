const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const { ensureAuth,ensureGuest } = require('../middleware/authMiddleware')
const passport = require('passport')

router.get('/auth/google',passport.authenticate('google',{scope: ['profile']}))

router.post('/api/logout', ensureAuth,authController.logout)

router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/'}),(req, res)=>{
    console.log("user logged in")
    res.redirect('/home')
})
router.get("/api/user",authController.getUser )

module.exports = router