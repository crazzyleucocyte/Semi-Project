import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../../assets/PostCultureDetail.css';
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

function PostCultureDetail() {
  const { id } = useParams();
  const [culture, setCulture] = useState([]);
  const [reviews, setReviews] = useState(initialReviews); // 후기 목록 상태 추가
  const [isLiked, setIsLiked] = useState(false);
  const [isLikeClick,setIsLikeClick] = useState(false)
  
  const userId = localStorage.getItem('username');
  let isLoggedIn = localStorage.getItem('username') === null;
  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(() => {

    const fetchData = async () => {
      try {
        // 첫 번째 axios 호출 (게시글 데이터 가져오기)
        const cultureResponse = await axios.get('/culture/' + id);
        console.log(cultureResponse.data);
        setCulture(cultureResponse.data);
  
        // culture 데이터가 설정된 후에야 두 번째 axios 호출이 가능
        if (cultureResponse.data && cultureResponse.data.cid) {
          console.log('userId : ', userId);
          console.log('culture.cid : ', cultureResponse.data.cid);
  
          // 두 번째 axios 호출 (좋아요 상태 확인)
          const likeResponse = await axios.post(`/like/status`, {
            lId: userId,
            no: cultureResponse.data.cid,
          });
          console.log('좋아요 상태: ', likeResponse.data)
          setIsLiked(likeResponse.data);
        }
      } catch (error) {
        console.error('오류 발생:', error);
      }
    };

    fetchData();
  }, [isLikeClick]);

  useEffect(()=>{
    //리뷰 리스트를 가져옴
    axios.get(`/review/getList/${id}`)
      .then((response) => {
        console.log(response.data)
        setReviews([...response.data])
      })
      .catch((error) => {
        console.log(error)
        alert(error)
      })
  },[reviews])
  
  const handleLike = async () => {
    if (isLoggedIn) {
      alert('로그인이 필요한 기능입니다.');
      return;
    }

    try {
      const postId = culture.cid;
      const response = await axios.post(`/like/toggle`, {
        lId: userId,
        no: postId
      });
      setIsLikeClick(!isLikeClick)
      console.log('isLiked : ', isLiked)
    } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', error);
    }
  };

  const setWeatherInfo = () => {
    dispatch(setCityInfo({
      la: culture.lcLattd,
      lo: culture.lcLongt,
      ctprvnNm: culture.ctprvnName,
      signguNm: culture.signguName
    }))
  }
  return (
    <div className="post-detail">
      <br/><br/>
      <div className='detail-div'>
      <span className='mainTitle'><h1>{culture.fcltyName}</h1></span>
        <button onClick={() => handleLike()} className='button-detail'>
          {isLiked ? '❤️' : '🤍'} {culture.likeCount}
        </button>&emsp;
        <button className='button-detail' onClick={() => {
          setWeatherInfo();
          navigate("/weather")
        }}>날씨 확인</button>
      </div>
      <br/><br/>

      <div className='detail-div2'>

        <img src={culture.picturePath} alt='문화시설 사진'/>
      </div>

      <table className='table-detail'>
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
            <td className='hmpUrlTd'><Link className='hmpUrl' to={culture.hmpgUrl}>{culture.hmpgUrl}</Link></td>
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
      <span className='mainTitle'><h1>후기</h1></span>
      <table className="table-detail-review">
        <tbody>
          {reviews.map((review) => (
            <tr key={review.rid}>
              <td>{review.rid}</td>
              <td>{review.content}</td>
              <td>{review.createDate.substring(0, 10)}</td>
              <td>{review.rid === localStorage.getItem('username') && <button className="button-detail" onClick={() => { navigate(`/review/update/${culture.cid}/culture`) }}>수정</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 후기 작성 버튼 */}
      <div className='div-detail'>
        <button onClick={() => navigate(`/review/${culture.cid}/culture`)} className="button-detail">후기 작성</button>
      </div>

      {/* 목록으로 가기 버튼 */}
      <div className="div-detail">
        <button onClick={() => navigate('/culture')} className='button-detail'>목록 가기</button>
      </div>
    </div>
  );
}

export default PostCultureDetail;