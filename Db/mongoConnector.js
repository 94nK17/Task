const mongoose = require('mongoose')
const mongoDbUri = require('../config/mongoDbUri')


mongoose.connect(process.env.mongoAtlas||mongoDbUri.local, {useNewUrlParser:true, useUnifiedTopology:true}, ()=>{
    console.log('connected to  database!!!!')
})