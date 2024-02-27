const Movies = require('../models/movies')
const User = require('../models/user')

module.exports = {
    getHomepage: async (req, res) => {
        try {
            const movies = await Movies.find().lean().sort({ likes: -1 })
            res.json(movies)
        } catch (err) {
            console.log(err)
        }
    },
    addMovie: async (req, res) => {
        const data = req.body
        try {
            for (elem of data) {
                elem["userId"] = req.user.id
                elem["likes"] = 1
            }
            const result = await Movies.create(data)
            for (newEntry of result) {
                await User.findOneAndUpdate({ _id: req.user.id },
                    {
                        $set: { [`addedMovies.${newEntry._id}`]: true, [`likedMovies.${newEntry._id}`]: true }
                    })
            }
            console.log('Movie/s Added')
            res.sendStatus(201)
        } catch (error) {
            console.error(error)
        }
    },
    addLike: async (req, res) => {
        try {
            const checkMovie = await Movies.findOne({ _id: req.params.id })
            const user = await User.findOne({ _id: req.user.id }).lean()

            if (!user.likedMovies[checkMovie._id]) {
                await checkMovie.updateOne({ $inc: { likes: 1 }, })
                await User.findOneAndUpdate({ _id: req.user.id },
                    { $set: { [`likedMovies.${checkMovie._id}`]: true } }
                )
                console.log('added like')
                res.send({ "status": "success" })
            }
        } catch (err) {
            console.log(err)
            res.sendStatus(200)
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
            await user.updateOne({ $unset: { [`likedMovies.${req.params.id}`]: true } })
            console.log('removed like')
            res.sendStatus(200)
        } catch (err) {
            console.log(err)
        }
    },
    movieQuery: async (req, res) => {
        let { name, year } = req.body
        name = name.toLowerCase().trim()
        if (year) {
            year = year.trim()
            const check = !isNaN(+year) && +year / 1000 || 0.5;
            if (check < 1 || check >= 10 || +year < 1800 || + year > new Date().getFullYear()) { year = "" }
        }
        // //get api data
        try {
            const apikey = process.env.APIKEY
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${name}&year=${year}`)
            const data = await response.json()
            if (data.total_results == 0) {
                res.redirect('/home')
                return
            }
            const results = []
            for (let movie of data.results) {
                const check = await Movies.find({ name: movie.original_title })
                if (!check.length && movie.adult !=true) {
                    let obj = {
                        "name": movie.original_title,
                        "year": movie.release_date.split("-")[0],
                        "image": `https://image.tmdb.org/t/p/original${movie.poster_path}`,
                        "id": movie.id
                    }
                    results.push(obj)
                }
            }
            res.send(results)
        } catch (error) {
            console.log(error)
        }
    },
}