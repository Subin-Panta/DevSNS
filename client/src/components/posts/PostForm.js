import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addPost } from '../../store/actions/post'
const PostForm = props => {
  const [text, setText] = useState('')
  return (
    <form
      className='form my-1'
      onSubmit={e => {
        e.preventDefault()
        props.addPost({ text })
        setText('')
      }}
    >
      <textarea
        cols='30'
        rows='5'
        value={text}
        onChange={e => {
          setText(e.target.value)
        }}
        placeholder='Create a Post'
      ></textarea>
      <input type='submit' value='Submit' className='btn btn-dark my-1'></input>
    </form>
  )
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
}
const mapDispatchToProps = {
  addPost
}
export default connect(null, mapDispatchToProps)(PostForm)
