import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ProfileItem = props => {
  return (
    <Fragment>
      <div className='profile bg-light'>
        <img className='round-img' src={props.profile.user.avatar} alt='' />
        <div>
          <h2>{props.profile.user.name}</h2>
          <p>
            {props.profile.status}{' '}
            {props.profile.company && <span> {props.profile.company}</span>}
          </p>
          <p>
            {props.profile.location && <span>{props.profile.location} </span>}
          </p>
          <Link
            to={`/profile/${props.profile.user._id}`}
            className='btn btn-primary'
          >
            View Profile
          </Link>
        </div>
        <ul>
          {props.profile.skills.slice(0, 4).map((item, index) => (
            <li className='text-primary' key={index}>
              <i className='fas fa-check'></i>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  )
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileItem
