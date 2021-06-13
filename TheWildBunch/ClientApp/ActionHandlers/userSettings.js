import React from 'react'
import requestManager from '../Middleware/requests'
import { useDispatch } from 'react-redux'
import { actions as userSettingActions } from '../Store/userSettings'

const getUserSettings = dispatch => () => {
    dispatch({
        type: userSettingActions.GET_USER_SETTINGS
    })

    return requestManager.localGetRequest('/getUserSettings')
        .then(data => {
            dispatch({
                type: userSettingActions.SET_USER_SETTINGS,
                data
            })
        })
}

export {
    getUserSettings,
}