const express = require("express")
const app = express()
const path = require('path')
const logger = require("morgan");
const cors = require('cors');
const PORT = 8500
const passport = require('passport')
const session = require('express-session')
const mainRoutes = require('./routes/main')
const homeRoutes = require('./routes/home')
const profileRoutes = require('./routes/profile')
const rankRoutes = require('./routes/rank')
const MongoStore = require('connect-mongo')
const connectDB = require('./config/database')
require('dotenv').config({ path: './.env' })

//require pass config
require('./config/passport')(passport)

app.use(logger("dev"));
app.use(cors({
  origin: (origin, callback) => callback(null, true),
  credentials: true
}));
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.enable('trust proxy')

app.use(express.static('client/dist'))



//sesions
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
}))


app.use(passport.initialize())
app.use(passport.session())

app.use('/', mainRoutes)
app.use('/api/home', homeRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/rank', rankRoutes)

app.use('*', (req, res) => {
  console.log("no hitting")
  res.sendFile(path.join(__dirname, '/client/dist/index.html'));
});

connectDB().then(() => {
  app.listen(process.env.PORT || PORT, () => {
    console.log(`The server is running on port ${PORT}`)
  })
})
// setInterval(makeRequest, 14*60*1000);