const router = require('express').Router()
const Comment = require('../models/user-comments')

const authCheck = (req, res, next) => {
    if(!req.user) {
        res.redirect('/auth/login')
    }
    else{
        next()
    }
}

// router.get('/', authCheck, (req, res) => {
//     res.render('comments', {
        
//     })
// })
router.get('/',authCheck, (req, res) => {
    var resultArray = []
    Comment.find({}, (err, docs) => {
        if(err)
        {
            throw err
        }
        else{
            res.render('comments', {items : docs, user : req.user })
            
        }
    })
})
router.post('/feedcomment', (req, res) => {
    new Comment({
        username : req.body.name,
        comment : req.body.comment
    }).save().then((log) => {
        console.log("comment saved")
        res.redirect('/comments/')
    })
})

router.get('/feedcomment',authCheck, (req, res) => {
    res.render('comments', {
        user : req.user
    })
})

module.exports = router