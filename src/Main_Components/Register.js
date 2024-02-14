import { useRef, useState, useEffect, useReducer } from 'react';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Register = () => {
    console.log("Register Rendered");
    //REGEX Regular Expressions (Düzenli İfadeler) 
    //testing username and password if can pass regex text according our requirements on app
    const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/; 
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    const [user, setUser] = useState('');  //useReducer to reduce state
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    
    // const [userState, userDispatch] = useReducer((state, action) => {
    //     switch(action.type){
    //         case 'setName':
    //             return {...state,user: action.payload.user}                 //I can use same logic to smilar states liker setValidName setUserFocus just changin false and true
    //         case 'setValidName':
    //     }
    // },{
    //     user: '',
    //     validName: false,
    //     userFocus: false
    // })

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        //if button enabled with js hack like using console the change button disable attributes
        //Check again if USER_REGEX and PWD_REGEX test result is OK
        //You can think why API can be better to work with this sitations
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if( !v1 || !v2){
            setErrMsg("Invalid Entry");
            return;
        }

        setSuccess(true);
    }
    
    return (
        <>
            {success ? 
            <section className='success'>
                <h1>Success</h1>
            </section> : 
            <section className='register'>
                <p ref={errRef} className= {errMsg ? 'err-msg' : 'offscreen'} aria-live='assertive'>{errMsg}</p>
                <h1 className='register-title'>Register</h1>
          
                <form onSubmit={handleSubmit}>
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
                    <input  className={userFocus && validName ? 'input valid-input' 
                            : !validName && user ? 'input invalid-input' : 'input'} //check if userFocus and username is valid than use valid class - and if I username lenth more than 0 and username is not valid use invalid class if both of them not happenig use just input not validation style
                            id='username' //id for label attributes htmlFor 
                            type='text' 
                            ref={userRef} 
                            value={user} 
                            onChange={(e) => setUser(e.target.value)} 
                            required 
                            autoComplete='off'
                            onFocus={() => setUserFocus(true)}   //setFocus to know when to show instruction about username if username not focus to username-input we don't need to show instruction
                            onBlur={() => setUserFocus(false)}
                            aria-invalid= { validName ? 'false' : 'true' }
                            aria-describedby='uidnote'
                    />
                    <p id='uidnote' className={userFocus && user && 
                    !validName ? 'instruction' : 'offscreen'}>
                        <FontAwesomeIcon icon={faInfoCircle}/>
                        4 to 24 characters.<br/>
                        Must beggin with a letter.<br/>
                        Letters, numbers, underscores, hyphens allowed.
                    </p>
                    <label htmlFor='password'>
                        Password
                        {validPwd && 
                        <span>
                            <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                        </span>}
                            
                        {!validPwd && pwd &&
                        <span>
                            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                        </span>
                        }
                    </label>
                    <input  className={pwdFocus && validPwd ? 'input valid-input'
                            : !validPwd && pwd ? 'input invalid-input' : 'input'}
                            id='password' 
                            type='password'
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            required
                            autoComplete='off'
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                    />
                    <p className={pwdFocus && pwd && !validPwd ? 'instruction' : 'offscreen'}>
                        <FontAwesomeIcon icon={faInfoCircle}/>
                        8 to 24 characters.<br/>
                        Must include uppercase letter and lowercase letter,a number and a special character.<br/>
                        Allowed special characters: 
                        <span aria-label='exclamation mark'>!</span>
                        <span aria-label='at symbol'>@</span>
                        <span aria-label='hashtag'>#</span>
                        <span aria-label='dolar sign'>$</span>
                        <span aria-label='percent'>%</span>
                    </p>

                    <label htmlFor='confirmPassword'>
                        Confirm Password
                        {validMatch && matchPwd &&
                        <span>
                            <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                        </span>}
                            
                        {!validMatch && matchPwd &&
                        <span>
                            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                        </span>
                        }
                    </label>
                    <input  className={matchFocus && validMatch && matchPwd ? 'input valid-input'
                            : !validMatch && matchPwd ? 'input invalid-input' : 'input'}
                            id='confirmPassword'
                            type='password'
                            value={matchPwd}
                            onChange={(e) => setMatchPwd(e.target.value)}
                            required
                            autoComplete='off'
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                    />
                    <p className={matchFocus && !validMatch && matchPwd ? 'instruction' : 'offscreen'}>
                        <FontAwesomeIcon icon={faInfoCircle}/>
                        Must match the first password input field.
                    </p>
                    <button className='register-submit' disabled={!validName || !validPwd || !validMatch ? true : false}>Sing Up</button>  
                    {/* if only one button in the form we don't need to give type submit beacuse button in form automatcly subbmit the form when get click*/}
                    {/* Check if all validatons are ok than diable or enable the button */}
                </form>
         </section>}
        </>

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