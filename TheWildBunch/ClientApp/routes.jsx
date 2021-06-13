import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from './Components/Layout'
import MapContainer from './Components/Map/MapContainer'
import HomeContainer from './Components/Home/HomeContainer'

import { withRouter } from 'react-router'
import { compose } from 'redux'
import { connect } from 'react-redux'
import AccountContainer from './Components/Account/AccountContainer'

class RouteContainer extends React.Component {
    render() {
        const { location } = this.props
        const path = location.pathname

        return (
            <Layout>
                <Switch>
                    <Route path='/map'><MapContainer /></Route>
                    <Route path='/account'><AccountContainer /></Route>                    
                    <Route path='/'><HomeContainer /></Route>                    
                </Switch>
            </Layout>
        )
    }
}

export default compose(
    connect(),
    withRouter
)( RouteContainer )