import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Header from './Home/Header'
import Footer from './Home/Footer'
import { getUserSettings } from '../ActionHandlers/userSettings'

class Layout extends React.Component {

    componentDidMount() {
        this.props.requestUserSettings()
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className='container'>
                    <div className='row'>
                        <main className='col'>
                            { this.props.children }
                        </main>
                    </div>
                </div>
                <Footer />
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        requestUserSettings: dispatch(getUserSettings)
    }
}

export default connect(null, mapDispatchToProps )( Layout )