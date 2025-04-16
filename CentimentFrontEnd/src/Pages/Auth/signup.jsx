import React, { useContext, useState } from 'react'
import Authlayout from '../../Components/Authlayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../Components/Inputs/Input';
import { valiPassword, validEmail } from '../../utilities/helper';
import ProfilePhotoSelector from '../../Components/Inputs/ProfilePhotoSelector';
import axios from 'axios';
import axiosInstance from '../../utilities/axios';
import { API_PATHS } from '../../utilities/apipath';

import { UserContext } from '../../Context/UserContext';
import uploadImage from '../../utilities/uploadimage';



const Signup = () => {

 const[pfp, setpfp]= useState("");
 const[password, setpassword]= useState("");
 const [fullname, setfullname]=useState("");
 const [email, setemail]=useState("");
 const [error, seterror]=useState("");
 const { updateUser }= useContext(UserContext)
 const navigate = useNavigate();


 const handlesignup = async (e) => {
    e.preventDefault(); // Prevents the form from refreshing the page

    if(!fullname){
        seterror("Please Enter your Name");
    }
    if(!validEmail(email)){
        seterror("Please Enter a Valid Email");
        return;
    }
    if(!valiPassword(password)){
        seterror("Please Enter a Valid Password");
        return;
    }
    seterror("")

    //api call for signup
    try{
       
        
        const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
            fullName: fullname, email, password, profilepic: pfp
        });
        
        
        const {token, user}= response.data;
        if(token){
            localStorage.setItem("token", token);
            updateUser(user);
            navigate("/dashboard") 
        }
     }
     catch(error){
        if(error.response && error.response.data.message){
            seterror(error.response.data.message);
        }
        else{
            seterror("Something Went Wrong ");
        }

     }
    
   

};


 

  return (
    <Authlayout>
        <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
            <h3 className='text-xl font-semibold text-blue-700'>Create an Account</h3>
            <p className='text-xs text-slate-700 mt-[5px] mb-6'>Join us Today by Entering the Following Details <br />
            Try this by logging in with Email:Man@gmail.com and Password:Man12345@</p>
            
            <form onSubmit={handlesignup}>

            <ProfilePhotoSelector image={pfp} setImage={setpfp} />
               
                <Input
                value={fullname}
                onChange={({target})=> setfullname(target.value)}
                label= 'Full Name'
                placeholder='Example User'
                type='text'
                />
            <Input
                value={email}
                onChange={({target})=> setemail(target.value)}
                label= 'Email'
                placeholder='user@example.com'
                type='text'
            />

            <Input
                value={password}
                onChange={({target})=> setpassword(target.value)}
                label= 'Password'
                placeholder='Min 8 Letters'
                type='password'
                />
                {error && <p className='text-red-500 text-xs b-2.5'>{error}</p>}
            <button type='submit' className='button-prim'>SIGN UP</button>
                <p className='text-[13px] text-slate-800 mt-3'>Already have an Account? <Link to="/login" className='font-medium text-blue-400 '>SignIn</Link></p>
                
            </form>

         

        </div>
    </Authlayout>
  )
  }

export default Signup