import React from 'react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import RouteContainer from './routes'
import { replace } from 'connected-react-router'
import { renderToString } from 'react-dom/server'
import { createMemoryHistory } from 'history'
import configureStore from './configureStore'

export default createServerRenderer(params => {
    return new Promise((resolve, reject) => {
        const initialState = {
            ...params.data
        }

        const baseName = params.baseUrl.substring(0, params.baseUrl.length - 1) // trim the trailing slash
        const urlAfterBasename = params.url.substring(basename.length)
        const store = configureStore(createMemoryHistory(), initialState)

        store.dispatch(replace(urlAfterBasename))

        const routerContext = {}
        const app = (
            <Provider store={store}>
                <StaticRouter baseName={baseName} contect={routerContext} location={params.location.path}>
                    <RouteContainer />
                </StaticRouter>
            </Provider>
        )

        renderToString(app)
    })
})