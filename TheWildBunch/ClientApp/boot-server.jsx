import React from 'react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'
import RouteContainer from './routes'
import { replace } from 'connected-react-router'
import { renderToString } from 'react-dom/server'
import { createMemoryHistory } from 'history'
import configureStore from './configureStore'
import { createServerRenderer } from 'aspnet-prerendering'

export default createServerRenderer(params => {
    return new Promise((resolve, reject) => {
        const initialState = {
            ...params.data
        }

        // Prepare Redux store with an in-memory history
        // dispatch a navigation event corresponding to the incoming url
        const baseName = params.baseUrl.substring(0, params.baseUrl.length - 1) // trim the trailing slash
        const urlAfterBasename = params.url.substring(baseName.length)
        
        const store = configureStore(createMemoryHistory(), initialState)
        
        store.dispatch(replace(urlAfterBasename))

        const routerContext = {}
        const app = (
            <Provider store={store}>
                <StaticRouter baseName={baseName} context={routerContext} location={params.location.path}>
                    <RouteContainer />
                </StaticRouter>
            </Provider>
        )

        renderToString(app)

        // if there's a redirection, just return this information back to the host app
        if (routerContext.url) {
            resolve({ redirectUrl: routerContext.url })
            return
        }

        // once async tasks are done, perform the final render
        // also send the redux store state so the client can continue execution where the server left off
        params.domainTasks.then(() => {
            resolve({
                html: renderToString(app),
                globals: { initialReduxState: store.getState() }
            })
        }, reject) // propogate any errors back into the host app
    })
})