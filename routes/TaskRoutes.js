const express = require('express')

const router = express.Router()
const auth = require('../middleware/auth')


const Task = require('../models/Task')


//create  a Task
router.post('/', auth, async(req, res) => {
    // const newTask = new Task({
        

    //     })

    const {name, description} = req.body

    //build task object
    const taskFields = {}
    if(name) taskFields.name = name
    if(description) taskFields.description = description
    taskFields._user = req.user.id
    
    try { 
        let task = await Task.findOne({name})
           
            if(task){
                
                console.log(' task found')
                // task = await Task.findOneAndUpdate(
                //     { _user: req.user.id}, 
                //     { $set : taskFields}, 
                //     {new : true},
                // )

                return res.status(400).json({msg: 'task already exists'})
            }

       //create a new task
       console.log('creating task')
       task = new Task(taskFields)


        await task.save()

        res.json(task)
        
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server errror')
        
    }
    
})

//get all task
router.get('/', auth, async(req, res) => {
    try {
        const tasks = await Task.find({_user: req.user.id}).sort({date: -1})
        res.json({tasks})
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
        
    }
})

//update a Task
router.post('/:id', auth, async(req, res) => {
    try {

        const {name, description} = req.body

        const taskFields = {}

        taskFields._user = req.user.id
        if(name) taskFields.name = name
        if(description) taskFields.description = description

        
        let task = await Task.findById({_id: req.params.id})
        
        if(!task){
            return res.status(404).json({msg: 'task not found'})
        }

        //checkUser
        if(task._user.toString() !== req.user.id){
            return res.status(401).json({msg: 'user not authorised'})
        }

        //update task
        task = await Task.findOneAndUpdate(
            { _id: req.params.id}, 
            { $set : taskFields}, 
            {new : true, useFindAndModify: false}
        )

        res.json(task)

    } catch (err) {
        console.log(err.message)

        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg:'post not found'})
        }
        res.status(500).send('server error')
        
    }
})

//delete a task
router.delete('/:id', auth, async(req, res) => {
    try {
        const task = await Task.findById(req.params.id)
        
        if(!task){
            return res.status(404).json({msg: 'task not found'})
        }

        //checkUser
        if(task._user.toString() !== req.user.id){
            return res.status(401).json({msg: 'user not authorised'})
        }

        await task.remove()

        res.json({msg: 'task removed'})

    } catch (err) {
        console.log(err.message)

        if(err.kind === 'ObjectId'){
            return res.status(404).json({msg:'post not found'})
        }
        res.status(500).send('server error')
        
    }
})

module.exports = router