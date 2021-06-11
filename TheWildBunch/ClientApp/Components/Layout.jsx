import React from 'react'
import { connect } from 'react-redux'

class Layout extends React.Component {
    render() {
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <main className='col'>
                        { this.props.children }
                    </main>
                </div>
            </div>
        )
    }
}

export default connect( null )( Layout )