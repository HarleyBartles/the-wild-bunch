import { storeEntityAction } from './helpers'

export const actions = {
    GET_SERVER_SETTINGS: "GET_SERVER_SETTINGS",
    SET_SERVER_SETTINGS: "SET_SERVER_SETTINGS"
}

const initialState = {
    applicationVersion: 0,
    actions: {
        load: storeEntityAction()
    }
}

export const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actions.GET_SERVER_SETTINGS:
            return getServerSettings( state, action.data )
        case actions.SET_SERVER_SETTINGS:
            return setServerSettings( state, action.data )
    }

    return state
}

const getServerSettings = (state, data) => {
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

const setServerSettings = (state, data) => {
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