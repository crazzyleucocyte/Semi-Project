
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../assets/PostWalkDetail.css';


// 예시 데이터 (임시)
const initialPostsData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  pathType: `산책경로 ${i + 1}`,
  district: `시군구 ${i + 1}`,
  level: `레벨 ${i + 1}`,
  time: `${30 + i}분`,
  length: `${3 + i}km`,
  address: `지번주소 ${i + 1}`,
  description: `경로설명 ${i + 1}`,
  photo: `사진 ${i + 1}`,
  additionalInfo: `추가설명 ${i + 1}`,
  options: `옵션설명 ${i + 1}`,
  restroom: `화장실설명 ${i + 1}`,
  facilities: `편의시설 ${i + 1}`,
  likes: i,
  createdAt: `2024-09-01`, // 예시 생성일
  updatedAt: `2024-09-01`, // 예시 수정일
  views: 0, // 초기 조회수는 0
}));

const initialReviews = [
  {
    id: 1,
    content: '이 경로는 정말 아름답고 평화로워요!',
    createdAt: '2024-09-02',
  },
  {
    id: 2,
    content: '산책하기에 최적의 장소였습니다.',
    createdAt: '2024-09-03',
  },
];

function PostWalkDetail({ isLoggedIn, onAddReview }) {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [likedByUser, setLikedByUser] = useState(false);
  const [views, setViews] = useState(0);
  const [reviews, setReviews] = useState(initialReviews); // 후기 목록 상태 추가
  
  const navigate = useNavigate();
  
  // <Routes>

  //   <Route
  //   path="/review/:id"
  //   element={<PostReviewDetail onAddReview={onAddReview} />}
  //   />
  // </Routes>

  useEffect(() => {
    // 데이터 초기화
    const postId = parseInt(id, 10);
    const foundPost = initialPostsData.find((p) => p.id === postId);

    if (foundPost) {
      const storedViews = localStorage.getItem(`post-${id}-views`);
      const initialViews = storedViews ? parseInt(storedViews, 10) : foundPost.views;

      setPost(foundPost);
      setLikes(foundPost.likes);
      setLikedByUser(foundPost.likedByUser || false);
      setViews(initialViews);

      if (!storedViews) {
        localStorage.setItem(`post-${id}-views`, initialViews + 1);
        setViews(initialViews + 1);
      }
    } else {
      setPost(null); // 게시글이 없는 경우
    }
  }, [id]);

  const handleLike = () => {
    if (isLoggedIn) {
      if (likedByUser) {
        setLikes(likes - 1);
      } else {
        setLikes(likes + 1);
      }
      setLikedByUser(!likedByUser);
    } else {
      alert('로그인 후 좋아요를 누를 수 있습니다.');
    }
  };

  const handleAddReview = (newReview) => {
    setReviews([...reviews, newReview]);
  };


  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="post-detail">
      <h1>{post.pathType}</h1>

      <table className="detail-table">
        <tbody>
          <tr>
            <td colSpan='3'>{post.photo}</td>
          </tr>
        </tbody>
      </table>
      <table className="detail-table">
        <tbody>
          <tr className="bold-text">
            <td>산책경로구분명</td>
            <td>좋아요</td>
            <td>조회수</td>
          </tr>
          <tr>
            <td>{post.pathType}</td>
            <td>
              <button onClick={handleLike}>
                {likedByUser ? '좋아요 취소' : '좋아요'} {likes}
              </button>
            </td>
            <td>{views}</td>
          </tr>
        </tbody>
      </table>

      <table className="detail-table">
        <tbody>
          <tr className="bold-text">
            <td>시군구명</td>
            <td>지번주소</td>
            <td>날씨 확인</td>
          </tr>
          <tr>
            <td>{post.district}</td>
              <td>{post.address}</td>
              <td>
                <button>날씨 확인</button>
              </td>
          </tr>
          <tr className="bold-text">
            <td>경로레벨명</td>
            <td>경로시간</td>
            <td>경로길이</td>
          </tr>
          <tr>
            <td>{post.level}</td>
            <td>{post.time}</td>
            <td>{post.length}</td>
          </tr>
          <tr className="bold-text">
            <td colSpan='3'>경로설명</td>
          </tr>
          <tr>
            <td colSpan='3'>{post.description}</td>
          </tr>
          <tr className="bold-text">
            <td colSpan='3'>추가설명</td>
          </tr>
          <tr>
            <td colSpan='3'>{post.additionalInfo}</td>
          </tr>
        </tbody>
      </table>

      <table className="detail-table2">
        
          <tr>
            <th className="bold-text">옵션설명</th>
            <td>{post.options}</td>
          </tr>
          <tr>
            <th className="bold-text">화장실 설명</th>
            <td>{post.restroom}</td>
          </tr>
          <tr>
            <th className="bold-text" >편의시설명</th>
            <td>{post.facilities}</td>
          </tr>
        
      </table>

      <table className="detail-table">
        <tbody>
          <tr className="bold-text">
            <td colSpan='3'>지도</td>
          </tr>
          <tr>
            <td colSpan='3'>{post.photo}</td>
          </tr>
          <tr className="bold-text">
            <td>생성일</td>
            <td>최종수정날짜</td>
          </tr>
          <tr>
            <td>{post.createdAt}</td>
            <td>{post.updatedAt}</td>
            
          </tr>
        </tbody>
      </table>

      {/* 후기 표시 부분 */}
      <h1>후기</h1>
      <table className="review-table">
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td>{review.content}</td>
              <td>{review.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 후기 작성 버튼 */}
      <div className="back-to-list">
        <button onClick={() => navigate(`/review/${post.id}/walk`)}>후기 작성</button>
      </div>
      
      {/* 목록으로 가기 버튼 */}
      <div className="back-to-list">
        <button onClick={() => navigate('/walk')}>목록 가기</button>
      </div>
    </div>
  );
}

export default PostWalkDetail;