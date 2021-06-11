import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import configureStore from './configureStore'
import RouteContainer from './routes'
import requestManager from './Middleware/requests'

function renderApp() {
    const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')
    const history = createBrowserHistory({ baseName: baseUrl })

    const initialState = window.initialReduxState
    const store = configureStore(history, initialState)

    //requestManager.connectStore(store)
    //authenticationLayer.connectStore(store)
    //messageLayer.connectStore(store)

    ReactDOM.hydrate(
        <AppContainer>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <RouteContainer />
                </ConnectedRouter>
            </Provider>
        </AppContainer>,
        document.getElementById('react-app')
    )
}

renderApp()