import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileTop = ({ profile }) => {
  return (
    <Fragment>
      <img className='round-img my-1' src={profile.user.avatar} alt='' />

      <h1 className='large'>{profile.user.name}</h1>
      <p className='lead'>
        {profile.status} {profile.company && <span>at {profile.company}</span>}
      </p>
      <p>{profile.location && <span>{profile.location}</span>}</p>
      <div className='icons my-1'>
        {profile.website && (
          <a href={profile.website} rel='noopener noreferrer' target='_blank'>
            <i className='fas fa-globe fa-2x'></i>
          </a>
        )}
        {profile.social && profile.social.twitter && (
          <a
            href={profile.social.twitter}
            rel='noopener noreferrer'
            target='_blank'
          >
            <i className='fab fa-twitter fa-2x'></i>
          </a>
        )}
        {profile.social && profile.social.facebook && (
          <a
            href={profile.social.facebook}
            rel='noopener noreferrer'
            target='_blank'
          >
            <i className='fab fa-facebook fa-2x'></i>
          </a>
        )}
        {profile.social && profile.social.linkedin && (
          <a
            href={profile.social.linkedin}
            rel='noopener noreferrer'
            target='_blank'
          >
            <i className='fab fa-linkedin fa-2x'></i>
          </a>
        )}
        {profile.social && profile.social.instagram && (
          <a
            href={profile.social.instagram}
            rel='noopener noreferrer'
            target='_blank'
          >
            <i className='fab fa-instagram fa-2x'></i>
          </a>
        )}
        {profile.social && profile.social.youtube && (
          <a
            href={profile.social.youtube}
            rel='noopener noreferrer'
            target='_blank'
          >
            <i className='fab fa-youtube fa-2x'></i>
          </a>
        )}
      </div>
    </Fragment>
  )
}

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileTop
