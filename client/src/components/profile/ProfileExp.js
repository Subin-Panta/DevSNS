import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileExp = props => {
  return (
    <div>
      <h3 className='text-dark'>{props.experience.company}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{props.experience.from}</Moment> -
        {props.experience.to ? (
          <Moment format='YYYY/MM/DD'>{props.experience.to}</Moment>
        ) : (
          <span>Now</span>
        )}
      </p>
      <p>
        <strong>Position: </strong> {props.experience.title}
      </p>
      <p>
        <strong>Description: </strong>
        {props.experience.description}
      </p>
    </div>
  )
}

ProfileExp.propTypes = {
  experience: PropTypes.object.isRequired
}

export default ProfileExp
