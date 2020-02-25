import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login} from '../actions'

 const Login = ({login, isAuthenticated}) => {

    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        
    })

    const {userName, password} = formData

    const onChange = e => setFormData({
        ...formData, [e.target.name]: e.target.value
    })

    const onSubmit =  async e => {
        e.preventDefault()
       login(userName, password)
    }

    
    if(isAuthenticated){
        return <Redirect to= "/dashboard" />
    }

    return (
        
        <div className="container">
            <h1>welcome to Task</h1>

            <form onSubmit= {e => onSubmit(e)}>
                
                <input 
                type="text" 
                placeholder="name" 
                name="userName" 
                value= {userName}
                onChange={e=>onChange(e)}
                required 
                />

                
                <input 
                type="password" 
                placeholder="Password" 
                name="password" 
                value= {password}
                onChange={e=>onChange(e)}
                minLength="4"
                />

                <input type= "submit" value="Login" />
            </form>
            

            <p>dont have any account? click here to </p><Link to="/signup">Signup</Link>
        </div>
        
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps, {login})(Login)