"use client"
import React, { useContext } from 'react'
import { Auth, AuthProvider } from './hooks'
import RegisterScreen from './register/page';
import LoginScreen from './login/page';
import Dashboard from './dashboard/page';
import Navigations from './navigations';

const page = () => {
  const {userState}=useContext(Auth);

  return (
    <AuthProvider>
      <Navigations />
    </AuthProvider>
  )
}

export default page