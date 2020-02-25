import React, {useState} from 'react'
import { withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {updateTask} from '../actions'


const EditTask = ({task, updateTask, history}) => {

    
    
    const [formData, setFormData] = useState({
        name: task.name,
        description: task.description
    })

   const {name, description} = formData

    const onChange = e => setFormData({
        ...formData, [e.target.name]: e.target.value
    })

    const onSubmit =  e => {
        e.preventDefault()
        updateTask(task._id, formData, history )
       
    }

    return (
        <div>
        <h1>Edtit a Task</h1>

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
            value="update"  
            />

            
        </form>
        

        </div>
    )
   
}


EditTask.propTypes = {
    task: PropTypes.object.isRequired,
    updateTask: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    
    task: state.taskSelected
})



export default connect(mapStateToProps, {updateTask}) (withRouter(EditTask))
