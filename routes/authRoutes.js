const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
//const jwtSecret = require('../config/jwtSecret')

const auth = require('../middleware/auth')
const User = require('../models/User')


//get user from the request
router.get('/', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }
})

//authenticate user and send token
router.post('/', async(req, res) => {
    //console.log(req.body)

    const {userName, password} = req.body

    
    
    try{
        //check if user exists
    let user = await User.findOne({userName})
    
    if(!user){
        return res.status(400).json({error: [{msg: 'invalid credentials'}]})
    }

    const isMatch =  await bcrypt.compare(password, user.password)

    if(!isMatch){
        return res.status(400).json({error: [{msg: 'invalid credentials'}]})

    }


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