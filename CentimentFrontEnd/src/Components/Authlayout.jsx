import React from 'react'
import DesImg from '../assets/img1.png'
import { LuTrendingUpDown } from "react-icons/lu"

const Authlayout = ({ children }) => {



    
  return (
    <div className='flex'>
        <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12'>
        <h1 className="text-3xl font-bold text-blue-700 hover:text-blue-900 transition-colors duration-200">
   Centiment
</h1>



        {children}




        </div>
        <div className='hidden md:block w-[40vw] h-screen bg-blue-50 bg-auth-bg-image bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative'>
            <div className='w-48 h-48 shadow-md rounded-[40px] bg-blue-600 absolute -top-7 -left-5'></div>
            <div className='w-48 h-48 shadow-md rounded-[40px] border-[20px] border-blue-900 absolute top-[30%] right-[0%]'></div>
            <div className='w-48 h-48 shadow-md rounded-[40px] border-[20px] border-blue-200 absolute bottom-7 left-5'></div>

            <div className='grid grid-cols-1 z-20'>
                <InfoCard 
                label="Track and Predict your Expenses and Income "
                value="430,000"
                icon={<LuTrendingUpDown />}
                />

            </div>




            <div className='flex items-center justify-center '>
            <img src={DesImg} alt="E" className='shadow-md mt-40 w-[100%] h-[100%] bg-gray-200 rounded-xl relative z-30'/>
            

            </div>

            
        </div>
        
    </div>
  )
}

export default Authlayout

const InfoCard= ({icon, label, value})=>{
    return (<div className='flex gap-6 text-blue-500  bg-white p-4 rounded-xl shadow-md shadow-blue-400/10 border border-gray-200/50 z-10'> <div className={'w-12 h-12 flex items-center justify center text-black-400 text-[26px] rounded-full drop-shadow-xl'}>
        {icon}

    </div>
    <div>
        <h6 className='text-xs text-gray-500 mb-1'>{label}</h6>
        <span className='text-[20px]'>{value}</span>

    </div>
    </div>

    )  

}