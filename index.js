const express = require('express')


const app = express()


//mongo db connection
require('./Db/mongoConnector')


//init bodyparser middleware
app.use(express.json({extended: false}))


//userRoute
app.use('/users', require('./routes/userRoutes'))

//taskRoute
app.use('/tasks', require('./routes/TaskRoutes'))

//authRoute
app.use('/auth', require('./routes/AuthRoutes'))


const Port = process.env.PORT || 5000
app.listen(Port, ()=> {
    console.log(`server up and listening to port ${Port}!!!!`)
})
