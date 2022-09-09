const Movies = require('../models/movies')

module.exports = {
    getIndex: async (req,res)=>{
        if(!req.user){
                res.render('login.ejs')
        }else{

            try{
                const movies = await Movies.find()
                .populate('userId')
                res.render('user.ejs', {title: 'Taste of the Town', posts: posts, user: req.user, countryData: countryList.getData()})
            }catch(err){
                console.log(err)
            }

        }
        
    }
}