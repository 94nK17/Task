import React,{useEffect} from 'react'
import {Link,withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCurrentTasks,selectTask,deleteTask} from '../actions'


const DashBoard = ({getCurrentTasks, auth: {user}, task: {tasks, loading}, selectTask, deleteTask, history}) => {

    useEffect(()=>{
        getCurrentTasks()
    }, [])

    const taskList = tasks.map(task => (
        <div className=" item" style={{display: 'flex' }} key = {task._id}>
            <i className="large middle aligned icon tasks" />
            <div className= "content">
               
                    {task.name}
                    <div className="description">
                        {task.description}
                    </div>
                    
               
            </div>
            <div className= "buttonbox">   
                <Link onClick= {()=> deleteTask(task._id, history)}  className="ui button negative">Delete</Link>
                <Link to= {`/task/edit/${task._id}`} onClick= {()=> selectTask(task)} className="ui button ghost">Edit</Link>
            </div>
        </div>
    ))

    return loading && tasks.length < 1 ? <div>Loading!!</div> : 
    <div className="dashboard">
        <div className="user">
            <h1> welcome {user && user.userName}  </h1>
            <Link to= "/task/create" >Create Task</Link>
        </div>
       
       
        {
            tasks.length === 0 ? 
            <div className="user">
                <h1>you dont have any task, create one </h1>
                <Link to='/task/create'> Create A Task</Link>
            </div> :

            <div  className="tasklist"> 
                <h1>your task to do list</h1>
                <div className= "ui celled list">{taskList}</div>
                
            </div> 

            
        }

    </div>

}

DashBoard.propTypes = {
    getCurrentTasks: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    task: PropTypes.object.isRequired,
    selectTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    task: state.task
})

export default connect(mapStateToProps, {getCurrentTasks, selectTask,deleteTask}) (withRouter(DashBoard))
