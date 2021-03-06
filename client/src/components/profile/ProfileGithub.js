import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getGithubRepos } from '../../store/actions/profile'
import { Spinner } from '../layout/Spinner/Spinner'
const ProfileGithub = props => {
  useEffect(() => {
    console.log(props.username)
    props.getGithubRepos(props.username)
  }, [])
  return (
    <div>
      <h2 className='text-primary my-1'>
        <i className='fab fa-github'></i> Github Repos
      </h2>
      {props.repos === null ? (
        <Spinner />
      ) : (
        props.repos.map((repo, index) => (
          <div key={index} className='repo bg-white my-1 p-1'>
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  {repo.full_name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>

            <div>
              <ul>
                <li className='badge badge-primary'>
                  Stars: {repo.stargazers_count}
                </li>
                <li className='badge badge-dark'>
                  Watchers: {repo.watchers_count}
                </li>
                <li className='badge badge-light'>Forks: {repo.forks_count}</li>
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

ProfileGithub.propTypes = {
  username: PropTypes.string.isRequired,
  repos: PropTypes.array.isRequired,
  getGithubRepos: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  repos: state.profile.repos
})
const mapDispatchToProps = {
  getGithubRepos
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileGithub)
