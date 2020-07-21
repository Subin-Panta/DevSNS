import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
const ProfileEdu = props => {
  return (
    <div>
      <h3>{props.education.school}</h3>
      <p>
        <Moment format='YYYY/MM/DD'>{props.education.from}</Moment> -
        {props.education.to ? (
          <Moment format='YYYY/MM/DD'>{props.education.to}</Moment>
        ) : (
          <span>Now</span>
        )}
      </p>
      <p>
        <strong>Degree: </strong> {props.education.degree}
      </p>
      <p>
        <strong>Field Of Study: </strong>
        {props.education.fieldofstudy}
      </p>
      <p>
        <strong>Description: </strong>
        {props.education.description}
      </p>
    </div>
  )
}

ProfileEdu.propTypes = {
  education: PropTypes.object.isRequired
}

export default ProfileEdu
