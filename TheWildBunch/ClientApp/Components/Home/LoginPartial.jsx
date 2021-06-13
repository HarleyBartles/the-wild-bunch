import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const LoginPartial = (props) => {
    const user = useSelector(state => {
        return state.userSettings
    })

    return (
        <ul className="navbar-nav">
            {user.isLoggedIn ? renderLoggedIn(user) : renderLoggedOut()}
        </ul>
    )
}

const handleLogout = () => {
    // toDo
}

const renderLoggedOut = () => {
    return (
        <React.Fragment>
            <li className="nav-item">
                <Link className="nav-link text-dark" to="/Account/Register">Register</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link text-dark" to="/Account/Login">Login</Link>
            </li>
        </React.Fragment>
    )
}

const renderLoggedIn = (user) => {
    return (
        <React.Fragment>
            <li className="nav-item">
                <Link className="nav-link text-dark" to="/Account/Manage/Index" title="Manage">{`Hello ${user.userName}!`}</Link>
            </li>
            <li className="nav-item">
                <form className="form-inline" onSubmit={handleLogout}>
                    <button type="submit" className="nav-link btn btn-link text-dark">Logout</button>
                </form>
            </li>
        </React.Fragment>
    )
}

export default LoginPartial