import React from 'react'
import { useNavigate } from 'react-router-dom'
const Unauthrized = () => {
  const navigate = useNavigate();
  
  const navigateBack = () => {
    navigate(-1);
  }

  return (
    <div className='main-container'>
        <div className='unauthorized-container'>
        <h1>401 Unauthorized</h1>
        <button onClick={navigateBack}>Go Back</button>
    </div>
    </div>
    
  )
}

export default Unauthrized
