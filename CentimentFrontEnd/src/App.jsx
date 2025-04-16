import { useContext, useState } from 'react'
import './App.css'
import './index.css';  // Ensure this is correct

import { BrowserRouter as Router,Routes, Route, Navigate, } from 'react-router-dom'
import Login from './Pages/Auth/login'
import Signup from './Pages/Auth/signup'
import Home from './Pages/Dashboard/Home'
import Income from './Pages/Dashboard/Income'
import Expense from './Pages/Dashboard/Expense'
import UserProvider from './Context/UserContext';
import Predictions from './Pages/Dashboard/Predictions';
import Accounts from './Pages/Dashboard/Accounts';
import Dashboardlayout from './Components/dashboardlayout';

function App() {
  const [count, setCount] = useState(0)
 
  return (
    <UserProvider>
      <Router>
        <Routes> 
          <Route path='/' element={<Root />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<Signup />}/>
          <Route path='/dashboard' element={
            
              <Home />
            
          }/>
          <Route path='/income' element={
            
              <Income />
            
          }/>
          <Route path='/expense' element={
            
              <Expense />

          }/>
          <Route path='/accounts' element={
           
              <Accounts />
         
          }/>
          <Route path='/predictions' element={
            
              <Predictions />
           
          }/>
        </Routes>
      </Router>

     </UserProvider>
  )
}

export default App;

const Root= ()=>{
  const isAuthenticated=!!localStorage.getItem("token");
  return isAuthenticated?(<Navigate to="/dashboard" />):(<Navigate to="/login" />);
};
