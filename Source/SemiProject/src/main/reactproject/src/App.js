import React, { useState } from 'react';
import {Route, Routes, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile'; // 프로필 컴포넌트 불러오기
import PasswordChange from './pages/PasswordChange'; // 비밀번호 변경 컴포넌트 불러오기
import LikesHistory from './pages/LikesHistory'; // 좋아요 내역 컴포넌트 불러오기
import ReviewHistory from './pages/ReviewHistory'; // 후기 내역 컴포넌트 불러오기
import AccountSettings from './pages/AccountSettings'; // 계정 설정 컴포넌트 불러오기
import PasswordCheck from './pages/PasswordCheck';
import PostWalkList from './pages/PostWalkList';
import PostCultureList from './pages/PostCultureList';
import PostWalkDetail from './pages/PostWalkDetail';
import PostCultureDetail from './pages/PostCultureDetail'; // PostCultureDetail import 추가
import PostReviewDetail from './pages/PostReviewDetail';
import Main from './components/Main';
import "bootstrap/dist/css/bootstrap.min.css";
import IntroPage from './pages/IntroPage';


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
  return (
    <>
      <div>
        <nav>
          <button onClick={toggleLogin}>
            {isLoggedIn ? '로그아웃' : '로그인'}
          </button>
          <Link to="/walk">산책 경로 목록</Link>&emsp;
          <Link to="/culture">문화 경로 목록</Link>&emsp;
          <Link to="/intro">소개</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Login />} /> 
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/password-change" element={<PasswordChange />} />
        <Route path="/likes-history" element={<LikesHistory />} />
        <Route path="/review-history" element={<ReviewHistory />} />
        <Route path="/account-settings" element={<AccountSettings />} />
        <Route path="/password-check" element={<PasswordCheck />} />
        
          <Route path="/main" element={ <Main /> } />
          <Route path="/walk" element={<PostWalkList isLoggedIn={isLoggedIn} />} />
          <Route path="/walk/:id" element={<PostWalkDetail onAddReview={handleAddReview} isLoggedIn={isLoggedIn} reviews={reviews} />} />
          <Route path="/culture" element={<PostCultureList isLoggedIn={isLoggedIn} />} />
          <Route path="/culture/:id" element={<PostCultureDetail isLoggedIn={isLoggedIn} />} />
          <Route
            path="/review/:id/:category"
            element={<PostReviewDetail onAddReview={handleAddReview} />}
          />
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