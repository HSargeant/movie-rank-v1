const Movies = require('../models/movies')
const User = require('../models/user')
// const fetch = require('node-fetch')

module.exports = {
    getHomepage: async (req, res) => {
        try {
            const movies = await Movies.find().lean().sort({ likes: -1 })
                .populate('userId')
            // res.render('home.ejs', { movie: movies, user: req.user })
            res.json(movies)
        } catch (err) {
            console.log(err)
        }
    },
    addMovie: async (req, res) => {
        if (!req.body.name) {
            res.redirect('/home')
            return
        }
        let movieName = req.body.name.toLowerCase().trim()
        let year = req.body.year.trim()
        //get api data
        try {
            const apikey = process.env.APIKEY
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${movieName}&year=${year}`)
            const data = await response.json()
            if (data.total_results == 0) {
                res.redirect('/home')
                return
            }
            const path = `https://image.tmdb.org/t/p/original${data.results[0].poster_path}` || 'https://skydomepictures.com/wp-content/uploads/2018/08/movie-poster-coming-soon-2.png'

            //check if exist
            const check = await Movies.find({ name: data.results[0].original_title })
            console.log(check)
            if (check.length) {
                res.redirect('/home')
                return
            }
            //send to db
            // const post = await db.collection('movie-names').insertOne({name: data.results[0].original_title,
            // image: path, year: data.results[0].release_date.split("-")[0],  likes: 0})
            //////////////
            // console.log(data.results[0].original_title,path,data.results[0].release_date.split("-")[0])
            const newEntry = await Movies.create({
                name: data.results[0].original_title,
                image: path,
                year: data.results[0].release_date.split("-")[0],
                userId: req.user.id,
                likes: 1
            })
            await User.findOneAndUpdate({ _id: req.user.id },
                {
                    $set: { [`addedMovies.${newEntry._id}`]: true, [`likedMovies.${newEntry._id}`]: true }
                })
            console.log('Movie Added')
            res.redirect('/home')
        } catch (error) {
            console.log(error)
        }

    },
    addLike: async (req, res) => {
        try {
            const checkMovie = await Movies.findOne({ _id: req.params.id })
            const user = await User.findOne({ _id: req.user.id }).lean()
            // let stringOBJs = currentMovies.likedMovies.map(x=>x.toString())
            // console.log(stringOBJs,"-----------")
            console.log(user.likedMovies)
            // console.log(currentMovies.likedMovies[checkMovie._id], "does it exist")
            if (!user.likedMovies[checkMovie._id]) {
                await checkMovie.update({ $inc: { likes: 1 }, })
                await User.findOneAndUpdate({ _id: req.user.id },
                    { $set: { [`likedMovies.${checkMovie._id}`]: true } }
                )
                res.redirect("back")
                console.log('added like')
            } else {
                res.redirect("back")
            }
        } catch (err) {
            console.log(err)
        }
    },
    removeLike: async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.user.id })
            if (user.addedMovies[req.params.id]) {
                res.redirect("back")
                return
            }

            await Movies.findOneAndUpdate({ _id: req.params.id }, { $inc: { likes: -1 }, })
            await user.update({ $unset: { [`likedMovies.${req.params.id}`]: true } })
            // const newArray = moviesArray.likedMovies.filter(x=>x.toString()!==currentMovie._id.toString())
            // await moviesArray.update({$set:{likedMovies: newArray }})

            res.redirect("back")
            console.log('removed like')
        } catch (err) {
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