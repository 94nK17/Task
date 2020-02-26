const mongoose = require('mongoose')
const mongoDbUri = require('../config/mongoDbUri')

const connect = async ()=>{

    try{
        await mongoose.connect(process.env.mongoAtlas||mongoDbUri.local, {useNewUrlParser:true, useUnifiedTopology:true})
        console.log('connected to Database !!!!')
    }catch(err){
        console.log(err.message)

        //exit process with failure
        process.exit(1)
    }

}

connect()