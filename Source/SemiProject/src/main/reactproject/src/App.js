import React, { useState } from 'react';
import {Route, Routes } from 'react-router-dom';
import PostWalkList from './pages/PostWalkList';
import PostCultureList from './pages/PostCultureList';
import PostWalkDetail from './pages/PostWalkDetail';
import PostCultureDetail from './pages/PostCultureDetail'; // PostCultureDetail import 추가
import PostReviewDetail from './pages/PostReviewDetail';
import Main from './components/Main';
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
        <Routes>
          <Route path="/" element={ <Main /> } />
          <Route path="/walk" element={<PostWalkList isLoggedIn={isLoggedIn} />} />
          <Route path="/walk/:id" element={<PostWalkDetail isLoggedIn={isLoggedIn} reviews={reviews} />} />
          <Route path="/culture" element={<PostCultureList isLoggedIn={isLoggedIn} />} />
          <Route path="/culture/:id" element={<PostCultureDetail isLoggedIn={isLoggedIn} />} />
          <Route
            path="/review/:id"
            element={<PostReviewDetail onAddReview={handleAddReview} />}
          />
        </Routes>
      </div>
      <button onClick={toggleLogin}>
      {isLoggedIn ? '로그아웃' : '로그인'}
      </button>
    </>
  );
}

export default App;
