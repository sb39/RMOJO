const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys')
const User = require('../models/user-model')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    })
})

passport.use(new GoogleStrategy({
    clientID : keys.google.clientID,
    clientSecret : keys.google.clientSecret,
    callbackURL : '/auth/google/redirect'
}, (accessToken, refreshToker, profile, done) => {
    // if user already present
    User.findOne({
        googleId : profile.id
    }).then((currentUser)=> {
        if(currentUser){
            // user already present
            console.log('user already registered')
            done(null, currentUser)
        }
        else{
            //not a user 
            //create a new User
            new User({
                username : profile.displayName,
                googleId : profile.id,
                thumbnail : profile._json.picture
            }).save().then((newUser) => {
                console.log('user created')
                done(null, newUser)
            })

        }
    })
}))