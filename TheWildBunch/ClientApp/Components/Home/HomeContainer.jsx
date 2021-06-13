import React from 'react'
import { Link } from 'react-router-dom'

const HomeContainer = (props) => {
    return (
        <div>
            <h2>Hola, glad you could make it</h2>
            <button>
                <Link to='/map'>Map</Link>
            </button>
        </div>
    )
}

export default HomeContainer