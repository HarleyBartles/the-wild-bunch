//import requestManager from '../Middleware/requests'
//import { actions as userSettingActions } from '../Store/userSettings'

//const getUserSettings = () => dispatch => {
//    dispatch({
//        type: userSettingActions.GET_USER_SETTINGS
//    })

//    return requestManager.localGetRequest('/user/getUser')
//        .then(data => {
//            dispatch({
//                type: userSettingActions.SET_USER_SETTINGS,
//                data
//            })
//        })
//}

//export {
//    getUserSettings,
//}