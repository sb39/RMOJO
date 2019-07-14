const express = require('express')
const authRoutes = require('./routes/auth-routes')
const commentRoutes = require('./routes/comment-routes')
const passport = require('passport')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passportSetup = require('./config/passport-setup')
const keys = require('./config/keys')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

//view engine
app.set('view engine', 'ejs')

//body parser
app.use(bodyParser.urlencoded({extended : false}));

//session setup
app.use(cookieSession({
    maxAge : 24*60*60*1000,
    keys : [keys.session.sessionToken]
}))
// initialise passport
app.use(passport.initialize())
app.use(passport.session())

//mongoose connect
mongoose.connect(keys.mongo.dbURL, () => {
    console.log('db success')
})

//static things 
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRoutes)
app.use('/comments',commentRoutes)

//home routes 
app.get('/', (req, res) => {
    res.render('home')
})

app.listen(process.env.PORT || 3000, () => {
    console.log('app started on port 3000')
})