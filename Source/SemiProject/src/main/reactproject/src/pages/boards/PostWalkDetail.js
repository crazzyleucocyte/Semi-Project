import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../assets/PostWalkDetail.css';
import axios from 'axios';
import Kakao from '../../data/Kakao';
import { useDispatch } from 'react-redux';
import { setCityInfo } from '../../hooks/store';

const initialReviews = [
  {
    no: 0,
    content: "",
    createDate: "",
    rid: ""
  }
];
function PostWalkDetail({ likes, onLike }) {
  const { id } = useParams();
  const [walkingTrails, setWalkingTrails] = useState([]);
  const [reviews, setReviews] = useState(initialReviews); // 후기 목록 상태 추가
  const [isLiked, setIsLiked] = useState(false);
  const [isLikeClick, setIsLikeClick] = useState(false)

  const userId = localStorage.getItem('username');
  let isLoggedIn = localStorage.getItem('username') === null;
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async () => {
      try {
        // 첫 번째 axios 호출 (게시글 데이터 가져오기)
        const walkingResponse = await axios.get('/walking/' + id);
        console.log(walkingResponse.data);
        setWalkingTrails(walkingResponse.data);

        // walkingTrails 데이터가 설정된 후에야 두 번째 axios 호출이 가능
        if (walkingResponse.data && walkingResponse.data.wid) {
          console.log('userId : ', userId);
          console.log('walkingTrails.wid : ', walkingResponse.data.wid);

          // 두 번째 axios 호출 (좋아요 상태 확인)
          const likeResponse = await axios.post(`/like/status`, {
            lId: userId,
            no: walkingResponse.data.wid,
          });
          console.log('좋아요 상태:', likeResponse.data)
          setIsLiked(likeResponse.data);
        }
      } catch (error) {
        console.error('오류 발생:', error);
      }
    };

    fetchData();
  }, [isLikeClick]);

  //리뷰 리스트를 가져옴
  useEffect(() => {
    axios.get(`/review/getList/${id}`)
      .then((response) => {
        console.log(response.data)
        setReviews([...response.data])
      })
      .catch((error) => {
        console.log(error)
        alert(error)
      })
  }, [])

  const handleLike = async () => {
    if (isLoggedIn) {
      alert('로그인이 필요한 기능입니다.');
      return;
    }

    try {
      const postId = walkingTrails.wid;
      const response = await axios.post(`/like/toggle`, {
        lId: userId,
        no: postId
      });
      setIsLikeClick(!isLikeClick)
    } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', error);
    }
  };

  const setWeatherInfo = () => {
    dispatch(setCityInfo({
      la: walkingTrails.lcLattd,
      lo: walkingTrails.lcLongt,
      ctprvnNm: walkingTrails.ctprvnNm,
      signguNm: walkingTrails.signguNm
    }))
  }

  const getLevelStars = (level) => {
    switch (level) {
      case '매우쉬움':
        return '⭐';
      case '쉬움':
        return '⭐⭐';
      case '보통':
        return '⭐⭐⭐';
      case '어려움':
        return '⭐⭐⭐⭐';
      case '매우어려움':
        return '⭐⭐⭐⭐⭐';
      default:
        return '?';
    }
  };

  return (
    <div className="post-detail">
      <br/><br/>
      <div className='detail-div'>
      <span className='mainTitle'><h1>{walkingTrails.wlktrlName}</h1></span>
        <button onClick={() => handleLike()} className='button-detail'>
          {isLiked ? '❤️' : '🤍'} {walkingTrails.likeCount}
        </button>&emsp;
        <button className='button-detail' onClick={() => {
          setWeatherInfo();
          navigate("/weather")
        }}>날씨 확인</button>
      </div>

      <table className='table-detail'>
        <tbody>
          <tr>
            <th>시군구명</th>
            <td>{walkingTrails.signguNm}</td>
            <th>지번주소</th>
            <td>{walkingTrails.lnmAddress}</td>
          </tr>
          <tr>
            <th>경로레벨</th>
            <td title='{walkingTrails.coursLvNm}'>
              {getLevelStars(walkingTrails.coursLvNm)}
            </td>
            <th>경로길이</th>
            <td>{walkingTrails.coursContent}</td>
          </tr>
          <tr>
            <th>경로시간</th>
            <td>{walkingTrails.coursTmContent}</td>
            <th></th>
            <td></td>
          </tr>
        </tbody>
      </table>

      <table className='table-detail'>

        <tbody>
          <tr>
            <th>옵션설명</th>
            <td>{walkingTrails.optnDescript}</td>
          </tr>
          <tr>
            <th>화장실 설명</th>
            <td>{walkingTrails.toiletDescript}</td>
          </tr>
          <tr>
            <th>편의시설명</th>
            <td>{walkingTrails.cnvnDescript}</td>
          </tr>
        </tbody>
      </table>

      <table className='table-detail'>
        <tbody>
          <tr className="bold-text">
            <td colSpan='3'>경로설명</td>
          </tr>
          <tr>
            <td colSpan='3'>{walkingTrails.coursDescript}</td>
          </tr>
          <tr className="bold-text">
            <td colSpan='3'>추가설명</td>
          </tr>
          <tr>
            <td colSpan='3'>{walkingTrails.aditDescript}</td>
          </tr>
        </tbody>
      </table>

      <div className='detail-div2'>
        <Kakao
          latitude={parseFloat(walkingTrails.lcLattd)}
          longitude={parseFloat(walkingTrails.lcLongt)}
          locationName={walkingTrails.wlktrlName}
        />
      </div>

      {/* 후기 표시 부분 */}
      <span className='mainTitle'><h1>후기</h1></span>
      <table className="table-detail-review">
        <tbody>
          {reviews.map((review) => (
            <tr key={review.rid}>
              <td>{review.rid}</td>
              <td>{review.content}</td>
              <td>{review.createDate.substring(0, 10)}</td>
              <td>{review.rid === localStorage.getItem('username') && <button className="button-detail" onClick={() => { navigate(`/review/update/${walkingTrails.wid}/walk`) }}>수정</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {!isLoggedIn && (
        <div className='div-detail'>
          <button onClick={() => navigate(`/review/${walkingTrails.wid}/walk`)} className="button-detail">후기 작성</button>
        </div>
      )}
      {/* 목록으로 가기 버튼 */}
      <div className="div-detail">
        <button onClick={() => navigate('/walk')} className='button-detail'>목록 가기</button>
      </div>

    </div>
  );
}

export default PostWalkDetail;