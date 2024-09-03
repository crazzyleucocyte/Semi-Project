import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';

import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <Router>
      <div>
        <Header isLoggedIn={isLoggedIn} toggleLogin={toggleLogin} />
        <Routes>
          <Route path="/" element={<PostList isLoggedIn={isLoggedIn} />} />
          <Route path="/post/:postId" element={<PostDetail isLoggedIn={isLoggedIn} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
