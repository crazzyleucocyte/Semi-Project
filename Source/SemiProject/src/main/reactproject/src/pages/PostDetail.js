
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PostDetail.css';

// 예시 데이터
const postsData = Array.from({ length: 50 }, (_, i) => ({
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
  createdAt: '2024-01-01', // 예시 생성일
  updatedAt: '2024-01-02', // 예시 최종 수정일
  views: 0, // 조회수 초기화
}));

function PostDetail({ isLoggedIn }) {
  const { postId } = useParams();
  const navigate = useNavigate();
  const postIndex = postsData.findIndex(p => p.id === parseInt(postId));
  const [post, setPost] = useState(postsData[postIndex]);
  const [likes, setLikes] = useState(post.likes);
  const [likedByUser, setLikedByUser] = useState(false);

  useEffect(() => {
    // 조회수 증가
    const updatedPost = { ...post, views: post.views + 1 };
    postsData[postIndex] = updatedPost;
    setPost(updatedPost);
  }, [postId]);

  const handleLike = () => {
    if (likedByUser) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLikedByUser(!likedByUser);
  };


  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="post-detail">
      <h1>{post.pathType}</h1>
      <table className="detail-table">
        <tbody>
          {/* 글번호, 산책경로구분명, 시군구명 */}
          <tr>
            <td>글번호</td>
            <td>산책경로구분명</td>
            <td>시군구명</td>
          </tr>
          <tr>
            <td>{post.id}</td>
            <td>{post.pathType}</td>
            <td>{post.district}</td>
          </tr>

          {/* 경로레벨명, 경로시간, 경로길이 */}
          <tr>
            <td>경로레벨명</td>
            <td>경로시간</td>
            <td>경로길이</td>
          </tr>
          <tr>
            <td>{post.level}</td>
            <td>{post.time}</td>
            <td>{post.length}</td>
          </tr>

          {/* 지번주소, 날씨 확인, 좋아요 */}
          <tr>
            <td>지번주소</td>
            <td>날씨 확인</td>
            <td>좋아요</td>
          </tr>
          <tr>
            <td>{post.address}</td>
            <td>
              <button>날씨 확인</button>
            </td>
            <td>
              {isLoggedIn ? (
                <button onClick={handleLike}>
                  {likedByUser ? '좋아요 취소' : '좋아요'} {likes}
                </button>
              ) : (
                <button disabled>
                  좋아요 {likes} (로그인 필요)
                </button>
              )}
            </td>
          </tr>

          {/* 생성일, 최종수정날짜, 조회수 */}
          <tr>
            <td>생성일</td>
            <td>최종수정날짜</td>
            <td>조회수</td>
          </tr>
          <tr>
            <td>{post.createdAt}</td>
            <td>{post.updatedAt}</td>
            <td>{post.views}</td>
          </tr>

          {/* 경로설명 */}
          <tr>
            <td colSpan="3">경로설명</td>
          </tr>
          <tr>
            <td colSpan="3">{post.description}</td>
          </tr>

          {/* 사진 */}
          <tr>
            <td colSpan="3">사진</td>
          </tr>
          <tr>
            <td colSpan="3">{post.photo}</td>
          </tr>

          {/* 추가설명 */}
          <tr>
            <td colSpan="3">추가설명</td>
          </tr>
          <tr>
            <td colSpan="3">{post.additionalInfo}</td>
          </tr>

          {/* 옵션설명, 화장실 설명, 편의시설명 */}
          <tr>
            <td>옵션설명</td>
            <td colSpan="2">{post.options}</td>
          </tr>
          <tr>
            <td>화장실 설명</td>
            <td colSpan="2">{post.restroom}</td>
          </tr>
          <tr>
            <td>편의시설명</td>
            <td colSpan="2">{post.facilities}</td>
          </tr>
        </tbody>
      </table>

      {/* 목록으로 가기 버튼 */}
      <div className="back-to-list">
        <button onClick={() => navigate('/')}>목록으로 가기</button>
      </div>
    </div>
  );
}

export default PostDetail;
