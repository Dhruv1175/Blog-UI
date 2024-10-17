import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import bgImg from './loginPage.png';
import logo from './logo.png';
import googleLogo from './googleLogo.png';
import { app } from "./Firebase";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import './Register.css'; // Updated CSS file

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const [imgUrl, setImgUrl] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imgUrl) {
      alert("Please upload a profile picture.");
      return;
    }
    const storage = getStorage(app);
    const ref = storageRef(storage, `/images/${Date.now()}`);
    await uploadBytes(ref, imgUrl);
    const img = await getDownloadURL(ref);
  
    try {
      const response = await axios.post("http://localhost:3080/blog/user/register", {
        user: name, 
        email: email, 
        phone: phone, 
        password: pass, 
        profileUrl: img 
      });
      console.log(response.data); // Log the response to check its structure
      const { message, success } = response.data;
  
      if (success) {
        alert(message);
        navigate("/");
      } else {
        alert(message);
       
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while registering. Please try again.");
    }
  }
  

  return (
    <div className="register-page-container">
      <div className="register-page-left">
        <div className="register-page-logo-container">
          <img src={logo} alt="Logo" className="register-page-logo" />
        </div>
        <h2 className="register-page-heading">Join Us Today!</h2>
        <p className="register-page-paragraph">Sign up to get unlimited access to blogs and resources.</p>
        <form className="register-page-form" onSubmit={handleSubmit}>
          <div className="register-page-profile-upload-container">
            <label htmlFor="profile-upload" className="register-page-upload-text">Upload Profile Picture</label>
            <input
              type="file"
              id="profile-upload"
              onChange={(e) => setImgUrl(e.target.files[0])}
              className="register-page-file-input"
              required
            />
            <div className="register-page-upload-circle">
              <span>+</span>
            </div>
          </div>
          <div className="register-page-input-group">
            <label htmlFor="name">Username*</label>
            <input 
              type="text" 
              id="name" 
              placeholder="Enter your username" 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          <div className="register-page-input-group">
            <label htmlFor="email">Email*</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email address" 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="register-page-input-group">
            <label htmlFor="phone">Phone*</label>
            <input 
              type="text" 
              id="phone" 
              placeholder="Enter your phone number" 
              onChange={(e) => setPhone(e.target.value)} 
              required 
            />
          </div>
          <div className="register-page-input-group">
            <label htmlFor="password">Password*</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Enter your password" 
              onChange={(e) => setPass(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="register-page-button">Sign Up</button>
          <div className="register-page-divider">Or, Register with</div>
          <button type="button" className="register-page-google-login">
            <img src={googleLogo} alt="Google logo" className="register-page-google-logo" /> Sign up with Google
          </button>
          <p className="register-page-login-link">
            Already have an account? <Link to="/"> Log In Here</Link>
          </p>
        </form>
      </div>
      <div className="register-page-right">
        <img src={bgImg} alt="Design" className="register-page-design-image" />
      </div>
    </div>
  );
}
