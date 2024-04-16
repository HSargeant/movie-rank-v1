import Movies from '../models/movies.js'
import User from '../models/user.js'

export async function getProfile(req, res) {
    if (!req.user) {
        res.send({ "user": false })
    }
    try {
        const user = await User.findOne({ _id: req.user.id }).lean()
        const ids = []
        for (let id in user.likedMovies) {
            ids.push(id)
        }
        // //if we want added and liked movies on page
        // for(let id in user.addedMovies ){
        //     ids.push(id)
        // }
        // const uniqueIds = [...new Set(ids)]
        const allMovies = await Movies.find({ '_id': { $in: ids } }).lean().sort({ likes: -1 })
        res.send({ "movies": allMovies, "user": req.user })
    } catch (err) {
        console.log(err)
    }
}