import React, { useState } from 'react'

//Bo hook exercise amacli ogrenilmistir ilerde kullanilabilir...
const useLocalStorage = (keyName, defaultvalue) => {
    
    const [storedValue, setStoredValue] = useState(() => {

        try {
            //getItem to store in State
            const value = window.localStorage.getItem(keyName); 

            //if there is value with given keyName than initilazie State with localStorage value
            if(value) {                                     
                return JSON.parse(value);
            } else {
            //if no in the localStorage with the given key than initialize State witg defautl value
                window.localStorage.setItem(keyName, JSON.stringify(defaultvalue)); 
                return defaultvalue;
            }
            //if err occured while trying to set localStorage than ....
        } catch (err) {
            return defaultvalue;
        }
    });

    const setValue = (newValue) => {
        try {
            window.localStorage.setItem(keyName, newValue);
        } catch(err) {
            console.log(err);
        }
        setStoredValue(newValue);
    }
    
    return [storedValue, setValue];
}

export default useLocalStorage
