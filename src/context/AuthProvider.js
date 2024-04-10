import React, { createContext, useState } from 'react'

export const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem('persist')) || false);
    // console.log(persist);
    return (
        <AuthContext.Provider value={{auth, setAuth, persist, setPersist}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider

//Provide auth context to components for prevent unsecceary props drilling,
//Reduce Complexty and
//Help middleware to do their process, like check if user authentication OK

