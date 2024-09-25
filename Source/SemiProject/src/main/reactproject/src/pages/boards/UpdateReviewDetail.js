import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../assets/PostReviewDetail.css';
import axios from 'axios';

function UpdateReviewDetail({ onAddReview }) {
  const { id, category } = useParams();
  const [review, setReview] = useState({
    rid: '',
    no: 0,
    content: '',
    createDate: ''
  })
  const handlesetReview = (newReview) => {
    setReview(prevReview => ({
      ...prevReview,
      ...newReview
    }));
  };
  const handleChange = (e) => {
    setReview({ ...review, content: e.target.value });

  };
  const navigate = useNavigate();
  const rid = localStorage.getItem('username');

  useEffect(() => {
    axios.get(`/review/get/${id}/${rid}`)
      .then((response) => {
        console.log(response.data)

        setReview(response.data)
      })
      .catch((error) => {
        console.log(error)
        // alert(error);
      })
  }, [])

  useEffect(() => {
    console.log(review.content)
  }, [review.content])

  const handleSubmit = (e) => {
    // e.preventDefault();

    const newReview = {
      rid: '',
      no: 0,
      content: '',
      createDate: ''
    };
    axios.put('/review/post', review)
      .then((response) => {
        console.log(response.data)
        alert('후기 수정에 성공했습니다')
      })
      .catch((error) => {
        alert(error);
      })

    // 사진 처리 후 navigate로 페이지 이동
    navigate(`/${category}/${id}`);
  };
  const reviewOBJ = {
    rid: rid,
    no: id
  }
  function handleDelete(){
    console.log('reviewOBJ : ', reviewOBJ)
    axios.delete(`/review/delete/${id}/${rid}`)
         .then((response)=>{
          console.log(response.data)
          alert('리뷰를 성공적으로 삭제했습니다.')
          navigate('/review-history')
         })
         .catch((error)=>{
          console.log(error)
          alert('삭제하는 과정에서 에러가 발생했습니다')
         })
  }

  return (
    <>
    <br/><br/>
      <div className="review-detailDiv">
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

        <div className="back-to-listDiv">
          <button onClick={() => { handleSubmit() }} className="review-detail">후기 제출</button>
          &emsp;
          <button onClick={() => { handleDelete() }} className="review-detail-delete">후기 삭제</button>
          &emsp;
          <button onClick={() => navigate(`/${category}/${id}/`)} className="back-to-list">목록으로 가기</button>
        </div>
      </div>
    </>
  );
}

export default UpdateReviewDetail;
