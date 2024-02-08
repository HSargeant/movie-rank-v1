const passport = require('passport')
// const validator = require('validator')

module.exports={
  getLogin: (req, res) => {
      if (req.user) {
        return res.redirect('/home')
      }
      res.render('login.ejs')
    },
    logout: (req, res) => {
      req.logout((err)=> { 
        if (err) { 
          return next(err); 
          }
          req.session.destroy((err) => {
            if (err) console.log('Error : Failed to destroy the session during logout.', err)
            req.user = null
            // res.redirect('/')
            res.send({success:true})
          })
      });
    },
    getUser: (req, res) => {
      res.json({ user: req.user || null });
    }


}



  // router.post('/logout',(req, res, next)=> {
  //   req.logout((err)=> {
  //       console.log("logging out")
  //     if (err) { return next(err); }
  //     res.redirect('/');
  //   });
  // });





/////////////////////////////////////////
 //authenticate
// app.get('/auth/google',passport.authenticate('google',{scope: ['profile']}))

// app.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/'}),(req, res)=>{
//     console.log("redir")
//     res.redirect('/profile')
// })

// // log out user
// app.post('/logout',(req, res, next)=> {
//     req.logout((err)=> {
//         console.log("logging out")
//       if (err) { return next(err); }
//       res.redirect('/');
//     });
// });