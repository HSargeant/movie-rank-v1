//express + MONGO SET UP
const express = require("express")
const app = express()
const PORT = 8500
const fetch = require('node-fetch');
const MongoClient = require("mongodb").MongoClient
// const cors = require("cors")
require('dotenv').config()
app.enable('trust proxy')

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
    console.log(req.ip, req.ips)

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
app.put('/addOneLike', async (req, res) => {

    let ip = await db.collection('ip').find().toArray()
    console.log(ip.filter(x=>x.ipadd==req.ip)[0].like.includes(req.body.movieName))

    if(!ip.find(elem=>elem.ipadd == req.ip)){
        await db.collection('ip').insertOne({
         ipadd: req.ip,like: [req.body.movieName]})
     }else {
        if(ip.filter(x=>x.ipadd==req.ip)[0].like.includes(req.body.movieName)){
            res.redirect('/')
            return
        }
       await db.collection('ip').updateOne({ipadd: req.ip}, {$push:{like: req.body.movieName}})

     }


    if(ip.filter(x=>x.ipadd==req.ip)[0].like.includes(req.body.movieName)){
        res.redirect('/')
        return
    }

    let updatelikes = req.body.currentLikes + 1
    db.collection('movie-names').updateOne({name: req.body.movieName,image: req.body.moviePoster, year:req.body.releaseYear,likes:req.body.currentLikes},{
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

app.put('/removeLike', async (req, res) => {
    let updatelikes =req.body.currentLikes - 1
    db.collection('movie-names').updateOne({name: req.body.movieName,image: req.body.moviePoster, year:req.body.releaseYear,likes:req.body.currentLikes},{
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
    // if()
    // await db.collection('ip').updateOne({ipadd: req.ip}, {$pop:{like: 1}})
    let ip = await db.collection('ip').find().toArray()
    await db.collection('ip').updateOne({ipadd: req.ip}, {$set:{like: ip.filter(x=>x.ipadd==req.ip)[0].like.filter(x=>x!== req.body.movieName)}})

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