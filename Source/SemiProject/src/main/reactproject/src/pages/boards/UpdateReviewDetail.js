import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../assets/PostReviewDetail.css';
import axios from 'axios';

function UpdateReviewDetail({ onAddReview }) {
  const { id, category } = useParams();
  const [review, setReview] = useState({
    rid:'',
    no : 0,
    content : '',
    createDate : ''
  })  
  const handlesetReview = (newReview) => {
    setReview(prevReview=> ({
      ...prevReview,
     ...newReview
    }));
  };
  const handleChange = (e) => {
    setReview({ ...review, content: e.target.value });
    
  };
  const navigate = useNavigate();
  const rid = localStorage.getItem('username');

  useEffect(()=>{
    axios.get(`/review/get/${id}/${rid}`)
         .then((response)=>{
          console.log(response.data)

          setReview(response.data)
         })
         .catch((error)=>{
          console.log(error)
          // alert(error);
         })
  },[])

 useEffect(()=>{
  console.log(review.content)
},[review.content])

  const handleSubmit = (e) => {
    // e.preventDefault();

    const newReview = {
      rid:'',
      no : 0,
      content : '',
      createDate : ''
    };
    axios.put('/review/post',review)
         .then((response)=>{
          console.log(response.data)
          alert('후기 수정에 성공했습니다')
         })
         .catch((error)=>{
          alert(error);
         })

    // 사진 처리 후 navigate로 페이지 이동
    navigate(`/${category}/${id}`);
  };

  return (
    <div className="review-detail">
      <h1>후기 수정</h1>
      {/* <form onSubmit={handleSubmit}> */}
        <label htmlFor="content">후기 내용</label>
        <textarea
          id="content"
          name="content"
          value={review.content}
          onChange={(e) => handleChange(e)}
          required
        ></textarea>

        {/* 사진 첨부 입력 필드 */}
       
        <button onClick={()=>{handleSubmit()}} >후기 제출</button>
      {/* </form> */}

      <div className="back-to-list">
        <button onClick={() => navigate(`/${category}/${id}/`)}>목록으로 가기</button>
      </div>
    </div>
  );
}

export default UpdateReviewDetail;
