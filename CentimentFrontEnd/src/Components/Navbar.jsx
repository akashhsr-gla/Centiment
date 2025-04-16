import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import SideMenu from './SideMenu';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [openSideMenu, setopenSideMenu] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const getActiveMenu = () => {
        const path = location.pathname;
        if (path === '/dashboard' || path === '/') return 'Dashboard';
        if (path === '/income') return 'Income';
        if (path === '/expense') return 'Expense';
        if (path === '/accounts') return 'Accounts';
        if (path === '/predictions') return 'Predictions';
        return '';
    };

    const handleLogoClick = () => {
        navigate('/dashboard');
    };

    return (
        <div className='flex gap-5 bg-white border border-b border-gray-200/50 black-drop-[2px] py-4 px-7 sticky top-0 z-30'>
            <button 
                className='block lg:hidden text-black' 
                onClick={() => setopenSideMenu(!openSideMenu)}
            >
                {openSideMenu ? 
                    <HiOutlineX className='text-2xl'/> : 
                    <HiOutlineMenu className='text-2xl'/>
                }
            </button>
            <h2 
                className='text-3xl font-bold text-blue-700 hover:text-blue-900 transition-colors duration-200 cursor-pointer'
                onClick={handleLogoClick}
            >
                Centiment
            </h2>
            {openSideMenu && 
                <div className='fixed top-[61px] -ml-4 bg-white'>
                    <SideMenu activeMenu={getActiveMenu()}/>
                </div>
            }
        </div>
    );
};

export default Navbar;