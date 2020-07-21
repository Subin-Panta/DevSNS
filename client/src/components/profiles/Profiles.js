import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Spinner } from '../layout/Spinner/Spinner'
import { connect } from 'react-redux'
import { getProfiles } from '../../store/actions/profile'
import ProfileItem from './ProfileItem'

const Profiles = props => {
  useEffect(() => {
    props.getProfiles()
  }, [])

  const loaded = (
    <Fragment>
      <h1 className='large text-primary'>Developers</h1>
      <p className='lead'>
        <i className='fab fa-connectdevelop'></i>Browse and connect with
        developers
      </p>
      <div className='profiles'>
        {props.profile.profiles.length > 0 ? (
          props.profile.profiles.map(item => (
            <ProfileItem key={item._id} profile={item} />
          ))
        ) : (
          <h4>No Profiles Found</h4>
        )}
      </div>
    </Fragment>
  )
  return props.profile.loading ? <Spinner /> : loaded
}

Profiles.propTypes = {
  profiles: PropTypes.object,
  getProfiles: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  profile: state.profile
})
const mapDispatchToProps = {
  getProfiles
}
export default connect(mapStateToProps, mapDispatchToProps)(Profiles)
