import React, { useState } from 'react';
import './Login.css';
import loginPage from './loginPage.png'
import logo from './logo.png'
import googleLogo from './googleLogo.png'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';

function Login() {


  const[email,setemail]=useState("")
  const[pass,setpass]=useState("")
  const navigate=useNavigate()
  const {isLoggedIn, setIsLoggedIn} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post("http://localhost:3080/blog/user/login", {
        email: email,
        pass: pass
      });
  
      if (response.data.success === false) {
        alert(response.data.message);
      } else {
        alert(response.data.message);
        console.log(response.data)
        localStorage.setItem("token",response.data.accesstoken)
        localStorage.setItem("uname",response.data.uname)
        localStorage.setItem("pUrl",response.data.pUrl)
        setIsLoggedIn(true)
        navigate("/home");
      }
    } catch (error) {
      console.error("There was an error logging in:", error);
      alert("An error occurred. Please try again later.");
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="logo-container">
          {/* Replace with your logo */}
          <img style={{height:50,width:50}} src={logo} alt="Logo" className="logo" />
        </div>
        <h2>Welcome back!</h2>
        <p>Enter to get unlimited access to data & information.</p>
        <form  onSubmit={handleSubmit} >
          <div className="input-group">
            <label htmlFor="email">Email*</label>
            <input onChange={(e)=>{setemail(e.target.value)}} type="email" id="email" placeholder="Enter your mail address" />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password*</label>
            <input onChange={(e)=>{setpass(e.target.value)}} type="password" id="password" placeholder="Enter password" />
            <span className="forgot-password">Forgot your password?</span>
          </div>
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <button type="submit" className="login-button">Log In</button>
          <div className="divider">Or, Login with</div>
          <button type="button" className="google-login">
            <img style={{width:20,height:20}} src={googleLogo} alt="Google logo" /> Sign up with Google
          </button>
          <p className="register">
            Don’t have an account? <Link to='/register'>Register here</Link>
          </p>
        </form>
      </div>
      <div className="login-right">
        <img src={loginPage} alt="Design" className="design-image" />
      </div>
    </div>
  );
}

export default Login;
