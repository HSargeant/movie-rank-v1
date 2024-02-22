const Movies = require('../models/movies')
const User = require('../models/user')
// const fetch = require('node-fetch')

module.exports = {
    getProfile: async (req,res)=>{
        try{
            const user = await User.findOne({_id: req.user.id}).lean()
            const ids=[]
            for(let id in user.likedMovies ){
                ids.push(id)
            }
            // //if we want added and liked movies on page
            // for(let id in user.addedMovies ){
            //     ids.push(id)
            // }
            // const uniqueIds = [...new Set(ids)]
            const allMovies = await Movies.find({ '_id': { $in: ids } }).lean().sort({likes:-1});
            // res.render('profile.ejs', {movie: allMovies, user: req.user})
            res.send(allMovies)
        }catch(err){
            console.log(err)
        }
    },
//     
}