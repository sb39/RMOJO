const router = require('express').Router()
const passport = require('passport')

//auth-login
router.get('/login', (req, res) => {
    res.render('login')
})
// G-Auth
router.get('/google', passport.authenticate('google', {
    scope : ['profile']
}));

//auth-logout
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/comments/')
})

module.exports = router