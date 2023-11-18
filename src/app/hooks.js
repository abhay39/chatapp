"use client"
import {createContext, useState} from 'react';

const Auth =createContext({});

const AuthProvider =({children})=>{
    const [userState,setUserState]=useState(false);
    const URL="https://chattingappweb.vercel.app";
    const [userDetails,setUserDetails]=useState("");

    return (
        <Auth.Provider value={{userState,setUserState,URL,userDetails,setUserDetails}}>
            {children}
        </Auth.Provider>
    )
}

export {AuthProvider,Auth}