import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useLogut from '../hooks/useLogut'
import { useNavigate } from 'react-router-dom'
const LOGOUT_URL = '/logout'

const Home = () => {

  const { auth } = useAuth();
  const navigate = useNavigate()
  const logout = useLogut();

  const signOut = async () => {
    await logout();
    navigate('/linkpage')
  }

  return (
    <div className='main-container'>
      <div className='home-container'>
        <h1 className='home-title'>Home</h1>
        <p className='logged-in-text'>Welcome {auth.user}!</p>
        <nav className='nav-list'>
          <Link to={'/editor'}>Go to editor page.</Link>
          <Link to={'/admin'}>Go to admin page</Link>
          <Link to={'/lounge'}>Go to  lounge</Link>
          <Link to={'/linkpage'}>Go to link page</Link>
        </nav>

        <button 
          className='logout-button'
          onClick={signOut}
          >
          Log out
        </button>
    </div>
    </div>
  )
}

export default Home
