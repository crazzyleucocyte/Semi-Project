import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PostWalkList from './pages/PostWalkList';
import PostCultureList from './pages/PostCultureList';
import PostWalkDetail from './pages/PostWalkDetail';
import PostCultureDetail from './pages/PostCultureDetail'; // PostCultureDetail import 추가
import PostReviewDetail from './pages/PostReviewDetail';

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
    <Router>
      <div>

        <nav>
          <button onClick={toggleLogin}>
            {isLoggedIn ? '로그아웃' : '로그인'}
          </button>
          <Link to="/walk">산책 경로 목록</Link>&emsp;
          <Link to="/culture">문화 경로 목록</Link>
        </nav>


        <Routes>
          <Route path="/walk" element={<PostWalkList isLoggedIn={isLoggedIn} />} />
          <Route path="/walk/:id" element={<PostWalkDetail isLoggedIn={isLoggedIn} reviews={reviews} />} />
          <Route path="/culture" element={<PostCultureList isLoggedIn={isLoggedIn} />} />
          <Route path="/culture/:id" element={<PostCultureDetail isLoggedIn={isLoggedIn} />} />
          <Route
            path="/review/:id"
            element={<PostReviewDetail onAddReview={handleAddReview} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
