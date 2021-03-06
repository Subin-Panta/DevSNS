import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../../../store/actions/post'
const CommentForm = props => {
  const [text, setText] = useState('')
  return (
    <div className='post-form'>
      <div className='post-form-header bg-primary'>
        <h3>Leave A Comment</h3>
      </div>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault()
          props.addComment(props.postId, { text })
          setText('')
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          value={text}
          onChange={e => {
            setText(e.target.value)
          }}
          placeholder='Comment on this post'
        ></textarea>
        <input type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  )
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
}
const mapDispatchToProps = {
  addComment
}
export default connect(null, mapDispatchToProps)(CommentForm)
