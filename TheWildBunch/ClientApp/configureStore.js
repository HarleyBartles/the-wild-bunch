import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { reducers } from './Store'
import { middleware as authMiddleware } from './authenticationLayer'

export default function configureStore(history, initialState) {
    const composeEnhancers =
        typeof window === 'object' &&
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                // Specify extension's options like name, actionsBlacklist, actionsCreators, serialize...
            }) : compose

    //const oidcMiddleware = createOidcMiddleware(userManager)
    const createStoreWithMiddleware = composeEnhancers(
        applyMiddleware(
            thunk,
            routerMiddleware(history),
            authMiddleware,
            //signalRMiddleware,
            //requestMiddleware,
            //userSettingsMiddleware
        ),
    )(createStore)

    // Combine all reducers and instantiate the app-wide store instance
    const allReducers = buildRootReducer(reducers, history)
    
    const store = createStoreWithMiddleware(allReducers, initialState)

    // Enable Webpack hot module replacement for reducers
    if (module.hot) {
        module.hot.accept('./Store', () => {
            const nextRootReducer = require('./Store')
            store.replaceReducer( buildRootReducer(nextRootReducer.reducers, history) )
        })
    }

    return store
}

function buildRootReducer( allReducers, history ) {
    return combineReducers(Object.assign({}, { router: connectRouter(history) }, allReducers))
}