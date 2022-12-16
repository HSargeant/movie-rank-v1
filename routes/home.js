const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
const {ensureAuth, ensureGuest} = require('../middleware/authMiddleware')


router.get("/", ensureAuth,homeController.getHomepage)

router.post("/addMovie",ensureAuth,homeController.addMovie)
router.put("/addLike/:id",ensureAuth,homeController.addLike)
router.put("/removeLike/:id",ensureAuth,homeController.removeLike)

module.exports = router

