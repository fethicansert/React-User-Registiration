import React from 'react'
import { NavLink } from 'react-router-dom'
const LinkPage = () => {

    return (
        <div className='main-container'>
            <div className='link-container'>
                <h2 className='links-sub-title'>Public</h2>
                <nav className='nav-list'>
                    <NavLink to={'/login'}>Login</NavLink>
                    <NavLink to={'/login'}>Sign in</NavLink>
                </nav>

                <h2 className='links-sub-title'>Private</h2>
                <nav className='nav-list'>
                    <NavLink to={'/'}>Home</NavLink>
                    <NavLink to={'/editor'}>Editor Page</NavLink>
                    <NavLink to={'/admin'}>Admin Page</NavLink>
                </nav>
            </div>
        </div>
    )
}

export default LinkPage
