import React from "react"
import { connect } from "react-redux"


class SilentCallback extends React.Component {
    componentDidMount() {
        var um = this.props.userManager;


        if (um != null) {
            um.signinSilentCallback();
        }
    }


    render() {
        return (
            <div></div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        userManager: state.auth.userManager
    }
}


export default connect(mapStateToProps)(SilentCallback);