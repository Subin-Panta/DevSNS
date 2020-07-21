import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Spinner } from '../layout/Spinner/Spinner'
import { getProfileById } from '../../store/actions/profile'
import { Link } from 'react-router-dom'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExp from './ProfileExp'
import ProfileEdu from './ProfileEdu'
import ProfileGithub from './ProfileGithub'

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  auth,
  match
}) => {
  useEffect(() => {
    getProfileById(match.params.id)
  }, [])

  return (
    <Fragment>
      {console.log(profile)}
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn '>
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div className='profile-grid my-1'>
            <div className='profile-top bg-primary p-2'>
              <ProfileTop profile={profile} />
            </div>
            <div className='profile-about bg-light p-2'>
              <ProfileAbout profile={profile} />
            </div>

            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Experiences</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map(experience => (
                    <ProfileExp key={experience._id} experience={experience} />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>

            <div className='profile-edu bg-white p-2'>
              <h2 className='text-primary'>Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map(education => (
                    <ProfileEdu key={education._id} education={education} />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>

            <div className='profile-github'>
              {profile.githubusername && (
                <ProfileGithub username={profile.githubusername} />
              )}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

Profile.propTypes = {}
const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})
const mapDispatchToProps = {
  getProfileById
}
Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
