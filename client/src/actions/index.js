import {SET_ALERT, REMOVE_ALERT,REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED, AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT,GET_TASKS,TASKS_ERROR,REMOVE_TASKS,ADD_TASK,TASK_SELECTED, TASK_UPDATED} from './types'
import uuid from 'uuid'
import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'

////////////////////alert ACTIONS/////////////////////////////////////////////////

export const setAlert = (msg, alertType,timeout = 2000) => dispatch => {
     const id = uuid.v4()
     dispatch({
         type: SET_ALERT,
         payload: {msg, alertType, id}
     })

     setTimeout(()=> dispatch ({type: REMOVE_ALERT, payload:id}), timeout)
}


//////////////////////AUTH Actions//////////////////////////////////////////////////////


//REGISTER USER
export const register = ({userName, password, confirmpassword}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({userName,password, confirmpassword })

    try {
        const res = await axios.post('/users', body, config )

        dispatch({ 
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        
        dispatch(loadUser())
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL
        })
    }
    
}

//LOAD USER 

export const loadUser = () => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/auth')

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
        
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}


//LoginUSER
export const login = (userName, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({userName,password })

    try {
        const res = await axios.post('/auth', body, config )

        dispatch({ 
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(loadUser())
        
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        })
    }
    
}

//logout user

export const logout = () =>  dispatch => {
    dispatch({
        type: REMOVE_TASKS
    })
    dispatch({
        type: LOGOUT
    })
   
}


////////////////////////Tasks Actions//////////////////////////////////////////////

//get current  user tasks

export const getCurrentTasks = () => async dispatch => {

    try {
        const res = await axios.get('/tasks')

        dispatch({
            type: GET_TASKS,
            payload: res.data.tasks
        })

    } catch (err) {
        dispatch({
            type: TASKS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }

}

//create a task 
export const createTask = (formData, history)=> async dispatch => {

    try {
        const config = {
         'Content-Type': 'application/json'
        } 

        const res = await axios.post('/tasks', formData, config)

        dispatch({
            type: ADD_TASK,
            payload: res.data
        })

        dispatch(setAlert('task created'))

        history.push('/dashboard')

    } catch (err) {
        dispatch({
            type: TASKS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

//update a task

export const updateTask = (id, formData,history) => async dispatch => {

    try {
        const config = {
         'Content-Type': 'application/json'
        } 

        const res = await axios.post(`/tasks/${id}`, formData, config)

        dispatch({
            type: TASK_UPDATED,
            payload: res.data
        })

        dispatch(setAlert('task updated'))

        history.push('/dashboard')

    } catch (err) {
        dispatch({
            type: TASKS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }

}

//delete a task
export const deleteTask = (id, history) => async dispatch => {

    try {
        

       await axios.delete(`/tasks/${id}`)

        dispatch(getCurrentTasks())

        dispatch(setAlert('task deleted'))

        history.push('/dashboard')

    } catch (err) {
        dispatch({
            type: TASKS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }

}




///////////////////////////////////////selectTask actions////////////////////////////////////////////////////////////////

export const selectTask = (task) => dispatch => {
    dispatch({
        type: TASK_SELECTED,
        payload: task
    })
}