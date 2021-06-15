import { actions as authActions } from './Store/authManager'
import { UserManager } from 'oidc-client'

// avoid concurrent auth requests
let authenticating = false

class AuthenticationLayer {
    connect(config) {
        this._initialAuthenticate = true
        this._authenticationClients = []
        this.options = this._getFormattedConfig(config)
        this.userManager = new UserManager(this.options)
        this.updateUserManagerInStore()
        window.UserManager = this.userManager
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
                        self._authenticate()
                    else
                        self._userAuthenticated(user)
                })
        }
        else {
            this._authenticate()
        }       
        
        return this
    }


    updateUserManagerInStore() {
        this.store.dispatch({
            type: authActions.USER_MANAGER_UPDATED,
            data: this.userManager
        })
        return this
    }


    getUserManager() {
        return this.userManager
    }


    getAccessToken() {
        if (this.userManager == null)
            return null;

        return this.userManager.getAccessToken();
    }


    loginRedirect() {
        if (!this.userManager)
            return;

        this.userManager.signinRedirect()
    }


    backgroundCallback() {
        new UserManager()
            .signinSilentCallback()
    }


    _getFormattedConfig(authSettings) {
        // format the options to the library syntax
        return {
            client_id: authSettings.clientId,
            response_type: authSettings.responseType,
            scope: authSettings.scope,
            authority: authSettings.authority,
            silent_redirect_uri: authSettings.silentRedirectURI,
            automaticSilentRenew: authSettings.automaticSilentRenew,
            filterProtocolClaims: authSettings.filterProtocolClaims,
            loadUserInfo: authSettings.loadUserInfo,
            revokeAccessTokenOnSignout: authSettings.revokeAccessTokensOnSignout,
            redirect_uri: authSettings.redirectURI,
            post_logout_redirect_uri: authSettings.postLogoutRedirectURI,
            startUrl: authSettings.startURL,
            monitorSession: authSettings.monitorSession,
            silentRequestTimeout: authSettings.silentRequestTimeout,
            checkSessionInterval: authSettings.checkSessionInterval
        }
    }


    _onAuthenticationFailed() {
        console.warn("Authentication Failed!")
    }
    
    _authenticate() {
        const self = this
        
        if (!this.userManager || authenticating)
            return;
        
        authenticating = true;
        
        return this.userManager
            .signinRedirect()
            .then((user) => {
                authenticating = false;
                
                if (user !== null)
                    self._userAuthenticated(user)
                else
                    self._onAuthenticationFailed()
                
                self._initialAuthenticate = false
            })
            .catch((e) => {
                console.error(e)
                self._onAuthenticationFailed()
            })
    }


    _userAuthenticated(user) {
        if (this._initialAuthenticate) {
            this.store.dispatch({
                type: authActions.AUTHENTICATION_CONNECTED,
                data: user
            });
        }
        else {
            this.store.dispatch({
                type: authActions.USER_AUTHENTICATION_REFRESHED,
                data: user
            });
        }


        this.store.dispatch({
            type: authActions.USER_AUTHENTICATED,
            data: user
        });
    }
}


const authenticationLayer = new AuthenticationLayer()


export const middleware = (store) => {
    return (next) => (action) => {
        
        if (!authenticationLayer.getUserManager())
            return;
        
        switch (action.type) {
            case 'redux-oidc/USER_EXPIRING':
            case 'redux-oidc/USER_EXPIRED':
            case 'redux-oidc/SILENT_RENEW_ERROR':
            case 'redux-oidc/SESSION_TERMINATED':
            case 'redux-oidc/LOAD_USER_ERROR':
                authenticationLayer.authenticate()
                break;
        }
        
        return next(action);
    }
}


export default authenticationLayer


































