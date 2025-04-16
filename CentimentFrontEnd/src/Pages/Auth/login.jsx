import React, { useContext, useState } from 'react'
import Authlayout from '../../Components/Authlayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../Components/Inputs/Input';
import { valiPassword, validEmail } from '../../utilities/helper';
import axiosInstance from '../../utilities/axios';
import { API_PATHS } from '../../utilities/apipath';
import { UserContext } from '../../Context/UserContext';


const Login = () => {
    const [email, setemail]=useState("");
    const [password, setpassword]=useState("");
    const [error, seterror]=useState(null);
    const navigate= useNavigate();
    const { updateUser }= useContext ( UserContext )

    const handlelogin=async(e)=>{
        e.preventDefault();
        if(!validEmail(email)){
            seterror("Please Enter a Valid Email");
            return;
        }
        if(!valiPassword(password)){
            seterror("Please Enter a Valid Password");
            return;
        }
        seterror("")

        //api call for login
        try{
            const response= await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
              email, 
              password,
       });
          
     const { token, user } = response.data; 
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

    }


   


  return (
    <Authlayout>

    
        <div className="lg:w-70% h:3/4 md:h-full flex flex-col justify-center">
            <h3 className="text-xl font-semibold text-blue-700">
                Welcome Back

            </h3>
            <p className='text-xs text-slate-700 mt-[5px] mb-6'>
                Please Enter your Details to Login <br />
                Try this using Email:Man@gmail.com and Password:Man12345@
            </p>
            <form onSubmit={handlelogin}>
            <Input
                value={email}
                onChange={({target})=> setemail(target.value)}
                label= 'Email Address'
                placeholder='email@example.com'
                type='text'
                />
            <Input
                value={password}
                onChange={({target})=> setpassword(target.value)}
                label= 'Password'
                placeholder='Min 8 Letters'
                type='password'
                />
            {error&& <p className='text-red-500 text-xs b-2.5'>{error}</p>}
            <button type='submit' className='button-prim'>LOGIN</button>
                <p className='text-[13px] text-slate-800 mt-3'>Don't have an Account? <Link to="/signup" className='font-medium text-blue-400 '>SignUp</Link></p>
                
                
            </form>

        </div>
    </Authlayout>
   
  )
}

export default Login