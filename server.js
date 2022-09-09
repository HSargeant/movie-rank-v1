//express + MONGO SET UP
const express = require("express")
const app = express()
const PORT = 8500
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const fetch = require('node-fetch')
const user = require('./models/user')
const mongoose = require('mongoose')
const logger = require("morgan");



const MongoClient = require("mongodb").MongoClient
// const cors = require("cors")
require('dotenv').config()
app.enable('trust proxy')

let db
const dbName = process.env.DBNAME
const connectionString = process.env.MONGO_URL
const apikey = process.env.APIKEY

//Logging
app.use(logger("dev"));


MongoClient.connect(connectionString,{ useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
// async function goose(){
//         try {
//             const conn = await mongoose.connect(process.env.MONGO_URL,{
//                 useNewURLParser: true,
//                 useUnifiedTopology: true,
//             })
//             console.log(`connected to ${conn.connection.host}`)
    
//         } catch (error) {
//             console.log(error)
//             process.exit(1)
//         }
//     }
//     goose()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//sesions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URL})

  }))

  //require pass config
require('./config/passport')(passport)

app.use(passport.initialize())
app.use(passport.session())

app.get('/',(req, res)=>{

    db.collection('movie-names').find().sort({likes: -1}).toArray()
    .then(data => {
        res.render('home.ejs', { movie: data, user:req.user })
    })
    .catch(error => console.error(error))
})

app.get('/login',(req, res)=>{
        res.render('login.ejs')
})

//authenticate
app.get('/auth/google',passport.authenticate('google',{scope: ['profile']}))

app.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/'}),(req, res)=>{
    console.log("redir")
    res.redirect('/profile')
})

// log out user
app.post('/logout',(req, res, next)=> {
    req.logout((err)=> {
        console.log("logging out")
      if (err) { return next(err); }
      res.redirect('/');
    });
});

app.get('/profile',(req, res)=>{
    if(!req.user){
        res.redirect("/")
        return
    }
    //user movie collection
    db.collection('g-users').find({_id: req.user._id}).sort({"movies.likes": -1}).toArray()
    .then(data => {
        // console.log(data,"$$$$$$$$-----$$$$$$$$$$$$")
        res.render('dashboard.ejs', { movie: data,user:req.user })
    })
    .catch(error => console.error(error))
})


//add movie to database

app.post('/addMovie', async (req, res) => {
    if(!req.body.name){
        res.redirect('/')
        return
    }
    let movieName = req.body.name.toLowerCase().trim()
    let year = req.body.year.trim()

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


    if(req.user){
        const user = await db.collection('g-users').updateOne( { _id: req.user._id },{ $push: { movies: {name: data.results[0].original_title,
            image: path, year: data.results[0].release_date.split("-")[0],  likes: 0} } })
            console.log(user,req.user._id,"asfafaf")
    }

    console.log('Movie Added')
    res.redirect('/')
    }catch(error){
        console.log(error)
    }
     
})

//add likes
app.put('/addOneLike', async (req, res) => {

    addIPtoDB(req.ip,req.body.movieName)

    let updatelikes = req.body.currentLikes + 1
    db.collection('movie-names').updateOne({name: req.body.movieName,image: req.body.moviePoster, year:req.body.releaseYear,likes:req.body.currentLikes},{
        $set: {
            likes: updatelikes
          }
    },{
        sort: {likes: -1},
        upsert: false
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
        upsert: false
    })
    .then(result => {
        console.log('removed One Like')
        res.json('Like removed')
    })
    .catch(error => console.error(error))


    updateIPLikeList(req.ip,req.body.movieName)

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


async function addIPtoDB(address,name){
    let ip = await db.collection('ip').find().toArray()
    // console.log(ip.filter(x=>x.ipadd==req.ip)[0].like.includes(req.body.movieName))

    if(!ip.find(elem=>elem.ipadd == address)){
        await db.collection('ip').insertOne({
         ipadd: address,like: [name]})
     }else {
        if(ip.filter(x=>x.ipadd==address)[0].like.includes(name)){
            // res.redirect('/')
            return
        }
       await db.collection('ip').updateOne({ipadd: address}, {$push:{like: name}})

     }


    if(ip.filter(x=>x.ipadd==address)[0].like.includes(name)){
        // res.redirect('/')
        return
    }
    
}

async function updateIPLikeList(address,name){
    let ip = await db.collection('ip').find().toArray()
    await db.collection('ip').updateOne({ipadd: address}, {$set:{like: ip.filter(x=>x.ipadd==address)[0].like.filter(x=>x!== name)}})
}

app.listen(process.env.PORT || PORT,()=>{
    console.log(`The server is running on port ${PORT}`)
})