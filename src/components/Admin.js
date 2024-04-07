import React from 'react'
import { NavLink } from 'react-router-dom'
import Users from './Users'
const Admin = () => {
  return (
    <div className='main-container'>
      <div className='admin-container'>
        <h1>Admin</h1>
        <Users />
        <NavLink to={'/'}>Home</NavLink>
    </div>
    </div>
  )
}

export default Admin
