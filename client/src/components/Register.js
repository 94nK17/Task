import React, {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'

import {connect} from 'react-redux'
import {setAlert, register} from '../actions'
import PropTypes from 'prop-types'

 const Register = ({setAlert, register, isAuthenticated}) => {

    const [formData, setFormData] = useState({
        userName: '',
        password: '',
        confirmpassword: ''
    })

    const {userName, password, confirmpassword} = formData

    const onChange = e => setFormData({
        ...formData, [e.target.name]: e.target.value
    })

    const onSubmit =  async e => {
        e.preventDefault()
        if(password !== confirmpassword){
            setAlert('password don not match','danger')

        }else{
            register({
                userName, password, confirmpassword
            })
        }
    }

    if(isAuthenticated){
        return <Redirect to= "/dashboard" />
    }



    return (
        <div >
            <h1>Register your account</h1>

            <form onSubmit ={e => onSubmit(e)} >
                
                <input 
                type="text" 
                placeholder="username" 
                name="userName" 
                value={userName} 
                onChange= {e=> onChange(e)}
                required 
                />

                
                <input 
                type="password" 
                placeholder="Password" 
                name="password" 
                value={password}
                onChange= {e=> onChange(e)}
                minLength="6"
                />

                
                <input 
                type="password" 
                placeholder="confirm Password" 
                name="confirmpassword" 
                value={confirmpassword}
                onChange= {e=> onChange(e)}
                minLength="6"
                />
            <input type= "submit" value="Register" />
            </form>
            
            

            <p>already have an account? click here to </p><Link to="/">Login</Link>
        </div>
    )
}

Register.propTypes  = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {setAlert, register}) (Register)
