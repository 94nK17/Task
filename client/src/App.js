import React, {useEffect} from 'react'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import {loadUser} from './actions'
import setAuthToken from './utils/setAuthToken'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'


import Header from './components/Header'
import Login from './components/Login'
import Footer from './components/Footer'
import Register from './components/Register'
import Alert from './components/Alert'
import DashBoard from './components/DashBoard'
import PrivateRoute from './components/PrivateRoute'
import CreateTask from './components/CreateTask'

import EditTask from './components/EditTask'
import './App.css'




if(localStorage.token){
    setAuthToken(localStorage.token)
}

const App = ({loadUser}) => {

    useEffect(()=>{
        loadUser()
    }, [])

    return(
        <div className="topbox">
            <BrowserRouter>
                <div className="headerbox">
                    <Header />
                </div>
                
                <div className="contentbox">
                    
                    <Alert />
                    <Switch>
                   
                        <Route exact path="/" component={Login} />
                    
                    
                        <Route exact path="/signup" component={Register} />
                        <PrivateRoute exact path="/dashboard" component={DashBoard} />
                        <PrivateRoute exact path="/task/create" component={CreateTask} />
                        <PrivateRoute exact path="/task/edit/:id" component={EditTask} />
                        
                    
                    </Switch>
                </div>
                
                
                <div className="footerbox">
                    <Footer />
                </div>
                
            </BrowserRouter>
        </div>
        
    )
}

App.propTypes = {
    loadUser: PropTypes.func.isRequired,
}


export default connect(null, {loadUser}) (App)