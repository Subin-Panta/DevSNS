import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { addLike, removeLike, deletePost } from '../../store/actions/post'
const PostItem = props => (
  <div className='post bg-white my-1 p-1'>
    <div>
      <Link to={`/profile/${props.post.user}`}>
        <img className='round-img' src={props.post.avatar} alt='' />
        <h4>{props.post.name}</h4>
      </Link>
    </div>
    <div>
      <p className='my-1'>{props.post.text}</p>
      <p className='post-date'>
        Posted on <Moment format='YYYY/MM/DD'>{props.post.date}</Moment>
      </p>
      {props.showActions && (
        <Fragment>
          <span className='comment-count'> {props.post.likes.length}</span>{' '}
          <button className='btn' onClick={() => props.addLike(props.post._id)}>
            <i className='fas fa-thumbs-up'></i>
          </button>
          <button
            className='btn'
            onClick={() => props.removeLike(props.post._id)}
          >
            <i className='fas fa-thumbs-down'></i>
          </button>
          <Link to={`/posts/${props.post._id}`} className='btn btn-primary'>
            Discussion{' '}
            <span className='comment-count'>{props.post.comments.length}</span>
          </Link>
          {!props.auth.loading && props.post.user === props.auth.user._id && (
            <button
              type='button'
              className='btn btn-danger'
              onClick={() => props.deletePost(props.post._id)}
            >
              <i className='fas fa-times' />
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
)
PostItem.defaultProps = {
  showActions: true
}
PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
}
const mapstateToProps = state => ({
  auth: state.auth
})
const mapDispatchToProps = {
  addLike,
  removeLike,
  deletePost
}
export default connect(mapstateToProps, mapDispatchToProps)(PostItem)
