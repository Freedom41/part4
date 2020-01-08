const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userRouter = require("express").Router()
const User = require('../models/users.js')


userRouter.post('/', async( req, res, next ) => {
    let body = req.body
    let saltrounds = 10

    if(body.password.length <= 3 || body.username.length <= 3) {
        res.status(403).json('Username and Password should contain more than 3 chars')
    }

    let passHash = await(bcrypt.hash(body.password, saltrounds))

    const newUser = new User({
        username: body.username,
        password: passHash,
        name: body.name
    })

    let usertoken = {
        username: body.username,
        id: newUser._id
    }
    
    try { 
         await newUser.save()
                      .then(data => {
                          let jwtt = jwt.sign(usertoken, process.env.SECRET)
                          res.status(201).json({ token: jwtt, data: data })
                      })
    } catch(err) {
        next(err)
    }
    
})

userRouter.get('/', async(req, res) => {
    try {
        let dblist = await User.find({}, (docs) => {})
        if(dblist) {
            res.json(dblist).status(200)
        }
        console.log(dblist.length)
    } catch(err) {
       next(err)
    }
})

module.exports = userRouter