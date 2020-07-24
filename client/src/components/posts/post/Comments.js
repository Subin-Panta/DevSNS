import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { deleteComment } from '../../../store/actions/post'
const Comments = props => (
  <div className='posts'>
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/profile/${props.comment.user}`}>
          <img className='round-img' src={props.comment.avatar} alt='' />
          <h4>{props.comment.name}</h4>
        </Link>
      </div>
      <div>
        <p className='my-1'>{props.comment.text}</p>
        <p className='post-date'>
          Posted on
          <Moment format='YYYY/MM/DD'>{props.comment.date}</Moment>
        </p>
        {!props.auth.loading && props.comment.user === props.auth.user._id && (
          <button
            onClick={props.deleteComment.bind(
              this,
              props.postId,
              props.comment._id
            )}
            type='button'
            className='btn btn-danger'
          >
            <i className='fas fa-times'></i>
          </button>
        )}
      </div>
    </div>
  </div>
)

Comments.propTypes = {
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth
})
const mapDispatchToProps = {
  deleteComment
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
