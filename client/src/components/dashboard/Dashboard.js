import React, { useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getCurrentProfile } from '../../store/actions/profile'
import { Spinner } from '../layout/Spinner/Spinner'
import { DashboardActions } from './DashboardActions'
const Dashboard = props => {
  useEffect(() => {
    props.getCurrentProfile()
  }, [])
  return props.profile.loading && props.profile.profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user text-primary'></i>Welcome{' '}
        {props.auth.user && props.auth.user.name}
      </p>
      {props.profile.profile !== null ? (
        <DashboardActions />
      ) : (
        <Fragment>
          <p> Create Your Profile :)</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  )
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})
const mapDispatchToProps = {
  getCurrentProfile
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
