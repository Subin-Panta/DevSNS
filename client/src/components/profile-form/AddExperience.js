import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addExperience } from '../../store/actions/profile'
import { withRouter, Link } from 'react-router-dom'

const AddExperience = props => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: ''
  })
  const [toDateDisabled, toggleDisabled] = useState(false)
  const { company, title, location, from, to, current, description } = formData
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })
  return (
    <Fragment>
      <h1 className='large text-primary'>Add An Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form
        className='form'
        onSubmit={e => {
          e.preventDefault()
          props.addExperience(formData, props.history)
        }}
      >
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Job Title'
            name='title'
            value={title}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <input
            value={company}
            onChange={onChange}
            type='text'
            placeholder='* Company'
            name='company'
            required
          />
        </div>
        <div className='form-group'>
          <input
            value={location}
            onChange={onChange}
            type='text'
            placeholder='Location'
            name='location'
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
            Current Job
          </p>
        </div>
        <div className='form-group'>
          <textarea
            value={description}
            onChange={onChange}
            name='description'
            cols='30'
            rows='5'
            placeholder='Job Description'
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link to='/dashboard' className='btn my-1'>
          Go Back
        </Link>
      </form>
    </Fragment>
  )
}

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  addExperience
}
export default connect(null, mapDispatchToProps)(withRouter(AddExperience))
