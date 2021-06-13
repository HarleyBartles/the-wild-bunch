import React from 'react'
import { Switch, Route, useRouteMatch } from 'react-router'
import Login from './Login'
import Register from './Register'

const AccountContainer = (props) => {
    let match = useRouteMatch()

    return (
        <Switch>
            <Route path={`${match.path}/login`}><Login /></Route>
            <Route path={`${match.path}/register`}><Register /></Route>
        </Switch>
    )
}

export default AccountContainer