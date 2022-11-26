const Movies = require('../models/movies')
// const fetch = require('node-fetch')


module.exports = {
    getHomepage: async (req,res)=>{
        try{
            const movies = await Movies.find()
            .populate('userId')
            res.render('home.ejs', {movie: movies, user: req.user})
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
    
            //check if 
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
console.log(data.results[0].original_title,path,data.results[0].release_date.split("-")[0])

            await Movies.create({
                name: data.results[0].original_title,
                image: path,
                year: data.results[0].release_date.split("-")[0],
                userId: req.user.id,


            })
        console.log('Movie Added')
        res.redirect('/home')
        }catch(error){
            console.log(error)
        }
         
    },
    addLike: async (req,res)=>{

    

    },
    removeLike: async (req,res)=>{
        
    }
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