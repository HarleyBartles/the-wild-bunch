//import Promise from 'bluebird'
//import qs from 'qs'

//const statusCodes = {
//    INTERNAL_SERVER_ERROR: 500,
//    UNAUTHORISED: 401,
//    FORBIDDEN: 403,
//    NOT_FOUND: 404,
//    BAD_REQUEST: 400,
//    OK: 200
//}

//const responseHandler = ({ response, request, ...requestArgs }) => {
//    const contentType = response.headers.get("Content-Type")
//    const reject = Promise.reject

//    switch (response.status) {
//        case statusCodes.OK: {
//            if (contentType !== null && contentType.includes('application/json')) {
//                return response.json().then(responseData => {
//                    return responseData
//                })
//            }
//            else {
//                const message = `The server responded with unhandled content type: ${contentType}.`

//                return reject(message)
//            }
//        }        
//        case statusCodes.FORBIDDEN: {
//            requestManager.pauseRequests()

//            return request( ...requestArgs )
//        }
//        case statusCodes.UNAUTHORISED: {
//            const message = "You are not authorised to access the requested resource."

//            return reject(message)
//        }
//        case statusCodes.INTERNAL_SERVER_ERROR: {
//            const message = "An internal server error occurred."

//            return reject( message )
//        }
//        case statusCodes.NOT_FOUND: {
//            const message = "The requested resource was not found"

//            return reject( message )
//        }
        
//        default: {
//            const message = `The server responded with error code ${response.status}.`

//            return reject( message )
//        }
//    }
//}

//const localGetRequest = (url, token, params = {}, headers = {}) => {
//    const fullUrl = `${url}?${qs.stringify(params)}`

//    return fetch(fullUrl, {
//        metho: 'get',
//        headers: new Headers({
//            'Content-Type': 'application/json',
//            'Authorization': 'Bearer ' + token,
//            ...headers
//        })
//        .then(response => responseHandler({ response, request: requestManager.localGetRequest, url, params, headers }))
//    })
//}

//const localPostRequest = (url, token, body, headers = {}, isJsonResponse = true, otherProps = {}) => {
//    fetch(url, {
//        method: 'POST',
//        body: body,
//        headers: new Headers({
//            'Authorization': 'Bearer ' + token,
//            ...headers
//        }),
//        ...otherProps
//    })
//    .then(response => responseHandler({ response, request: requestManager.localPostRequest, url, body, headers, otherProps }))

//}

//const newGuid = () => {
//    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxx'.replace(/[xy]/g, function(c) {
//        const r = Math.random() * 16 | 0, v = c === 'x' ? r : r & 0x3 | 0x8
//        return v.toString(16)
//    })
//}

//class Request {
//    constructor(parameters) {
//        this._parameters = parameters
//        this.id = newGuid()
//    }

//    build(promiseRetriever) {
//        const self = this
//        this._promiseRetriever = promiseRetriever

//        this._promise = new Promise((resolve, reject) => {
//            return self._resolve = () => {
//                let requestPromise = this._promiseRetriever(self._parameters)
//                return resolve(requestPromise)
//            }
//        })

//        return this._promise
//    }

//    resolve() {
//        if (this._resolve)
//            this._resolve()
//    }
//}

//class RequestManager {
//    constructor() {
//        this._pendingRequests = []
//        this._accessToken = null
//        this._store = null
//    }

//    connectStore(store) {
//        this._store = store
//    }

//    pauseRequests() {
//        this._accessToken = null
//    }

//    updateAccessToken(accessToken) {
//        this._accessToken = accessToken

//        this._pendingRequests.forEach(r => r.resolve)
//        this._pendingRequests = []
//    }

//    localGetRequest(url, param, header, requireAuth = true) {
//        const self = this
//        if (this._accessToken !== null || !requireAuth) {
//            return localGetRequest(url, this._accessToken, param, header)
//        } else {
//            let requestParams = {
//                url,
//                param,
//                header
//            }

//            let request = new Request(requestParams)
//            let promise = request.build(result => {
//                return localGetRequest(result.url, self._accessToken, result.param, result.header)
//            })

//            this._pendingRequests.push(request)
//            return promise
//        }
//    }

//    localPostRequest(url, body, headers, requreAuth = true, otherProps = {}) {
//        const jsonHeaders = {
//            ...headers,
//            'Content-Type': 'application/json'
//        }

//        return this.postRawRequest( url, JSON.stringify(body), jsonHeaders, requireAuth, true, otherProps)
//    }

//    postRawRequest(url, body, headers, requireAuth = true, isJsonResponse = false, otherProps = {}) {
//        const self = this

//        if (this._accessToken !== null || !requireAuth) {
//            return localPostRequest(url, this._accessToken, body, headers, isJsonResponse, otherProps)
//        } else {
//            const requestParams = {
//                url,
//                body,
//                headers,
//                isJsonResponse,
//                otherProps
//            }

//            const request = new Request(requestParams)
//            const promise = request.build(result => {
//                return localPostRequest(result.url, self._accessToken, result.body, result.headers, result.isJsonResponse, result.otherProps )
//            })

//            this._pendingRequests.push(request)
//            return promise
//        }
//    }
//}

//const requestManager = new RequestManager()

//export const middleware = (store) => {
//    return (next) => (action) => {
//        switch (action.type) {
//            case "AUTHENTICATED":
//                requestManager.updateAccessToken(action.data.access_token)
//        }
//    }
//}

//export default requestManager