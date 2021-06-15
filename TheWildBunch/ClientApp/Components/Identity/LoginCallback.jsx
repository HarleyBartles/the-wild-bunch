import React from 'react'
import { CallbackComponent } from 'redux-oidc'
import { connect, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

const LoginCallback = () => {
    const userManager = useSelector(state => state.auth.userManager)
    const history = useHistory()

    return (
        <CallbackComponent
            userManager={userManager}
            successCallback={() => history.push('/')}
            errorCallback={error => {
                history.push('/')
                console.error(error)
            }}>

            <div>Redirecting...</div>
        </CallbackComponent>
    )
}

export default connect()(LoginCallback)