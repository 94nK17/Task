const express = require('express')
const path = require('path')

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
app.use('/auth', require('./routes/authRoutes'))

//serve static assests in production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


const Port = process.env.PORT || 5000
app.listen(Port, ()=> {
    console.log(`server up and listening to port ${Port}!!!!`)
})
