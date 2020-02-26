const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//const jwtSecret = require('../config/jwtSecret')

const router = express.Router()

//create user 
router.post('/', async(req, res) => {
    //console.log(req.body)

    const {userName, password, confirmpassword} = req.body

    //check if password matches
    if(password !== confirmpassword){
        return res.status(401).json({error: [{msg: 'password must match'}]})
    }
    
    
    try{
        //check if user exists
    let user = await User.findOne({userName})
    if(user){
        return res.status(400).json({error: [{msg: 'user already exists'}]})
    }

    user = new User({
        userName,
        password
    })

    const salt = await bcrypt.genSalt(10)

    user.password = await bcrypt.hash(password, salt)

    user.save()

    //return token
    const payload = {
        user: {
            id: user.id
        }
    }
    
    jwt.sign(payload, jwtSecret||process.env.jwtSecret, {expiresIn:3600}, (err, token)=> {
        if(err) throw err
        res.json({token})
    })

    }catch(err){
        console.log(err.message)
        res.status(500).send('server error')
    }
   

})

module.exports = router