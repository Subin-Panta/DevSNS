import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
	<Route
		{...rest}
		render={props => {
			console.log(!auth.isAuthenticated && !auth.loading)
			return !auth.isAuthenticated && !auth.loading ? (
				<Redirect to='/login' />
			) : (
				<Component {...props} />
			)
		}}
	/>
)

PrivateRoute.propTypes = {
	auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
	auth: state.auth
})
export default connect(mapStateToProps)(PrivateRoute)
