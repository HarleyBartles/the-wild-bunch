import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

const LoginPartial = (props) => {
    const user = useSelector(state => state.oidc.user)
    const userManager = useSelector(state => state.auth.userManager)
    const isAuthenticated = user && !user.expired

    const location = useLocation()
    const path = location.pathname

    function handleLogout (event) {
        event.preventDefault()
        userManager.signoutRedirect({ id_token_hint: user.id_token })
        userManager.removeUser()
    }

    function handleLogin(event) {
        event.preventDefault()
        // pass the current path to redirect to the correct page after successful login
         userManager.signinRedirect({ data: { path } }) 
        //userManager.signinRedirect()
    }

    function renderLoggedOut() {
        return (
            <React.Fragment>
                <li className="nav-item">
                    <Link className="nav-link text-dark" to="/Account/Register">Register</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-dark" to="/Account/Login" onClick={handleLogin}>Login</Link>
                </li>
            </React.Fragment>
        )
    }

    function renderLoggedIn() {
        return (
            <React.Fragment>
                <li className="nav-item">
                    <Link className="nav-link text-dark" to="/Account/Profile" title="Manage">Profile</Link>
                </li>
                <li className="nav-item">
                    <form className="form-inline" onSubmit={event => handleLogout(event)}>
                        <button type="submit" className="nav-link btn btn-link text-dark">Logout</button>
                    </form>
                </li>
            </React.Fragment>
        )
    }

    return (
        <ul className="navbar-nav">
            {isAuthenticated ? renderLoggedIn() : renderLoggedOut()}
        </ul>
    )
}

export default LoginPartial