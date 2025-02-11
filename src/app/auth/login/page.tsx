"use client"
import LoginForm from '@/components/LoginForm'
import React from 'react'

const page = () => {

    
    return (
        <div className='flex items-center justify-center min-h-screen w-[600px] mx-auto'>
            <LoginForm isLogin={true} />
        </div>
    )
}

export default page
