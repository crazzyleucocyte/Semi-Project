import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../assets/PostCultureDetail.css';
import axios from 'axios';

// const initialPostsData = Array.from({ length: 50 }, (_, i) => ({
//   id: i + 1,
//   pathType: `문화경로 ${i + 1}`,
//   district: `시군구 ${i + 1}`,
//   level: `레벨 ${i + 1}`,
//   time: `${30 + i}분`,
//   length: `${3 + i}km`,
//   address: `지번주소 ${i + 1}`,
//   description: `경로설명 ${i + 1}`,
//   photo: `사진 ${i + 1}`,
//   additionalInfo: `추가설명 ${i + 1}`,
//   options: `옵션설명 ${i + 1}`,
//   restroom: `화장실설명 ${i + 1}`,
//   facilities: `편의시설 ${i + 1}`,
//   likes: i,
//   createdAt: `2024-09-01`, // 예시 생성일
//   updatedAt: `2024-09-01`, // 예시 수정일
// }));

function PostCultureDetail({ isLoggedIn }) {
  const { id } = useParams();
  const [culture, setCulture] = useState([]);

  useEffect(() => {
    axios.get('/culture/' + id, {

    })
    .then(response => {
      console.log(response.data);
      setCulture(response.data);
    })
    .catch(error => {
      console.error('Error fetching culture data: ', error);
    });
  }, []);

  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState(0);
  const [likedByUser, setLikedByUser] = useState(false);
  const navigate = useNavigate();

  // useEffect(() => {
  //   // 데이터 초기화
  //   const postId = parseInt(id, 10);
  //   const foundPost = initialPostsData.find((p) => p.id === postId);

  //   if (foundPost) {
  //     // 상태 업데이트
  //     setPost(foundPost);
  //     setLikes(foundPost.likes);
  //     setLikedByUser(foundPost.likedByUser || false);
  //   } else {
  //     setPost(null); // 게시글이 없는 경우
  //   }
  // }, [id]);

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

  // if (!post) {
  //   return <div>게시글을 찾을 수 없습니다.</div>;
  // }

  return (
    <div className="post-detail">

      <div className='detail-div'>
        <h1>{culture.fcltyName}</h1>
        <button onClick={handleLike}>
                {likedByUser ? '좋아요 취소' : '좋아요'} {likes}
        </button>&emsp;
        <button>날씨 확인</button>
      </div>

      <div className='detail-div2'>
        사진 넣는 칸
      </div>
      
      <table>
        {/* <colgroup>
          <col width={15} />
          <col width={35} />
          <col width={15} />
          <col width={35} />
        </colgroup> */}

        <tbody>
          <tr>
            <th>카테고리</th>
            <td>{culture.ctgryTwo}</td>
            <th>반려동물가능여부</th>
            <td>{culture.petYn}</td>
          </tr>
          <tr>
            <th>지번주소</th>
            <td>{culture.lnmAddress}</td>
            <th>도로명주소</th>
            <td>{culture.rdnmadrName}</td>
          </tr>
          
          <tr>
            <th>전화번호</th>
            <td>{culture.telNumber}</td>
            <th>주차가능여부</th>
            <td>{culture.parkingYn}</td>
          </tr>
          <tr>
            <th>이용가격내용</th>
            <td>{culture.utilPriceCN}</td>
          </tr>
          <tr>
            <th>입장가능반려동물크기값</th>
            <td>{culture.entrnPetSize}</td>
            <th>반려동물동반추가요금값</th>
            <td>{culture.petAditExtracharge}</td>
          </tr>
          <tr>
            <th>내부장소동반가능여부</th>
            <td>{culture.insdEntrnYn}</td>
            <th>외부장소동반가능여부</th>
            <td>{culture.outsdEntrnYn}</td>
          </tr>
        </tbody>
      </table>

      <table>
        <colgroup>
          <col width={15} />
          <col width={85} />
        </colgroup>
        <tbody>
          <tr>
            <th>운영시간</th>
            <td>{culture.operTime}</td>
          </tr>
          <tr>
            <th>휴무일안내내용</th>
            <td>{culture.rstdeContent}</td>
          </tr>
          <tr>
            <th>홈페이지</th>
            <td>{culture.hmpgUrl}</td>
          </tr>
          <tr>
            <th>반려동물정보내용</th>
            <td>{culture.petInfoCn}</td>
          </tr>
          <tr>
            <th>반려동물제한사항내용</th>
            <td>{culture.petCondition}</td>
          </tr>
          <tr>
            <th>시설정보설명</th>
            <td>{culture.fcltyInfo}</td>
          </tr>
        </tbody>
      </table>

      <div className='detail-div2'>
        지도 넣는 칸
      </div>

      

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
        <button onClick={() => navigate(`/review/${culture.cid}/culture`)}>후기 작성</button>
      </div>

      {/* 목록으로 가기 버튼 */}
      <div className="back-to-list">
        <button onClick={() => navigate('/culture')}>목록 가기</button>
      </div>
    </div>
  );
}

export default PostCultureDetail;