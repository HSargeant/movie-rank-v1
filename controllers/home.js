import Movies from '../models/movies.js'
import User from '../models/user.js'

export async function getHomepage(req, res) {
    if (!req.user) {
        res.send({ "user": false })
    }
    try {
        const movies = await Movies.find().lean().sort({ likes: -1 })
        res.send({ "movies": movies, "user": req.user })
    } catch (err) {
        console.log(err)
    }
}
export async function addMovie(req, res) {
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
}
export async function addLike(req, res) {
    try {
        const checkMovie = await Movies.findOne({ _id: req.params.id })
        const user = await User.findOne({ _id: req.user.id })
        if (!user.likedMovies.get(checkMovie._id)) {
            await checkMovie.updateOne({ $inc: { likes: 1 }, })
            await user.updateOne({ $set: { [`likedMovies.${checkMovie._id}`]: true } })
            console.log('added like')
            res.send({ "status": "success" })
        }
    } catch (err) {
        console.log(err)
        res.status(202).end()
    }
}
export async function removeLike(req, res) {
    try {
        const user = await User.findOne({ _id: req.user.id })
        await Movies.findOneAndUpdate({ _id: req.params.id, likes: { $gte: 1 } }, { $inc: { likes: -1 }, })
        await user.updateOne({ $unset: { [`likedMovies.${req.params.id}`]: true } })
        if (user.addedMovies.get(req.params.id)) {
            await user.updateOne({ $unset: { [`addedMovies.${req.params.id}`]: true } })
        }
        console.log('removed like')
        res.status(202).end()
    } catch (err) {
        console.log(err)
    }
}
export async function movieQuery(req, res) {
    let { name, year } = req.body
    name = name.toLowerCase().trim()
    if (year) {
        year = year.trim()
        const check = !isNaN(+year) && +year / 1000 || 0.5
        if (check < 1 || check >= 10 || +year < 1800 || +year > new Date().getFullYear()) { year = ""} 
    }
    // //get api data
    try {
        const apikey = process.env.APIKEY
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${name}&year=${year}`)
        const data = await response.json()
        if (data.total_results == 0) {
            res.send([])
        }
        const results = []
        for (let movie of data.results) {
            const check = await Movies.find({ name: movie.title })
            if (check.length == 0 && movie.adult == false) {
                let image = movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : "https://images4.imagebam.com/5c/40/6a/MECU90Y_o.png"
                let obj = {
                    "name": movie.title,
                    "year": movie.release_date.split("-")[0],
                    "image": image,
                    "id": movie.id
                }
                results.push(obj)
            }
        }
        res.send(results)
    } catch (error) {
        console.log(error)
    }
}