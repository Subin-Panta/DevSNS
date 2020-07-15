import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../store/actions/auth'
const Login = props => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = e => {
    e.preventDefault()
    props.login(email, password)
  }
  //Redirect if logged in
  if (props.isAuthenticated) {
    return <Redirect to='/dashboard' />
  }
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Sign Into Your account
      </p>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input
            name='email'
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={e => onChange(e)}
            required
          />

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
        </div>
        <input type='submit' value='Login' className='btn btn-primary' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  )
}
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}
const mapStatetoProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})
const mapDispatchToProps = {
  login
}
export default connect(mapStatetoProps, mapDispatchToProps)(Login)
