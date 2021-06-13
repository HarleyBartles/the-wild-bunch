import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from './Components/Layout'
import MapContainer from './Components/Map/MapContainer'
import HomeContainer from './Components/HomeContainer'

import { withRouter } from 'react-router'
import { compose } from 'redux'
import { connect } from 'react-redux'

class RouteContainer extends React.Component {
    render() {
        const { location } = this.props
        const path = location.pathName

        return (
            <Layout>
                <Switch>
                    <Route path='/'>
                        <HomeContainer />
                    </Route>
                    <Route path='/map' component={MapContainer} />
                </Switch>
            </Layout>
        )
    }
}

export default compose(
    connect(),
    withRouter
)( RouteContainer )