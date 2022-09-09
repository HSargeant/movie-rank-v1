const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
const {ensureAuth, ensureGuest} = require('../middleware/authMiddleware')


router.get("/", ensureAuth,homeController.getHomepage)

router.post("/addMovie",ensureAuth,homeController.addMovie)
router.post("/addLike",ensureAuth,homeController.addMovie)
router.post("/removeLike",ensureAuth,homeController.addMovie)

module.exports = router