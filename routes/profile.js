import { Router } from 'express'
const router = Router()
import { getProfile } from '../controllers/profile.js'
import { ensureAuth, ensureGuest } from '../middleware/authMiddleware.js'


router.get("/", ensureAuth,getProfile)

// router.post("/addMovie",ensureAuth,homeController.addMovie)
// router.put("/addLike/:id",ensureAuth,homeController.addLike)
// router.put("/removeLike/:id",ensureAuth,homeController.removeLike)

export default router

