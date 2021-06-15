import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from './Components/Layout'
import MapContainer from './Components/Map/MapContainer'
import HomeContainer from './Components/Home/HomeContainer'
import { withRouter } from 'react-router'
import { compose } from 'redux'
import { connect } from 'react-redux'
import AccountContainer from './Components/Account/AccountContainer'
import LoginCallback from './Components/Identity/LoginCallback'
import SilentCallback from './Components/Identity/SilentCallback'

class RouteContainer extends React.Component {
    render() {
        const { location } = this.props
        const path = location.pathName

        if (path && path.startsWith('/silent-callback')){
            return (
                <Switch>
                    <Route path='/silent-callback' component={SilentCallback} />
                </Switch>
            )
        }

        return (
            <Layout>
                <Switch>
                    <Route exact path='/' component={HomeContainer} />
                    <Route path='/callback' component={LoginCallback} />
                    {    //<Route path='/account' component={AccountContainer} />
                    }
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