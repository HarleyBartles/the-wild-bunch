import { storeEntityAction } from './helpers'

export const actions = {
    GET_USER_SETTINGS: "GET_USER_SETTINGS",
    SET_USER_SETTINGS: "SET_USER_SETTINGS"
}

const initialState = {
    userId: 0,
    userName: null,
    isLoggedIn: false,
    actions: {
        load: storeEntityAction()
    }
}

export const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actions.GET_USER_SETTINGS:
            return getUserSettings( state, action.data )
        case actions.SET_USER_SETTINGS:
            return setUserSettings( state, action.data )
    }

    return state
}

const getUserSettings = (state, data) => {
   return {
        ...state,
        actions: {
            ...state.actions,
            load: {
                ...state.actions.load,
                active: true
            }
        }        
    }
}

const setUserSettings = (state, data) => {
    const {
        success,
        messages,
        userId,
        userName
    } = data

    return {
        ...state,
        userId,
        userName,
        actions: {
            ...state.actions,
            load: {
                ...state.actions.load,
                active: false,
                success,
                messages
            }
        }
    }
}