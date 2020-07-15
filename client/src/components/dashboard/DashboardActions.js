import React from 'react'
import { Link } from 'react-router-dom'

export const DashboardActions = () => {
  return (
    <div class='dash-buttons'>
      <Link to='/edit-profile' class='btn'>
        <i class='fas fa-user-circle'></i>
        Edit Profile
      </Link>
      <Link to='/add-experience' class='btn'>
        <i class='fa fa-black-tie'></i>
        Add Experience
      </Link>
      <Link to='/add-education' class='btn'>
        <i class='fas fa-graduation-cap'></i>
        Add Education
      </Link>
    </div>
  )
}
