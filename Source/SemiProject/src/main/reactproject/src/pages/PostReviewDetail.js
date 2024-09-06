import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../assets/PostReviewDetail.css';

function PostReviewDetail({ onAddReview }) {
  const { id, category } = useParams();
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null); // 사진 파일 상태 추가
  const navigate = useNavigate();

  // 파일 선택 시 사진을 상태로 저장
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      id: Date.now(), // 유니크한 리뷰 ID
      content,
      image, // 이미지 파일도 함께 저장
      createdAt: new Date().toISOString().split('T')[0],
    };

    onAddReview(parseInt(id, 10), newReview); // 후기를 추가하는 함수 호출

    // 사진 처리 후 navigate로 페이지 이동
    navigate(`/${category}/${id}`);
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

        {/* 사진 첨부 입력 필드 */}
        <label htmlFor="image">사진 첨부</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange}
        />

        <button type="submit">후기 제출</button>
      </form>

      <div className="back-to-list">
        <button onClick={() => navigate(`/${category}/${id}/`)}>목록으로 가기</button>
      </div>
    </div>
  );
}

export default PostReviewDetail;
