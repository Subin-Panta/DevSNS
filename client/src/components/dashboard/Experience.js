import React, { Fragment } from 'react'
import Moment from 'react-moment'
import PropTypes from 'prop-types'
import { deleteExperience } from '../../store/actions/profile'
import { connect } from 'react-redux'
const Experience = props => {
  const experiences = props.experience.map(item => (
    <tr key={item._id}>
      <td>{item.company}</td>
      <td className='hide-sm'>{item.title}</td>
      <td className='hide-sm'>
        <Moment format='YYYY/MM/DD'>{item.from}</Moment>-{' '}
        {item.to ? <Moment format='YYYY/MM/DD'>{item.to}</Moment> : 'Now'}
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => props.deleteExperience(item._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))
  return (
    <Fragment>
      <h2 className='my-2'>Experience Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  )
}

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  deleteExperience
}

export default connect(null, mapDispatchToProps)(Experience)
