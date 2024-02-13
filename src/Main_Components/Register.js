import { useRef, useState, useEffect, useReducer } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Register = () => {
    //REGEX Regular Expressions (Düzenli İfadeler) 
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

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

useEffect(() => {
   userRef.current.focus(); //userRef is refence to user input {current: input#username}
},[]);

useEffect(() => {
    // setValidName(USER_REGEX.test(user)); one line implementation
    const result = USER_REGEX.test(user); //Checks if username input pass the user-regex test returns true or false
    setValidName(result); //set return of regex test
},[user]);

useEffect(() => {
    // setValidPwd(PWD_REGEX.test(pwd));
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    // setValidMatch(pwd === matchPwd);
    const isMatch = pwd === matchPwd;
    setValidMatch(isMatch)
},[pwd ,matchPwd])

//This is for cleaning error message after user see errMsg and write someting something to user, pwd or matchPwd inputs
useEffect(() => {
    setErrMsg('');
},[user, pwd , matchPwd])

    const userRef = useRef();
    const errRef = useRef();

    return (
        <section className='register'>
            <p ref={errRef} className= {errMsg ? 'err-msg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
            <h1 className='register-title'>Register</h1>
            <form>
                <label htmlFor='username'>
                    Username
                    {validName && 
                    <span>
                        <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                    </span>}
                        
                    {!validName && user &&
                    <span>
                        <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                    </span>
                    }
                </label>

                <input  className={userFocus && validName ? 'username-input valid-username' 
                        : userFocus && !validName && user ? 'username-input invalid-username' : 'username-input'} //check if username is valid and input focused ? 'username-input valid-username' not check if it's not valid and focused put 'username-input invalid-username' if not check also user length ok if not means no input entered default input style => username-input
                        id='username' 
                        type='text' ref={userRef} 
                        value={user} onChange={(e) => setUser(e.target.value)} 
                        required 
                        autoComplete='off'
                        onFocus={() => setUserFocus(true)}   //setFocus to know when to show instruction about username if username not focus to username-input we don't need to show instruction
                        onBlur={() => setUserFocus(false)}
                        aria-invalid= { validName ? 'false' : 'true' }
                        aria-describedby='uidnote'
                    />

                <p id='uidnote' className={userFocus && user && 
                !validName ? 'instruction' : 'offscreen'}>
                    <FontAwesomeIcon icon={faInfoCircle}/><br/>
                    4 to 24 characters.<br/>
                    Must beggin with a letter.<br/>
                    Letters, numbers, underscores, hyphens allowed.
                </p>
            </form>
        </section>
    )
}

export default Register

//What is the REGEX stand for ?
//=> Reguler Expressions

//Why we use useEffect to every time to test REGEX with user pwd pwdMatch input?


//Aria is all about accesbilty

//What is aria-invalid ? 
//=> Indicates the entered value does not conform to the format expected by the application.
//=> It's user input not pass to USER_REGEX

//What is aria-describedby ?