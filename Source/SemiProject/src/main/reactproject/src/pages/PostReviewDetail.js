import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../assets/PostReviewDetail.css';

function PostReviewDetail({ onAddReview }) {
  const { id } = useParams();
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = {
      id: Date.now(), // 유니크한 리뷰 ID
      content,
      createdAt: new Date().toISOString().split('T')[0],
    };
    onAddReview(parseInt(id, 10), newReview); // 후기를 추가하는 함수 호출
    navigate(`/walk/${id}`); // 후기를 작성한 후 해당 페이지로 이동
  };

  return (
    <div className="review-detail">
      <h1>후기 작성</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="content">후기 내용</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>

        <button type="submit">후기 제출</button>
      </form>

      <div className="back-to-list">
        <button onClick={() => navigate(`/walk/${id}`)}>목록으로 가기</button>
      </div>
    </div>
  );
}

export default PostReviewDetail;
