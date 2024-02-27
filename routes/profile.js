const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profile')
const {ensureAuth, ensureGuest} = require('../middleware/authMiddleware')


router.get("/", ensureAuth,profileController.getProfile)

// router.post("/addMovie",ensureAuth,homeController.addMovie)
// router.put("/addLike/:id",ensureAuth,homeController.addLike)
// router.put("/removeLike/:id",ensureAuth,homeController.removeLike)

module.exports = router

