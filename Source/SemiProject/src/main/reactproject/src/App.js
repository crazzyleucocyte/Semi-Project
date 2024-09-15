import React, { useState } from 'react';
import {Route, Routes, Link, useLocation } from 'react-router-dom';
import Login from './pages/member/Login';
import Register from './pages/member/Register';
import Profile from './pages/member/Profile'; // 프로필 컴포넌트 불러오기
import PasswordChange from './pages/member/PasswordChange'; // 비밀번호 변경 컴포넌트 불러오기
import LikesHistory from './pages/member/LikesHistory'; // 좋아요 내역 컴포넌트 불러오기
import ReviewHistory from './pages/member/ReviewHistory'; // 후기 내역 컴포넌트 불러오기
import AccountSettings from './pages/member/AccountSettings'; // 계정 설정 컴포넌트 불러오기
import PasswordCheck from './pages/member/PasswordCheck';
import Main from './pages/Main';
import "bootstrap/dist/css/bootstrap.min.css";
import IntroPage from './pages/IntroPage';
import Boards from './pages/boards/Boards';
import Header from './components/Header';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [reviews, setReviews] = useState({}); // 리뷰 상태 추가

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  // 리뷰 추가 함수
  const handleAddReview = (postId, newReview) => {
    setReviews(prevReviews => ({
      ...prevReviews,
      [postId]: [...(prevReviews[postId] || []), newReview]
    }));
  };
  const location = useLocation();
  const hideHeader = location.pathname === '/' || location.pathname === '/register';
  return (
    <>
    
      <div>
    {!hideHeader && <Header />}
        
      <Boards isLoggedIn={isLoggedIn} handleAddReview={handleAddReview} reviews={reviews}/>
        <Routes>


          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn}/>} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/password-change" element={<PasswordChange />} />
        <Route path="/likes-history" element={<LikesHistory />} />
        <Route path="/review-history" element={<ReviewHistory />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/password-check" element={<PasswordCheck />} />
        
          <Route path="/main" element={ <Main /> } />

          
          <Route path="/intro" element={<IntroPage />} />
        </Routes>
      </div>
      <button onClick={toggleLogin}>
      {isLoggedIn ? '로그아웃' : '로그인'}
      </button>
    </>
  );
}

export default App;