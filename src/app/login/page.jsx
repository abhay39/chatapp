"use client"
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { Auth } from '../hooks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

const LoginScreen = () => {

    const route=useRouter();

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const {userState,URL,setUserState}=useContext(Auth)



    const handleSignIn = async() => {
        try{
          let res=await fetch(`${URL}/api/login`,{
            method: 'POST',
            headers:{
              'content-type': 'application/json',
            },
            body:JSON.stringify({
              email:email,
              password:password,
            })
          })
          const status = res.status;
          res= await res.json();
          console.log(res)
          if(status==202){
            toast.success(res.message)
            localStorage.setItem("token",res.token)
            setTimeout(()=>{
                setUserState(true);
                route.push("/")
            },3000)
          }else{
            toast.error(res.message)
          }
        }catch(err){
          console.log("Error: " + err.message)
        }
    }

  return (
    <div  className='flex dark:text-black flex-col items-center justify-center h-[100vh] p-6'>
        <h1 className='font-bold text-3xl '>Login</h1>
        <ToastContainer />

        <div className='bg-[#05313d] p-3 rounded-md mt-2'>


            <div>
                <label htmlFor="" className='font-bold text-white'>Email</label>
                <br />
                <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Enter your email id' className='bg-slate-300 p-3 rounded-md' />
            </div>

            <div>
                <label htmlFor="" className='font-bold text-white'>Password</label>
                <br />
                <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Enter your password' className='bg-slate-300 p-3 rounded-md' />
            </div>


            <div className='mt-2'>
                <button onClick={handleSignIn} className='bg-green-800 p-3 w-full text-2xl font-bold text-white rounded-md'>Login</button>
            </div>

            <div className='mt-2 mb-2'>
                <label htmlFor="" className='font-bold text-white'>Dont' have an account?<Link href="/register" className='text-red-400'>Signup</Link></label>
            </div>

        </div>

    </div>
  )
}

export default LoginScreen