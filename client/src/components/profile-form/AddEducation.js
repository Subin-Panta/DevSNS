import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addEducation } from '../../store/actions/profile'
import { withRouter } from 'react-router-dom'

const AddEducation = props => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: ''
  })
  const [toDateDisabled, toggleDisabled] = useState(false)
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  } = formData
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })
  return (
    <Fragment>
      <h1 className='large text-primary'>Add Your Education</h1>
      <p className='lead'>
        <i className='fas fa-graduation-cap'></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault()
          props.addEducation(formData, props.history)
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='* School or Bootcamp'
            name='school'
            value={school}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            value={degree}
            onChange={onChange}
            type='text'
            placeholder='* Degree or Certificate'
            name='degree'
            required
          />
        </div>
        <div className='form-group'>
          <input
            value={fieldofstudy}
            onChange={onChange}
            type='text'
            placeholder='* Field Of Study'
            name='fieldofstudy'
          />
        </div>
        <div className='form-group'>
          <h4>* From Date</h4>
          <input value={from} onChange={onChange} type='date' name='from' />
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input
            value={to}
            onChange={onChange}
            type='date'
            name='to'
            disabled={toDateDisabled ? 'disabled' : ''}
          />
        </div>
        <div className='form-group'>
          <p>
            <input
              value={current}
              onChange={e => {
                setFormData({ ...formData, current: !current })
                toggleDisabled(!toDateDisabled)
              }}
              type='checkbox'
              name='current'
              checked={current}
            />{' '}
            Current School
          </p>
        </div>
        <div className='form-group'>
          <textarea
            value={description}
            onChange={onChange}
            name='description'
            cols='30'
            rows='5'
            placeholder='Program Description'
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <a className='btn my-1' href='dashboard.html'>
          Go Back
        </a>
      </form>
    </Fragment>
  )
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  addEducation
}
export default connect(null, mapDispatchToProps)(withRouter(AddEducation))
