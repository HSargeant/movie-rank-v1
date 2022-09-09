const Movies = require('../models/movies')

module.exports = {
    getIndex: async (req,res)=>{
        if(!req.user){
            res.render('index.ejs')
        }else{
            try{
                const movies = await Movies.find()
                .populate('userId')
                res.render('home.ejs', {movie: movies, user: req.user})
            }catch(err){
                console.log(err)
            }
        } 
    }
}