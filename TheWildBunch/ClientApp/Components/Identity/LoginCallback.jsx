import React from 'react'
import { CallbackComponent } from 'redux-oidc'
import { connect } from 'react-redux'

class LoginCallback extends React.Component {
    render() {
        return (
            <CallbackComponent
                userManager={this.props.userManager}
                successCallback={() => this.props.dispatch(push('/'))}
                errorCallback={error => {
                    this.props.dispatch(push('/'))
                    console.error(error)
                }}>

                <div>Redirecting...</div>
            </CallbackComponent>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userManager: state.auth.userManager
    }
}

export default connect(mapStateToProps)(LoginCallback)