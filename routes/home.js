import { Router } from 'express'
const router = Router()
import { getHomepage, addMovie, addLike, removeLike, movieQuery } from '../controllers/home.js'
import { ensureAuth, ensureGuest } from '../middleware/authMiddleware.js'


router.get("/", ensureAuth,getHomepage)

router.post("/addMovie",ensureAuth,addMovie)
router.put("/addLike/:id",ensureAuth,addLike)
router.put("/removeLike/:id",ensureAuth,removeLike)
router.post("/movieQuery",ensureAuth,movieQuery)

export default router

