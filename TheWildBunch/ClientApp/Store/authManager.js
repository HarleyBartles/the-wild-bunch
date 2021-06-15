import authenticationLayer from '../authenticationLayer'

export const actions = {
    USER_MANAGER_UPDATED: 'USER_MANAGER_UPDATED',
    USER_AUTHENTICATED: 'USER_AUTHENTICATED',
    USER_AUTHENTICATION_FAILED: 'USER_AUTHENTICATION_FAILED',
    AUTHENTICATION_CONNECTED: 'AUTHENTICATION_CONNECTED',
    USER_AUTHENTICATION_REFRESHED: 'USER_AUTHENTICATION_REFRESHED'
}

export const reducer = (state = { userManager: authenticationLayer.getUserManager() }, action) => {
    switch (action.type) {
        case actions.USER_MANAGER_UPDATED:
            return updateUserManager(state, action.data)
        default:
            return state
    }
}

function updateUserManager(state, data) {
    const newState = { ...state }
    newState.userManager = data;

    return newState
}