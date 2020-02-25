import {TASK_SELECTED} from '../actions/types'


export default (state = null , actions)=>{
    switch(actions.type){
       
        case TASK_SELECTED: 
            return state = actions.payload

        default:
            return state
    }
}