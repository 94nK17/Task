import React, { Fragment } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {logout} from '../actions'


const Header = ( {auth: {isAuthenticated, loading}, logout} )  => {
    
    const authLinks= (
        <ul className= "items">
            <li className= "navitem">
                <Link to="/dashboard" className="link">Dashboard</Link>
            </li>

            <li className="navitem">
                <a  onClick={logout } href="#!" className="link"> Logout</a>
            </li>
        </ul>
    )

    const guestLinks = (

        <ul className="items">
                <li className="navitem"><a href="#!" className="link">Home</a></li>
                <li className="navitem"><Link to="/" className="link">Login</Link></li>
                <li className="navitem"><Link to="/signup" className="link">Sigup</Link></li>
        </ul>

    )

    return (
        <nav className="nav">
            <h2 className= "logo"><Link to="/">Task</Link></h2>
            
            {!loading && (<Fragment>{ isAuthenticated ? authLinks: guestLinks }</Fragment>) }
        </nav>
    )
}

Header.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout}) (Header)