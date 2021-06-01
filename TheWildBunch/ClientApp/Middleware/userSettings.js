import { actions } from '../Store/userSettings'

export const middleware = (store) => {
    return (next) => (action) => {
        switch (action.type) {
            case "USER_AUTHENTICATED":
                store.dispatch( getUserSettings() )
                break
        }

        return next(action)
    }    
}

export const getUserSettings = () => {
    return ( dispatch ) => {
        type: actions.GET_USER_SETTINGS
    }

    requests
}