import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowRight, Users } from 'lucide-react';
import { useClerk, UserButton, useUser} from '@clerk/clerk-react'

const Navbar = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const { openSignIn } = useClerk();
    const { pathname } = useLocation();
    const [userCount, setUserCount] = useState(null);

    const isHome = pathname === '/';

    useEffect(() => {
        if (!isHome) return;
        fetch(`${import.meta.env.VITE_BASE_URL}/api/stats/user-count`)
            .then((res) => res.json())
            .then((data) => { if (data.success) setUserCount(data.count); })
            .catch(() => {});
    }, [isHome]);

  return (
    <div className='fixed z-5 w-full backdrop-blur-2xl flex justify-between 
    items-center py-3 px-4 sm:px-20 xl:px-32 '>
        <img src={assets.logo} alt="logo" className='w-32 sm:w-44 cursor-pointer' 
        onClick={() => navigate('/')} />

        {isHome && userCount !== null && (
            <div className='flex items-center gap-1.5 bg-indigo-50 border border-indigo-200 rounded-full px-3 py-1.5 text-xs text-indigo-700 font-medium'>
                <Users size={13} className='text-indigo-500' />
                <span><strong>{userCount.toLocaleString()}</strong> users joined</span>
            </div>
        )}

        {
            user ? <UserButton/>
            :
            (
                <button onClick={() => openSignIn()} className='flex items-center gap-2 rounded-full text-sm
                cursor-pointer bg-primary text-white py-2.5 px-10'>Get Started
                <ArrowRight className='w-4 h-4' />  </button>
            )
        }



       
      
    </div>
  )
}

export default Navbar
