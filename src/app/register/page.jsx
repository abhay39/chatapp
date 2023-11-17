"use client";
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Auth } from '../hooks';


const RegisterScreen = () => {

    const route=useRouter()
    const {URL,userState}=useContext(Auth);
    const [fullName,setFullName]=useState("")
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [profile,setProfile]=useState(null)
    const [isLoading,setIsLoading]=useState(false)


    const cloudinaryUpload = async(e) => {
        const file = e.target.files[0];
        setIsLoading(true);
        const data = new FormData()
        data.append('file', file)
        data.append('upload_preset', 'chatApp')
        data.append("cloud_name", "dyb6mzodn")
        let response=await fetch("https://api.cloudinary.com/v1_1/dyb6mzodn/image/upload", {
          method: "POST",
          body: data
        })
        response=await response.json();
        setIsLoading(false)
        setProfile(response.secure_url)
    }

    const handleSignUp = async() => {
        try{
          let res=await fetch(`${URL}/api/register`,{
            method: 'POST',
            headers:{
              'content-type': 'application/json',
            },
            body:JSON.stringify({
              name:fullName,
              email:email,
              password:password,
              profile:profile
            })
          })
          const status = res.status;
          res= await res.json();
          
          if(status==202){
            toast.success(res.message)
            route.push("/")
          }else{
            toast.error(res.message)
          }
        }catch(err){
          console.log("Error: " + err.message)
        }
    }

  return (
    <div  className='flex dark:text-black flex-col items-center justify-center h-[100vh] p-6'>
        <h1 className='font-bold text-3xl '>Register</h1>

        <div className='bg-[#05313d] p-3 rounded-md mt-2'>
            <ToastContainer />

            <div className='flex items-center justify-center'>
                {profile && <img src={profile} alt='profile' height={100} width={100} className='h-24 w-24 object-cover rounded-full' />}
            </div>

            <div>
                <label htmlFor="" className='font-bold text-white'> Full Name</label>
                <br />
                <input onChange={(e)=>setFullName(e.target.value)} type="text" placeholder='Enter your full name' className='bg-slate-300 p-3 rounded-md' />
            </div>

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

            <div className='w-28 mt-2 mb-2'>
                <label htmlFor="" className='font-bold text-white'>Upload Profile</label>
                <br />
                <input type="file" accept='image/*' onChange={cloudinaryUpload} />
            </div>

            <div className='mt-2 mb-2'>
                <label htmlFor="" className='font-bold'><Link href="/" className='text-white'>Forgot Password?</Link></label>
            </div>

            
            <div >
                <button onClick={handleSignUp} className='bg-green-800 p-3 w-full text-xl font-bold text-white rounded-md'>{isLoading?"Profile uploading":"Register"}</button>
            </div>

            <div className='mt-2 mb-2'>
                <label htmlFor="" className='font-bold text-white'>Already have an account?<Link href="/login" className='text-red-400'>Login</Link></label>
            </div>

        </div>

    </div>
  )
}

export default RegisterScreen