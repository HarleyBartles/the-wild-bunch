import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from './Components/Layout'

import { withRouter } from 'react-router'
import { compose } from 'redux'
import { connect } from 'react-redux'

class RouteContainer extends React.Component {
    render() {
        const { location } = this.props
        const path = location.pathName

        return (
            <Layout>
                <Route path='/' Component={SomeHomeComponent} />
                <Route path='/map' component={SomeMapComponent} />
            </Layout>
        )
    }
}

export default compose(
    connect(),
    withRouter
)( RouteContainer )