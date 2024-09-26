import React, { useEffect,useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../assets/PostReviewDetail.css';
import axios from 'axios';

function PostReviewDetail({ onAddReview }) {
  const { id, category } = useParams();
  // const [walkingTrails, setWalkingTrails] = useState([]);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null); // 사진 파일 상태 추가
  const navigate = useNavigate();



  const handleSubmit = (e) => {
    // e.preventDefault();

    const newReview = {
      rid: localStorage.getItem('username'), // 유니크한 리뷰 ID
      no : id,
      content,
    };
    axios.post('/review/post',newReview)
         .then((response)=>{
          console.log(response.data)
          alert('후기 등록에 성공했습니다')
         })
         .catch((error)=>{
          alert(error);
         })

    // 사진 처리 후 navigate로 페이지 이동
    navigate(`/${category}/${id}`);
  };

  return (
    <>
    <br/><br/>
    <div className="review-detailDiv">
    <span className='mainTitle'><h1>후기 작성</h1></span>
        <label htmlFor="content">후기 내용</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          ></textarea>

       
      <div className="back-to-listDiv">
        <button onClick={()=>{handleSubmit()}} className="review-detail" >후기 제출</button>
        &emsp;
        <button onClick={() => navigate(`/${category}/${id}/`)} className="back-to-list">목록으로 가기</button>
      </div>
    </div>
  </>
  );
}

export default PostReviewDetail;
