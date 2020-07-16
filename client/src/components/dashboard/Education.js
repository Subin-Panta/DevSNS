import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { deleteEducation } from '../../store/actions/profile'
const Education = props => {
  const educations = props.education.map(item => (
    <tr key={item._id}>
      <td>{item.school}</td>
      <td className='hide-sm'>{item.degree}</td>
      <td className='hide-sm'>
        {' '}
        <Moment format='YYYY/MM/DD'>{item.from}</Moment> -{' '}
        {item.to ? <Moment format='YYYY/MM/DD'>{item.to}</Moment> : 'Now'}
      </td>
      <td>
        <button
          className='btn btn-danger'
          onClick={() => props.deleteEducation(item._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))
  return (
    <Fragment>
      <h2 className='my-2'>Education Credentials</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  )
}

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired
}
const mapStateToProps = {
  deleteEducation
}
export default connect(null, mapStateToProps)(Education)
