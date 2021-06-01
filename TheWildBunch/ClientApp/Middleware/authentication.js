import { actions as authActions } from '../Store/authentication'

let authenticating = false

class AuthenticationLayer {
    connect(config) {
        this._initialAuthenticate = true
        this._authenticationClients = []
        this.options = this._getFormattedConfig(config)
        this.userManager = new CustomManager(this.options)
        this.authenticate()
        window.CustomManager = this.userManager
        return this
    }

    connectStore(store) {
        this.store = store
        return this
    }

    authenticate() {
        const self = this

        if (window.location.hash.indexOf('#id_token=') > -1) {
            this.userManager
                .signinRedirectCallback()
                .then(user => {
                    if (!user)
                        self._windowsAuthenticate()
                    else
                        self._userAuthenticated()
                })
        } else {
            this._windowsAuthenticate()
        }

        return this

    }

    getUserManager() {
        return this.userManager
    }

    getAccessToken() {
        if (this.userManager === null)
            return null

        return this.userManager.getAccessToken()
    }
}

const authenticationLayer = new AuthenticationLayer()

export const middleware = (store) => {
    return (next) => (action) => {
        if (!authenticationLayer.getUserManager())
            return

        switch (action.type) {
            case 'redux-oidc/USER_EXPIRING':
            case 'redux-oidc/USER_EXPIRED':
            case 'redux-oidc/SILENT_RENEW_ERROR':
            case 'redux-oidc/SESSION_TERMINATED':
            case 'redux-oidc/LOAD_USER_ERROR':
                authenticationLayer.authenticate()
        }

        return next (action)
    }
}

export default authenticationLayer