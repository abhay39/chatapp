import React, { useContext, useEffect, useLayoutEffect, useReducer, useState } from 'react'
import { Auth } from '../hooks'
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiLogOutCircle } from "react-icons/bi";
import { IoCall } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";


const Dashboard = () => {
  const {userState}=useContext(Auth);
  const {URL,userDetails,setUserDetails,setUserState}=useContext(Auth);
  const [isloading,setIsloading]=useState(false);
  const [totalUsers,setTotalUsers]=useState([])
  const [message,setMessage]=useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [totalConversations,setTotalConversations]=useState([])
  const [isMessageSent,setIsMessageSent] = useState(false);


  const getUserDetails =async()=>{
    const token=localStorage.getItem("token");
    let res=await fetch(`${URL}/api/users/${token}`);
    const status = res.status;
    res= await res.json();
    if(status==202){
      setUserDetails(res.user)
    }else{
      toast.error(res.message);
    }
  }

  const handleLogout=()=>{
    toast.success("Logged out successfully");
    setTimeout(()=>{
      localStorage.clear();
      setUserState(false);
    })
  }

  const getAllUsers =async(item)=>{
    let res=await fetch(`${URL}/api/allUsers/${item}`);
    const status = res.status;
    res= await res.json();
    if(status==202){
      setTotalUsers(res.users)
    }else{
      toast.error(res.message);
    }
  }

  const handleSend=async(messageType,imageUri,recepientId)=>{
      try{
        if(messageType == "image" ){
          const data={
            "userId":userDetails._id,
            "recepientId":recepientId,
            "messageType":'image',
            "imageUrl":imageUri
          }
            let res=await fetch(`${URL}/api/message/addNewMessage`,{
            method:'POST',
            headers:{
              'Content-Type':'application/json',
              'Accept':'application/json'
            },
            body:JSON.stringify({
              "data":data
            })
          })
          res=await res.json();
          getAllMessageOfUsers()
        }else{
          let msg=message;
          
          const data={
            "userId":userDetails._id,
            "recepientId":recepientId,
            "messageType":'text',
            "messageText":msg
          }
            let res=await fetch(`${URL}/api/message/addNewMessage`,{
              method:'POST',
              headers:{
                'Content-Type':'application/json',
                'Accept':'application/json'
              },
              body:JSON.stringify({
                "data":data
              })
            })
            setMessage("")
            res=await res.json();
            if(res.status==200){
              getAllMessageOfUsers()
            }
        }
      }catch(err){
        console.log("Error sending message ", err)
      }
    }

    const getAllMessageOfUsers=async (item1,item2)=>{
      try{
        let res=await fetch(`${URL}/api/messages/${item1}/${item2}`,{
        method:'GET'
      });
        res=await res.json();
        setTotalConversations(res.messages);
      }catch(e){
        // console.log("Sever error ",e.message)
      }
    }

  useEffect(()=>{
    localStorage.setItem("userState", JSON.stringify(userState))
    getUserDetails()
    
  },[userDetails])

  useEffect(()=>{
    if(userDetails){
      getAllUsers(userDetails._id);
    }
    
    if(selectedUser){
      getAllMessageOfUsers(userDetails._id, selectedUser._id)
      setIsMessageSent(false)
    }
  },[userDetails])

  // console.log(totalConversations)

  const isDisables=!message;

  return (
    <>
      <ToastContainer />
      {
      isloading?(<div className="flex justify-center items-center h-screen">
      <div class="spinner-border"></div>
    </div>):(<div className='flex flex-1 text-white flex-row  h-[100vh]'>
      <div className='bg-[#121319] p-2 w-1/4 hidden md:block'>
        <h1 className='font-bold text-2xl mb-3'>All Users</h1>
        <div>
          {totalUsers?.length>0?(totalUsers?.map((item,index)=>{
            return(
            <div onClick={()=>setSelectedUser(item)}  className='flex  mb-1 cursor-pointer mt-2 items-center'>
              <Image src={item.profile} alt='useprofile' height={50} width={50} className='w-10 h-10 rounded-full object-cover'/>
              <div className='ml-3'>
              <h1 className='text-xl font-bold'>{item.name}</h1>
              <p className='text-[12px]'>last message</p>
            </div>
        </div>)
          })):(<div className='flex items-center justify-center max-h-full mt-3'><h1 className="text-2xl font-bold">No users found!!!</h1></div>)}
        </div>
        <div onClick={handleLogout} className="absolute bottom-2 flex items-center cursor-pointer">
          <BiLogOutCircle color="white" size={30}/>
          Logout
        </div>
      </div>

      <div className='bg-slate-600 p-2 justify-center  h-[100vh] w-[100%]'>
        {selectedUser?(
        <div >

          <div className='flex flex-row w-[100%]  bg-slate-600 p-3 rounded-md items-center mb-1 shadow-md cursor-pointer mt-2 justify-between'>
              <div className='flex items-center'>
                <Image src={selectedUser.profile} alt='useprofile' height={50} width={50} className='w-10 h-10 rounded-full object-cover'/>
                <div className='ml-3'>
                  <h1 className='text-xl font-bold'>{selectedUser.name}</h1>
                </div>
              </div>
              <div className='flex items-center'>
                <IoCall size={30} className='ml-3' color='white' />
                <FaVideo  size={30} className='ml-6' color='white' />
              </div>
          </div>

          <div className="h-[550px] overflow-scroll p-2 w-[100%] flex flex-col
          ">
          {totalConversations.length > 0?(
            totalConversations.map((item) => (
              <div
                key={item._id} // Add a unique key for each item in the map
                className={`flex ${item.senderId._id === userDetails._id ? 'justify-end ' : 'justify-start '}   p-1 mb-1 text-white`}
              >
                <p className={`${item.senderId._id === userDetails._id ?"bg-gray-700 p-2 rounded-md w-[20%]":"bg-blue-700 p-2 rounded-md w-[20%]"} text-white`}>{item.message}</p>
              </div>
            ))):(<div className='flex flex-row h-[100vh] w-[100%] items-center justify-center'>
            <h1 className='text-3xl font-bold text-center'>No Chats yet </h1>
          </div>)}
        </div>

          <div className='mt-2 flex items-center shadow-2xl p-1 md:p-2 bg-slate-400 rounded-xl'>
              <input value={message} onChange={(e)=>setMessage(e.target.value)} type="text" placeholder='Enter your message' className='p-1 outline-none md:p-2  rounded-md border-none w-[90%] md:w-[100%] text-black' />
            {message.length>0?(<div>
              <button onClick={()=>handleSend("text",null,selectedUser._id)} className='bg-green-800 p-1 w-full text-2xl font-bold text-white rounded-md'>Send</button>
            </div>):(<button disabled={isDisables} onClick={()=>handleSend("text",null,selectedUser._id)} className={`${isDisables?'bg-gray-300':'bg-green-800'} 'p-1 w-[100px] text-xl font-bold md:hidden text-white rounded-md'`}>Send</button>)}
          </div>
        </div>):(<div className='flex flex-row h-[100vh] w-[100%] items-center justify-center'>
          <h1 className='text-3xl font-bold text-center'>Select a user to chat </h1>
        </div>)}
        </div>
    </div>
    )}
    </>
  )
}

export default Dashboard