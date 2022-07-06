//express + MONGO SET UP
const express = require("express")
const app = express()
const PORT = 8500
const fetch = require('node-fetch');
const MongoClient = require("mongodb").MongoClient
// const cors = require("cors")
require('dotenv').config()

let db
const dbName = process.env.DBNAME
const connectionString = process.env.MONGO_URL
const apikey = process.env.APIKEY

MongoClient.connect(connectionString,{ useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/',(req, res)=>{

    db.collection('movie-names').find().sort({likes: -1}).toArray()
    .then(data => {
        res.render('index.ejs', { movie: data })
    })
    .catch(error => console.error(error))
})



//add movie to database

app.post('/addMovie', async (req, res) => {
    if(!req.body.name){
        res.redirect('/')
        return
    }
    let movieName = req.body.name.toLowerCase()
    let year = req.body.year

    //get api data
    try{
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${movieName}&year=${year}`)
        const data = await response.json()
        if(data.total_results==0){
            res.redirect('/')
            return
        }
        const path = `https://image.tmdb.org/t/p/original${data.results[0].poster_path}` || 'https://skydomepictures.com/wp-content/uploads/2018/08/movie-poster-coming-soon-2.png'


        //check if 
        const check = await db.collection('movie-names').find().toArray()
        if(check.find(elem=>elem.name ==data.results[0].original_title )){
            res.redirect('/')
            return
        }
    //send to db
    const post = await db.collection('movie-names').insertOne({name: data.results[0].original_title,
    image: path, year: data.results[0].release_date.split("-")[0],  likes: 0})

    console.log('Movie Added')
    res.redirect('/')
    }catch(error){
        console.log(error)
    }
     
})

//add likes
app.put('/addOneLike', (req, res) => {
    let updatelikes = req.body.currentLikes + 1
    db.collection('movie-names').updateOne({name: req.body.movieName},{
        $set: {
            likes: updatelikes
          }
    },{
        sort: {likes: -1},
        upsert: true
    })
    .then(result => {
        console.log('Added One Like')
        res.json('Like Added')
    })
    .catch(error => console.error(error))

})
app.put('/removeLike', (req, res) => {
    let updatelikes =req.body.currentLikes - 1
    db.collection('movie-names').updateOne({name: req.body.movieName},{
        $set: {
            likes: updatelikes
          }
    },{
        sort: {likes: -1},
        upsert: true
    })
    .then(result => {
        console.log('removed One Like')
        res.json('Like removed')
    })
    .catch(error => console.error(error))

})

// app.delete('/deleteMovie', (req, res) => {
//     db.collection('movie-names').deleteOne({"name": req.body.movieName})
//     .then(result => {
//         console.log(req.body.movieName)
//         console.log('Movie Deleted')
//         res.json('Movie Deleted')
//     })
//     .catch(error => console.error(error))
// })

app.listen(process.env.PORT || PORT,()=>{
    console.log(`The server is running on port ${PORT}`)
})