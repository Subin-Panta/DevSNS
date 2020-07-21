import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({ profile }) => {
  return (
    <Fragment>
      {profile.bio && (
        <Fragment>
          <h2 className='text-primary'>
            {profile.user.name.trim().split(' ')[0]}'s Bio
          </h2>
          <p>{profile.bio}</p>
          <div className='line'></div>
        </Fragment>
      )}

      <h2 className='text-primary'>Skill Set</h2>
      <div className='skills'>
        {profile.skills.map((item, index) => (
          <div className='p-1' key={index}>
            <i className='fas fa-check'></i> {item}
          </div>
        ))}
      </div>
    </Fragment>
  )
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileAbout
