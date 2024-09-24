import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../../assets/PostWalkDetail.css';
import axios from 'axios';
import Kakao from '../../data/Kakao';
import { useDispatch } from 'react-redux';
import { setCityInfo } from '../../hooks/store';

function PostWalkDetail({ likes, onLike }) {
  const { id } = useParams();
  const [walkingTrails, setWalkingTrails] = useState([]);
  const dispatch = useDispatch()
  const [isLiked, setIsLiked] = useState(false);
  const [like, setLike] = useState(false);
  const userId = localStorage.getItem('username');
  let isLoggedIn = localStorage.getItem('username')===null;
  
  // const [prevPostId, setPrevPostId] = useState(null);
  // const [nextPostId, setNextPostId] = useState(null);
  
  // useEffect(() => {
    //   // 초기 좋아요 상태 확인
    //   checkLikeStatus();
    // }, []);
    
    // const checkLikeStatus = async () => {
      //   try {
        //     const response = await axios.get(`/api/like/status?userId=${userId}&postNo=${postId}`);
        //     setIsLiked(response.data);
  //   } catch (error) {
    //     console.error('좋아요 상태 확인 중 오류 발생:', error);
    //   }
    // };
    
    // const handleLike = async () => {
      //   try {
        //     const response = await axios.post(`/api/like?userId=${userId}&postNo=${postId}`);
        //     const newLikeStatus = response.data;
        //     setIsLiked(newLikeStatus);
        //     setLikeCount(prevCount => newLikeStatus ? prevCount + 1 : prevCount - 1);
        //   } catch (error) {
          //     console.error('좋아요 처리 중 오류 발생:', error);
          //   }
          // };
          const initialReviews = [
            {
              no: 0,
              content: "",
              createDate: "",
              rid: ""
            } 
          ];
          const [reviews, setReviews] = useState(initialReviews); // 후기 목록 상태 추가
          
          
  // const handleLike = async () => {
  //   try {
  //     const postId = walkingTrails.wid;
  //     const response = await axios.post(`/api/like`,{
  //       lId:userId,
  //       no:postId
  //     });
  //     console.log(response.data);

  //     const newLikeStatus = !likes[postId];
  //     onLike(postId, newLikeStatus);
  //     setLike(newLikeStatus);
  //     // const newLikeStatus = response.data;
  //     // setIsLiked(newLikeStatus);
  //     // setLikeCount(prevCount => newLikeStatus ? prevCount + 1 : prevCount - 1);
  //     setLike(!like)
  //   } catch (error) {
  //     console.error('좋아요 처리 중 오류 발생:', error);
  //   }
  // };

  // PostWalkDetail.propTypes = {
  //   likes: PropTypes.objectOf(PropTypes.bool).isRequired,
  //   onLike: PropTypes.func.isRequired,
  // };

  useEffect(() => {
    
    // 백엔드로부터 게시글 데이터를 가져옴
    axios.get('/walking/'+ id)
    .then(response => {
      console.log(response.data);
      setWalkingTrails(response.data);
      // fetchReviews();
      // fetchAdjacentPosts();
      console.log(walkingTrails);
    })
    .catch(error => {
      console.error('Error fetching walkingTrail data: ', error);
    });
    
        
           
             axios.get(`/api/like/status?userId=${userId}&postNo=${walkingTrails.wid}`)
                  .then((response)=>{

                    setIsLiked(response.data);
                  })
                  .catch((error)=>{
                    console.log('좋아요 상태 확인 중 오류 발생:', error)
                  })
          
        
  }, [isLiked]);

  const handleLike = async () => {
    if (isLoggedIn) {
      alert('로그인이 필요한 기능입니다.');
      return;
    }

    try {
      const postId = walkingTrails.wid;
      const response = await axios.post(`/api/like`, {
        lId: userId,
        no: postId
      });
      console.log(response.data);

      const newLikeStatus = response.data;
      setIsLiked(newLikeStatus);
      onLike(postId, newLikeStatus);
      
    console.log('isLiked : ',isLiked)
    } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', error);
    }
  };


  useEffect(()=>{
    axios.get(`/review/getList/${id}`)
         .then((response)=>{
          console.log(response.data)
          setReviews([...response.data])
         })
         .catch((error)=>{
          console.log(error)
          alert(error)
         })
  },[])

  
  const navigate = useNavigate();

  const setWeatherInfo=()=>{
    dispatch(setCityInfo({
      la : walkingTrails.lcLattd,
      lo : walkingTrails.lcLongt,
      ctprvnNm : walkingTrails.ctprvnNm,
      signguNm : walkingTrails.signguNm
    }))
  }

  const getLevelStars = (level) => {
    switch(level) {
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
      {/* 이전글 버튼 */}
      {/* <button
        className="nav-button prev-button"
        onClick={() => navigateToAdjacentPost(prevPostId)}
        // disabled={!prevPostId}
      >
        <FaChevronLeft />
      </button> */}

      <div className='detail-div'>
        <h1 className='h1-list'>{walkingTrails.wlktrlName}</h1>
        <button onClick={()=>handleLike()} className='button-detail'>
                {isLiked.isLiked ? '❤️' : '🤍'} {walkingTrails.likeCount}
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
        {/* <colgroup>
          <col width={15} />
          <col width={85} />
        </colgroup> */}
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

      {/* <table className="detail-table">
        <tbody>
          <tr className="bold-text">
            <td>생성일</td>
            <td>최종수정날짜</td>
          </tr>
          <tr>
            <td>{walkingTrails.createdAt}</td>
            <td>{walkingTrails.updatedAt}</td>
          </tr>
        </tbody>
      </table> */}
      
      

      

      {/* 후기 표시 부분 */}
      <h1>후기</h1>
      <table className="table-detail">
        <tbody>
          {reviews.map((review) => (
            <tr key={review.rid}>
              <td>{review.rid}</td>
              <td>{review.content}</td>
              <td>{review.createDate.substring(0,10)}</td>
              <td>{review.rid === localStorage.getItem('username') &&<button className="button-detail" onClick={()=>{navigate(`/review/update/${walkingTrails.wid}/walk`)}}>수정</button>}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isLoggedIn && (
        <div className='div-detail'>
          <button onClick={() => navigate(`/review/${walkingTrails.wid}/walk`)} className="button-detail">후기 작성</button>
        </div>
      )}

      {/* 후기 작성 버튼 */}
      <div className='div-detail'>
        <button onClick={() => navigate(`/review/${walkingTrails.wid}/walk`)} className="button-detail">후기 작성</button>
      </div>
      
      {/* 목록으로 가기 버튼 */}
      {/* <div className='div-detail'>
        <button onClick={() => navigate('/walk')} className="button-detail">뒤로 가기</button>
      </div> */}

      {/* <button
        className="nav-button next-button"
        onClick={() => navigateToAdjacentPost(nextPostId)}
        // disabled={!nextPostId}
      >
        <FaChevronRight />
      </button> */}
    </div>
  );
}

export default PostWalkDetail;