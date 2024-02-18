const express = require("express")
const path = require('path')
require('dotenv').config({path: './.env'})
const app = express()
const cors = require('cors');
const PORT = 8500
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const logger = require("morgan");
const methodOverride = require("method-override");
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const homeRoutes = require('./routes/home')
const profileRoutes = require('./routes/profile')
app.use(cors({
  origin: (origin, callback) => callback(null, true),
  credentials: true
}));
connectDB()
app.enable('trust proxy')

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

app.set('view engine', 'ejs')
// app.use(express.static('client/dist'))
app.use(express.static('client1/build'))
// Serve static files from 'client1' directory
// app.use('/', express.static("loginPage/build"));

// Serve static files from 'client2' directory
app.use('*', express.static(__dirname + '/loginPage'));

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

app.use('/', mainRoutes)
app.use('/api/home', homeRoutes)
app.use('/api/profile', profileRoutes)

// app.get('/',(req, res)=>{
//   res.sendStatus(__dirname, '/loginPage/build/index.html')
//   // res.send("Asdrfasdfasf")
// })
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client1/build/index.html'));
    // res.sendFile(path.join(__dirname, '/client/dist/index.html'));
});

app.listen(process.env.PORT || PORT,()=>{
    console.log(`The server is running on port ${PORT}`)
})