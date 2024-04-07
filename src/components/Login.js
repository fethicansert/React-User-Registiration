import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
const LOGIN_URL = '/auth'

const Login = () => {
    const { setAuth } = useAuth();
    const [user, setUser] = useState('admin');
    const [pwd, setPwd] = useState('1234');
    const [errMsg, setErrMsg] = useState('');

    const userRef = useRef();
    const errRef = useRef();
    
    const navigate = useNavigate();

    const location = useLocation();
    const fromLocation = location.state?.from.pathname || '/';

    useEffect(() => userRef.current.focus(), []);

    useEffect(() => setErrMsg(''), [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();

    
        //Set Requset Headers
        const headerList = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        };

        //Set Requset Body
        const bodyContent = {
            user, 
            pwd    
        };
        
        try {
            const response = await axios.post(LOGIN_URL, bodyContent, {
                headers: headerList,
                withCredentials: true //Makes browser include cookies and authentication headers in requests
            });
            
   
            if(response.status === 200) {
                const accessToken = response.data.accessToken;
                const roles = response.data.roles;
                setAuth({user, pwd, roles, accessToken});
                console.log(roles);
                navigate(fromLocation, { replace: true });
            };
            
          
        } catch(err) {
            if(!err?.response) {
                setErrMsg("No server response");
            }
            else if(err.response?.data?.error) {
                setErrMsg(err.response.data.error);
            } else {
                setErrMsg("Sign in failed");
            }
        }
    };

    return (
        <section className='main-container'>
            <form className='login-container' onSubmit={handleSubmit}>
                <p ref={ errRef } className={errMsg ? 'show-err err-message' : 'hide-err err-message'}>{errMsg}</p>
                <h2 className='login-title'>Sign <span>in</span></h2>

                <div className='input-field-group'>
                    <label htmlFor='username'>
                        Username
                    </label>
                    <input 
                        ref={userRef}
                        id='username'
                        className='login-input'
                        type='text'
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        required
                        autoComplete='off' 
                    />
                </div>

                <div className='input-field-group'>
                    <label  htmlFor='password'>
                        Password
                    </label>
                    <input 
                        id='password'
                        className='login-input'
                        type='password'
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        required
                    />
                </div>

                <button type='submit' className='' disabled={!user || !pwd ? true : false}>
                    Submit
                </button>

                <span className='already-sigin-text'>Need an account?</span>
                <Link to={'/register'}><p className='sigin-text'>Sign up</p></Link>

            </form>
        
        </section>
    )
}

export default Login
