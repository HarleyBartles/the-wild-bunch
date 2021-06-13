import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="border-top footer text-muted">
            <div className="container">
                &copy; 2020 - TheWildBunch - <Link to='/'>Home</Link>
            </div>
        </footer>
    )
}

export default Footer