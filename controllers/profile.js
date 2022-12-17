const Movies = require('../models/movies')
const User = require('../models/user')
// const fetch = require('node-fetch')

module.exports = {
    getProfile: async (req,res)=>{
        try{
            const movies = await User.findOne({_id: req.user.id}).lean()
            .populate('likedMovies')
            const addedMovies = await Movies.find({userId: req.user.id}).lean()
            let obj={},resultArr=[]
            let combineMovies= movies.likedMovies.concat(addedMovies)
            for(let i=0; i<combineMovies.length; i++){
                obj[combineMovies[i]._id]=true
            }
            for(let i=0; i<combineMovies.length; i++){
                if(obj[combineMovies[i]._id]==true){
                    resultArr.push(combineMovies[i])
                    obj[combineMovies[i]._id]=false
                }
            }
            resultArr.sort((a,b)=>b.likes-a.likes)
            res.render('profile.ejs', {movie: resultArr, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    addMovie: async (req, res) => {
        if(!req.body.name){
            res.redirect('/home')
            return
        }
        let movieName = req.body.name.toLowerCase().trim()
        let year = req.body.year.trim()
        //get api data
        try{
            const apikey = process.env.APIKEY
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${movieName}&year=${year}`)
            const data = await response.json()
            if(data.total_results==0){
                res.redirect('/home')
                return
            }
            const path = `https://image.tmdb.org/t/p/original${data.results[0].poster_path}` || 'https://skydomepictures.com/wp-content/uploads/2018/08/movie-poster-coming-soon-2.png'
    
            //check if exist
            const check = await Movies.find({name: data.results[0].original_title})
            console.log(check)
            if(check.length){
                res.redirect('/home')
                return
            }
        //send to db
        // const post = await db.collection('movie-names').insertOne({name: data.results[0].original_title,
        // image: path, year: data.results[0].release_date.split("-")[0],  likes: 0})
//////////////
// console.log(data.results[0].original_title,path,data.results[0].release_date.split("-")[0])
            const newEntry=  await Movies.create({
                name: data.results[0].original_title,
                image: path,
                year: data.results[0].release_date.split("-")[0],
                userId: req.user.id,
            })
            await User.findOneAndUpdate({_id: req.user.id},
                {
                    $push:{addedMovies: newEntry._id  }
                })
        console.log('Movie Added')
        res.redirect('/home')
        }catch(error){
            console.log(error)
        }
         
    },
    addLike: async (req,res)=>{
        try{
            const checkMovie = await Movies.findOne({_id: req.params.id})
            const currentMovies = await User.findOne({_id: req.user.id}).lean()
            let stringOBJs = currentMovies.likedMovies.map(x=>x.toString())
            // console.log(stringOBJs,"-----------")

            if(stringOBJs.indexOf(checkMovie._id.toString())==-1){
                await checkMovie.update({$inc: { likes: 1 },})
                    res.redirect("back")
                    console.log('added like')
                await User.findOneAndUpdate({_id: req.user.id},
                    {
                        $push:{likedMovies: checkMovie._id  }
                    })
            }else {
                res.redirect("back")
            }
        }catch(err){
            console.log(err)
        }
    },
    removeLike: async (req,res)=>{
        try{
            const currentMovie = await Movies.findOneAndUpdate({_id: req.params.id},{$inc: { likes: -1 },})
            const moviesArray = await User.findOne({_id: req.user.id}).lean()
            const newArray = moviesArray.likedMovies.filter(x=>x.toString()!==currentMovie._id.toString())
            await moviesArray.update({likedMovies: newArray })

            res.redirect("back")
            console.log('removed like')
        }catch(err){
            console.log(err)
        }
        
    },
    // deleteMovie: async (req,res)=>{
    //         try{
    //             await Movies.findOneAndDelete({_id:req.body.reviewId})
    //             console.log('Deleted Checkin')
    //             res.json('Deleted It')
    //         }catch(err){
    //             console.log(err)
    //         }
        
    // }
}