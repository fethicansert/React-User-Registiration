import React from 'react'
import { NavLink } from 'react-router-dom'
const Editor = () => {
  return (
    <div className='main-container'>
      <div className='editor-container'>
        <h1>Editor</h1>
        <NavLink to={'/'}>Home</NavLink>
      </div>
    </div>
  )
}

export default Editor
