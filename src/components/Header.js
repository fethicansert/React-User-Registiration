import React from 'react'
import { FaForumbee } from "react-icons/fa";
import { NavLink, useNavigate } from 'react-router-dom';
const Header = () => {
    const navigate = useNavigate();

    const navHome = () => {
        navigate('/');
    }
    return (
        <header>
            <div className='header-group'>
                <h1 onClick={navHome} className='header-title'>Tablezz</h1>
                <FaForumbee className='header-table-icon'/>
            </div>
            <NavLink className={'nav-link'} to={'/linkpage'}>Links</NavLink>
        </header>
    )
}

export default Header
