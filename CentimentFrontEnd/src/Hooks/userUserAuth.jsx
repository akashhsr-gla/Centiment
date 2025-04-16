import { useContext, useEffect } from "react"
import { UserContext } from "../Context/UserContext"
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utilities/axios";
import { API_PATHS } from "../utilities/apipath";

export const userUserAuth=()=>{
const{ user, updateUser, clearUser}= useContext(UserContext);
const navigate= useNavigate();
useEffect(()=>{
    if(user){
        return;
    }
    let isMounted= true;
    const fetchUserInfo= async()=>{
        try{
            const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO)

            if(isMounted&& response.data){
                updateUser(response.data);
            }
        }
        catch(error){
            console.error("Unable to get Data");

            if(isMounted){
                clearUser();
                navigate('/login');
            }

        }
    };
    fetchUserInfo();
    return()=>{
        isMounted=false
    }


},[updateUser, clearUser, navigate]);
}