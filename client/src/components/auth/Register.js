import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setAlert } from '../../actions/alert'
import PropTypes from 'prop-types'

const Register = ({ setAlert }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const { name, email, password, password2 } = formData
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    if (password !== password2) {
      setAlert('PassWords Do Not Match', 'danger')
    } else {
      console.log(formData)
    }
  }
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Create Your account
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            name='name'
            type='text'
            placeholder='Name'
            required
            value={name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            name='email'
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={e => onChange(e)}
            required
          />
          <small className='form-text'>
            This site uses Gravatar, so if you want a profile image use a
            Gravatar Email
          </small>

          <div className='form-group'>
            <input
              name='password'
              type='password'
              placeholder='Password'
              minLength='6'
              value={password}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              name='password2'
              type='password'
              placeholder='Confirm Password'
              minLength='6'
              value={password2}
              onChange={e => onChange(e)}
              required
            />
          </div>
        </div>
        <input type='submit' value='Register' className='btn btn-primary' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign in</Link>
      </p>
    </Fragment>
  )
}
Register.propTypes = {
  setAlert: PropTypes.func.isRequired
}
export default connect(null, { setAlert })(Register)
