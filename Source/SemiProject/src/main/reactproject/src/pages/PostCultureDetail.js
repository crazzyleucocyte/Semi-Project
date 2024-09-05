import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../assets/PostWalkDetail.css';

const initialPostsData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  pathType: `문화경로 ${i + 1}`,
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
}));

function PostCultureDetail({ isLoggedIn }) {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [likedByUser, setLikedByUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // 데이터 초기화
    const postId = parseInt(id, 10);
    const foundPost = initialPostsData.find((p) => p.id === postId);

    if (foundPost) {
      // 상태 업데이트
      setPost(foundPost);
      setLikes(foundPost.likes);
      setLikedByUser(foundPost.likedByUser || false);
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

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="post-detail">
      <h1>{post.pathType}</h1>
      <table className="detail-table">
        <tbody>
          <tr>
            <td>글번호</td>
            <td>카테고리1</td>
            <td>카테고리2</td>
          </tr>
          <tr>
            <td>{post.id}</td>
            <td>{post.pathType}</td>
            <td>{post.district}</td>
          </tr>
          <tr>
            <td colSpan="3">시설명</td>
          </tr>
          <tr>
            <td colSpan="3"></td>
          </tr>
          <tr>
            <td>지번주소</td>
            <td colSpan="2">{post.address}</td>
          </tr>
          <tr>
            <td>도로명주소</td>
            <td colSpan="2">{post.address}</td>
          </tr>
          <tr>
            <td>운영시간</td>
            <td>휴무일안내내용</td>
            <td>전화번호</td>
          </tr>
          <tr>
            <td>{post.level}</td>
            <td>{post.time}</td>
            <td>{post.length}</td>
          </tr>
          <tr>
            <td>주차가능여부</td>
            <td>이용가격내용</td>
            <td>날씨</td>
          </tr>
          <tr>
            <td>{post.level}</td>
            <td>{post.time}</td>
            <td>
              <button>날씨보기</button>
            </td>
          </tr>
          <tr>
            <td colSpan="3">홈페이지url</td>
          </tr>
          <tr>
            <td colSpan="3"></td>
          </tr>
          <tr>
            <td>반려동물가능여부</td>
            <td>반려동물정보내용</td>
            <td>입장가능반려동물크기값</td>
          </tr>
          <tr>
            <td>{post.level}</td>
            <td>{post.time}</td>
            <td>{post.length}</td>
          </tr>
          <tr>
            <td colSpan="3">반려동물제한사항내용</td>
          </tr>
          <tr>
            <td colSpan="3"></td>
          </tr>
          <tr>
            <td>내부장소동반가능여부</td>
            <td>외부장소동반가능여부</td>
            <td>반려동물동반추가요금값</td>
          </tr>
          <tr>
            <td>{post.level}</td>
            <td>{post.time}</td>
            <td>{post.length}</td>
          </tr>
          <tr>
            <td>생성날짜</td>
            <td>최종수정일자</td>
            <td>좋아요</td>
          </tr>
          <tr>
            <td>{post.createdAt}</td>
            <td>{post.updatedAt}</td>
            <td>
              <button onClick={handleLike}>
                  {likedByUser ? '좋아요 취소' : '좋아요'} {likes}
              </button>
            </td>
          </tr>
          <tr>
            <td colSpan="3">시설정보설명</td>
          </tr>
          <tr>
            <td colSpan="3">{post.description}</td>
          </tr>
          <tr>
            <td colSpan="3">사진</td>
          </tr>
          <tr>
            <td colSpan="3">{post.photo}</td>
          </tr>
          <tr>
            <td colSpan="3">지도</td>
          </tr>
          <tr>
            <td colSpan="3">지도 데이터가 필요합니다.</td>
          </tr>
        </tbody>
      </table>

      <h1>후기</h1>
      <table>
        <tbody>
          <tr>
            <td colSpan="3">사진첨부칸</td>
          </tr>
          <tr>
            <td colSpan="3">후기내용</td>
          </tr>
        </tbody>
      </table>

      <div className="back-to-list">
        <button onClick={() => navigate(`/review/${post.id}/culture`)}>후기 작성</button>
      </div>

      {/* 목록으로 가기 버튼 */}
      <div className="back-to-list">
        <button onClick={() => navigate('/culture')}>목록으로 가기</button>
      </div>
    </div>
  );
}

export default PostCultureDetail;