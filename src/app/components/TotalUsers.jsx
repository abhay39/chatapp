import Image from 'next/image'
import React from 'react'

const TotalUsers = ({item}) => {
  return (
    <div className='flex items-center mb-1 cursor-pointer mt-2'>
        <Image src={item.profile} alt='useprofile' height={50} width={50} className='w-10 h-10 rounded-full object-cover'/>
        <div className='ml-3'>
        <h1 className='text-xl font-bold'>{item.name}</h1>
        <p className='text-[12px]'>last message</p>
        </div>
    </div>
  )
}

export default TotalUsers