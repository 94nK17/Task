import React,{useState} from 'react'
import { withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {createTask} from '../actions' 

 const CreateTask = ({createTask, history}) => {

    const [formData, setFormData] = useState({
        name: '',
        description: ''
    })

    const {name, description} = formData

    const onChange = e => setFormData({
        ...formData, [e.target.name]: e.target.value
    })

    const onSubmit =  e => {
        e.preventDefault()
        createTask(formData, history )
       
    }

    return (
        <div>
        <h1>Create a Task</h1>

        <form onSubmit = {e => onSubmit(e)} >

            
            <input 
            type="text" 
            placeholder="Task Name" 
            name="name" 
            value = {name}
            onChange={e=> onChange(e)}
            required 
            />

            
            <input 
            type="text" 
            placeholder="Task Description" 
            name="description" 
            value = {description}
            onChange={e=> onChange(e)}
            />

            <input
            type="submit"
            value="Create Task"  
            />

            
        </form>
        

        </div>
    )
}

CreateTask.propTypes = {
    createTask: PropTypes.func.isRequired,
}



export default connect(null, {createTask} ) (withRouter(CreateTask))