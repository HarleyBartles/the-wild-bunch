import React from 'react'
import { connect } from 'react-redux'

class ProfilePage extends React.Component {
    render() {
        const { user } = this.props
        return (
            <div>
                {user ? (
                <div>
                    <h1>Profile</h1>
                    <div>
                        <h3>Welcome, {user.profile.given_name}</h3>
                    </div>
                    <div>
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>Identity Token</td>
                                    <td>{user.id_token}</td>
                                </tr>
                                <tr>
                                    <td>Token Type</td>
                                    <td>{user.token_type}</td>
                                </tr>
                                <tr>
                                    <td>Identity Token</td>
                                    <td>{user.id_token}</td>
                                </tr>
                                <tr>
                                    <td>Expires</td>
                                    <td>{user.expires_at}</td>
                                </tr>
                                <tr>
                                    <td>Scope</td>
                                    <td>{user.scope}</td>
                                </tr>
                                {Object.keys(user.profile).map(key => (
                                    <tr key={key}>
                                        <td>{key}</td>
                                        <td>{user.profile[key]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div>Please Login</div>
            )}
            </div> 
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.oidc.user
    }
}

export default connect(mapStateToProps)(ProfilePage)