import React, { useContext } from 'react'
import { UserContext } from '../Context/UserContext';
import Navbar from './Navbar';
import SideMenu from './SideMenu';

const Dashboardlayout = ({children, activeMenu}) => {
    const { user }= useContext(UserContext)


  return (
    <div className=''>
        <Navbar activeMenu={activeMenu}/>
        {user &&(
            <div className='flex'>
                <div className='max-[1080px]:hidden'>
                    <SideMenu activeMenu={activeMenu}/>

                </div>
                <div className='grow max-5'>
                    {children}

                </div>

            </div>
        )}
    </div>
  )
}
export default Dashboardlayout;
