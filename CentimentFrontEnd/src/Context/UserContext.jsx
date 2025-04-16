import React, { createContext, useState } from 'react'
export const UserContext = createContext();

const UserProvider = ({children}) => {
    const[user, setuser]= useState(null);
    const updateUser= (userData)=>{
        setuser(userData);
    }
    const clearUser= (userData)=>{
        setuser(null); 
    }
  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
    {children}
</UserContext.Provider>


  );
}

export default UserProvider