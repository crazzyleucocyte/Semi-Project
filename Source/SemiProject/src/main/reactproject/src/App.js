import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
        <button onClick={toggleLogin}>
          {isLoggedIn ? '로그아웃' : '로그인'}
        </button>
        <Routes>
          <Route path="/" element={<PostList isLoggedIn={isLoggedIn} />} />
          <Route path="/post/:postId" element={<PostDetail isLoggedIn={isLoggedIn} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
