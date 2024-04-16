import express, { urlencoded, json } from "express";
const app = express()
import path from 'path';
import logger from "morgan";
import cors from 'cors';
const PORT = 8500
import passport from 'passport';
import session from 'express-session';
import mainRoutes from './routes/main.js';
import homeRoutes from './routes/home.js';
import profileRoutes from './routes/profile.js';
import MongoStore from 'connect-mongo';
import connectDB from './config/database.js';
// require('dotenv').config({path: './.env'})
import dotenv from 'dotenv'
import passportConfig from "./config/passport.js"

dotenv.config({ path: './.env' })

//require pass config
// require('./config/passport').default(passport)
passportConfig(passport)
app.use(logger("dev"));
app.use(cors({
  origin: (origin, callback) => callback(null, true),
  credentials: true
}));
app.use(urlencoded({ extended: true }))
app.use(json())

// app.enable('trust proxy')

app.use(express.static('client/dist'))



//sesions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URL})
  }))


app.use(passport.initialize())
app.use(passport.session())

app.use('/', mainRoutes)
app.use('/api/home', homeRoutes)
app.use('/api/profile', profileRoutes)

app.use('*', (req, res) => {
    const __dirname = path.resolve();
    res.sendFile(path.join(__dirname, '/client/dist/index.html'));
});

connectDB().then(()=>{
  app.listen(process.env.PORT || PORT,()=>{
      console.log(`The server is running on port ${PORT}`)
  })
})