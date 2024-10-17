import React from 'react'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import NavBar from './NavBar'
import Home from './Home'
import PostDetails from './PostDetails'
import AddQuery from './AddQuery'
import AboutUs from './AboutUs'
import ContactUs from './ContactUs'




export default function Main() {
  return (
    <div>
         
        <BrowserRouter>
      
        <NavBar/>
        <Routes>
        
          <Route path="/" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/blog/:id" element={<PostDetails/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/addquery" element={<AddQuery/>} />
          <Route path="/about" element={<AboutUs/>} />
          <Route path="/contact" element={<ContactUs/>} />
          
        </Routes>
        </BrowserRouter>
    </div>
  )
}
