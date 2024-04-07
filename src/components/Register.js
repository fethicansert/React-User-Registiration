import { useRef, useState, useEffect, useReducer } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import axios from '../api/axios';

//Notez err lara bak axiosun

//REGEX Regular Expressions (Düzenli İfadeler) 
//testing username and password if can pass regex text according our requirements on app
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = '/register'

const Register = () => {


    const [user, setUser] = useState('');  //useReducer to reduce state
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const userRef = useRef();
    const errRef = useRef();

    //Setting focus to username field
    useEffect(() => userRef.current.focus(), []); //userRef is refence to user input {current: input#username}

    //Check If user Input Pass USER_REGEX
    useEffect(() => {
        const result = USER_REGEX.test(user);
        setValidName(result);
    }, [user]);

    //Check If pwd Input Pass PWD_REGEX and Confirm Password
    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);

        const isMatch = pwd === matchPwd;
        setValidMatch(isMatch)
    }, [pwd, matchPwd])

    //Clear Err Message After Input States Changes
    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])


    const handleSubmit = async (e) => {
        e.preventDefault();

        //check user regex again
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }

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
            //Send Register Request To Server
            const response = await axios.post(REGISTER_URL, bodyContent, {
                headers: headerList,
                withCredentials: true
            });

            //If Status 201 (means new user created in DB) Set Succes 
            if (response.status === 201) {
                console.log("Sucsesss");
                setSuccess(true);
                errMsg('');
            };
        } catch (err) {
            //Handling axiois errors
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err?.response.status === 409) {
                setErrMsg("Username Already Exist");
            } else {
                console.log(err.response.data);
                setErrMsg("Sign Up Failed")
            }
            // errRef.current.focus();
        }
    }

    return (

        <section className='main-container'>
            <form className='register-container' onSubmit={handleSubmit}>

                <p ref={errRef} className={errMsg ? 'show-err err-message' : 'hide-err err-message'}>{errMsg}</p>
                <h2 className='register-title'>Sign <span>up</span></h2>

                {/* username label and input field*/}
                <div className='input-field-group'>
                    <label htmlFor='username-field'>
                        Username
                    </label>
                    <input
                        id='username-field'
                        className={user && !validName ? 'login-input input-err' : 'login-input'}
                        type='text'
                        required
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        ref={userRef}
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    {
                        userFocus && user && !validName &&
                        <p className='instruction'>
                            <FontAwesomeIcon icon={faInfoCircle} className='instruction-icon' />
                            4 to 24 characters.<br />
                            Must beggin with a letter.<br />
                            Letters, numbers, underscores, hyphens allowed.
                        </p>
                    }
                </div>

                {/* password label and input field*/}
                <div className='input-field-group'>

                    <label htmlFor='password-field'>
                        Password
                    </label>
                    <input
                        id='password-field'
                        className={pwd && !validPwd ? 'login-input input-err' : 'login-input'}
                        type='password'
                        required
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                    {
                        pwdFocus && pwd && !validPwd &&
                        <p className='instruction'>
                            <FontAwesomeIcon icon={faInfoCircle} className='instruction-icon' />
                            8 to 24 characters.<br />
                            Must include uppercase letter and lowercase letter,a number and a special character.<br />
                            Allowed special characters:
                            <span aria-label='exclamation mark'>!</span>
                            <span aria-label='at symbol'>@</span>
                            <span aria-label='hashtag'>#</span>
                            <span aria-label='dolar sign'>$</span>
                            <span aria-label='percent'>%</span>
                        </p>
                    }
                </div>

                {/* confirm password label and input field*/}
                <div className='input-field-group'>
                    <label htmlFor='confirm-password'>
                        Confirm Password
                    </label>
                    <input
                        id='confirm-password'
                        className={matchPwd && !validMatch ? 'login-input input-err' : 'login-input'}
                        type='password'
                        required
                        value={matchPwd}
                        onChange={(e) => setMatchPwd(e.target.value)}
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />

                    {
                        matchPwd && matchFocus && !validMatch &&
                        <p className='instruction'>
                            <FontAwesomeIcon icon={faInfoCircle} className='instruction-icon' />
                            Must match the first password input field.
                        </p>
                    }
                </div>


                {/* submit button */}
                <button type='submit' disabled={!validName || !validPwd || !validMatch ? true : false}>
                    Submit
                </button>

                {/*Navigation to login page*/}
                <span className='already-sigin-text'>Already Sign up?</span>
                <Link to={'/login'}><p className='sigin-text'>Sign in</p></Link>
            </form>
        </section>
    )
}

export default Register

//What is the REGEX stand for ?
//=> Reguler Expressions

//Why we use useEffect to every time to test REGEX with user pwd pwdMatch input?
//We just want to check user and pwd also matchPwd when they change if they not change we don't need to test
//them if they pass our regex test
//think other state change we going to re-render register but I don't want to test password or username to do unnessceary job
//that's why we use useEffect 

//Aria is all about accesbilty

//What is aria-invalid ? 
//=> Indicates the entered value does not conform to the format expected by the application.
//=> It's user input not pass to USER_REGEX

//What is aria-describedby ?


//what is aria-labels
//aria-label give additional information to html element they can used by screen reader or another techologies that I don't know :)
//Sometimes accesible name of element is not visible like icon button or character names like @ at sign or $ dolar sign
//We can use aria-label to give information to element