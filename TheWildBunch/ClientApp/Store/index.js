//import { reducer as userSettings} from './userSettings'
import { reducer as serverSettings } from './serverSettings'
import { reducer as oidc } from 'redux-oidc'
import { reducer as auth } from './authManager'

export const reducers = {
    oidc,
    auth,
    //userSettings,
    serverSettings,
    
}