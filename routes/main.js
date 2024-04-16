import { Router } from 'express'
const router = Router()
import { logout, getUser } from '../controllers/auth.js' 
import { ensureAuth, ensureGuest } from '../middleware/authMiddleware.js'
import passport  from 'passport'

router.get('/auth/google',passport.authenticate('google',{scope: ['profile']}))

router.post('/api/logout', ensureAuth,logout)

router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/'}),(req, res)=>{
    console.log("user logged in")
    res.redirect('/home')
})
router.get("/api/user",getUser )

export default router