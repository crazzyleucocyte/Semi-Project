import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../../assets/PostCultureDetail.css';
import axios from 'axios';
import Kakao from '../../data/Kakao';
import { useDispatch } from 'react-redux';
import { setCityInfo } from '../../hooks/store';

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

function PostCultureDetail({ isLoggedIn, likes, onLike }) {
  const { id } = useParams();
  const [culture, setCulture] = useState([]);
  const [reviews, setReviews] = useState(initialReviews); // 후기 목록 상태 추가
  const dispatch =useDispatch()

  const userId = localStorage.getItem('username');
  const [like, setLike] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  // const [likes, setLikes] = useState(0);
  const [likeCount, setLikeCount] = useState(0);


  useEffect(() => {
    console.log(like);
    axios.get('/culture/' + id)
    .then(response => {
      console.log(response.data);
      setCulture(response.data);
    })
    .catch(error => {
      console.error('Error fetching culture data: ', error);
    });
  }, [like]);

  // const [post, setPost] = useState(null);
  // const [likedByUser, setLikedByUser] = useState(false);
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

  // if (!post) {
  //   return <div>게시글을 찾을 수 없습니다.</div>;
  // }
  const setWeatherInfo=()=>{
    dispatch(setCityInfo({
      la : culture.lcLattd,
      lo : culture.lcLongt,
      ctprvnNm : culture.ctprvnName,
      signguNm : culture.signguName
    }))
  }

  const handleLike = async () => {
    try {
      const postId = culture.cid;
      const response = await axios.post(`/api/like`,{
        lId:userId,
        no:postId
      });
      console.log(response.data);
      
      // const newLikeStatus = !isLiked;
      // setIsLiked(newLikeStatus);
      // setLike(!like)
      // const newLikeStatus = !likes;
      console.log(response.data);
      // onLike(postId, newLikeStatus);
      console.log(response.data);
      // setLike(newLikeStatus);
      setLike(!like)
      console.log(response.data);
    } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', error);
    }
  };

  return (
    <div className="post-detail">

      <div className='detail-div'>
        <h1 className='h1-list'>{culture.fcltyName}</h1>
        <button onClick={()=>handleLike()} className='button-detail'>
                {isLiked ? '❤️' : '🤍'} {culture.likeCount}
        </button>&emsp;
        <button className='button-detail' onClick={()=>{
          setWeatherInfo();
          navigate("/weather")}}>날씨 확인</button>
      </div>

      <div className='detail-div2'>
        사진 넣는 칸
        <img src='' />
      </div>
      
      <table className='table-detail'>
        {/* <colgroup>
          <col width={15} />
          <col width={35} />
          <col width={15} />
          <col width={35} />
        </colgroup> */}

        <tbody>
          <tr>
            <th>펫 라이프 케어</th>
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
            <th>이용가격</th>
            <td>{culture.utilPriceCN}</td>
            <th></th>
            <td></td>
          </tr>
          <tr>
            <th>입장가능반려동물크기</th>
            <td>{culture.entrnPetSize}</td>
            <th>반려동물동반추가요금</th>
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

      <table className='table-detail'>
        <colgroup>
          <col width={25} />
          <col width={75} />
        </colgroup>
        <tbody>
          <tr>
            <th>운영시간</th>
            <td>{culture.operTime}</td>
          </tr>
          <tr>
            <th>휴무일안내</th>
            <td>{culture.rstdeContent}</td>
          </tr>
          <tr>
            <th>홈페이지</th>
            <td><Link className='hmpUrl' to={culture.hmpgUrl}>{culture.hmpgUrl}</Link></td>
          </tr>
          <tr>
            <th>반려동물정보</th>
            <td>{culture.petInfoCn}</td>
          </tr>
          <tr>
            <th>반려동물제한사항</th>
            <td>{culture.petCondition}</td>
          </tr>
          <tr>
            <th>시설정보설명</th>
            <td>{culture.fcltyInfo}</td>
          </tr>
        </tbody>
      </table>

      <div className='detail-div2'>
        <Kakao 
          latitude={parseFloat(culture.lcLattd)} 
          longitude={parseFloat(culture.lcLongt)}
          locationName={culture.wlktrlName}
        />
      </div>

      {/* 후기 표시 부분 */}
      <h1 className='h1-list'>후기</h1>
      <table className="table-detail">
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td>{review.content}</td>
              <td>{review.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="div-detail">
        <button onClick={() => navigate(`/review/${culture.cid}/culture`)} className='button-detail'>후기 작성</button>
      </div>

      {/* 목록으로 가기 버튼 */}
      <div className="div-detail">
        <button onClick={() => navigate('/culture')} className='button-detail'>목록 가기</button>
      </div>
    </div>
  );
}

export default PostCultureDetail;