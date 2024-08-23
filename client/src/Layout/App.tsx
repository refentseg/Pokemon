import './App.css'
import HomePage from '../Features/Home/HomePage';
import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';



function App() {
  const location = useLocation();
  return(
    <>
    {
      location.pathname === '/' ? <HomePage />
      :
       <Outlet />
       
    }
    </>
    
  )
}

export default App
