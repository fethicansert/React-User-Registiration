import React from 'react'
import { Link } from 'react-router-dom'
import axios from '../api/axios'
import useAuth from '../hooks/useAuth'

const LOGOUT_URL = '/logout'

const Home = () => {

  const { setAuth, auth } = useAuth();
  
  const logoutHandler = async () => {
            //Set Requset Headers
    const headerList = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    };
  
    try {
      const response = await axios.post(LOGOUT_URL, {}, {
        headers: headerList,
        withCredentials: true
      });

      setAuth({});
      console.log(response);
    } catch(err) {
      console.log(err);
    }
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
          onClick={logoutHandler}
          >
          Log out
        </button>
    </div>
    </div>
  )
}

export default Home
