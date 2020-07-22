import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Spinner } from '../../layout/Spinner/Spinner'
import { getPost } from '../../../store/actions/post'
import PostItem from '../PostItem'
import CommentForm from './CommentForm'
const Post = props => {
  useEffect(() => {
    props.getPost(props.match.params.id)
  }, [])
  return props.post.loading || props.post.post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to='/posts' className='btn'>
        Back To Posts
      </Link>
      <PostItem post={props.post.post} showActions={false} />
      <CommentForm postId={props.post.post._id} />
    </Fragment>
  )
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  post: state.post
})
const mapDispatchToProps = {
  getPost
}
export default connect(mapStateToProps, mapDispatchToProps)(Post)
