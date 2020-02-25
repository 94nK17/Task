import {GET_TASKS,TASKS_ERROR,REMOVE_TASKS,ADD_TASK,TASK_UPDATED}  from '../actions/types'

const initialState = {
    tasks: [],
    loading: true,   
    error: {}
}

export default (state = initialState, actions) => {
    switch(actions.type) {
        
        case GET_TASKS:
        
       
            return {
                ...state, 
                tasks: actions.payload, 
                loading: false
            }

        case ADD_TASK:
            return {
                ...state,      
                tasks: [ ...state.tasks, actions.payload],
                loading: false
            }

        case TASK_UPDATED:
            return {
                ...state,
                tasks: state.tasks.map(task => task._id === actions.payload._id ? actions.payload : task),
                loading:false
            }

        case TASKS_ERROR:
            return {
                ...state,
                error: actions.payload,
                loading: false
            }
        case REMOVE_TASKS:
            return {
                ...state,
                tasks: [],
                loading: false

            }

        default:
            return state
    }
}