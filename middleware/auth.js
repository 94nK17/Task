const jwt = require('jsonwebtoken')
const jwtSecret = require('../config/jwtSecret')

module.exports = ( req,res,next)=>{
    //get token from header
    const token = req.header('x-auth-token')

    //check if not token is
    if(!token){
        return res.status(401).json({msg: 'no token, authorization denied'})
    }

    //verify token
    try{
        const decoded = jwt.verify(token, jwtSecret||process.env.jwtSecret)

        req.user = decoded.user 
        next()
    }catch(err){
        res.status(401).json({msg:'token is not valid'})
    }
}
