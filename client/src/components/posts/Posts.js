import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Spinner } from '../layout/Spinner/Spinner'
import { connect } from 'react-redux'
import { getPosts } from '../../store/actions/post'
import PostItem from './PostItem'
import PostForm from './PostForm'
const Posts = props => {
  useEffect(() => {
    props.getPosts()
  }, [])
  return props.post.loading ? (
    <Spinner />
  ) : (
    <div>
      <h1 className='large text-primary'>Posts</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Welcome to the Community
      </p>
      <div className='post-form'>
        <div className='post-form-header bg-primary'>
          <h3>Say Something...</h3>
        </div>
        <PostForm />
        <div className='posts'>
          {props.post.posts.map(item => (
            <PostItem key={item._id} post={item} />
          ))}
        </div>
      </div>
    </div>
  )
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  post: state.post
})
const mapDispatchToProps = {
  getPosts
}
export default connect(mapStateToProps, mapDispatchToProps)(Posts)
