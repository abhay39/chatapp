import React, { useContext, useEffect } from 'react'
import Dashboard from './dashboard/page'
import LoginScreen from './login/page'
import { Auth, AuthProvider } from './hooks'


const Navigations = () => {
    const {userState,setUserState}=useContext(Auth);

    useEffect(()=>{
        const state=localStorage.getItem("userState")
        if(state){
          setUserState(true)
        }
    },[userState])

return (
    <>
      {userState?(<Dashboard />):(<LoginScreen />)}
    </>
  )
}

export default Navigations