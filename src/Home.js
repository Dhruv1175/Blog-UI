// App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'
import LatestPosts from './LatestPosts';
import WorldNews from './WorldNews';
import Footer from './Footer';

function Home() {
  return (
    <div className="App bg-dark text-light">
      
      <LatestPosts />
      <WorldNews />
      <Footer />
    </div>
  );
}

export default Home;
