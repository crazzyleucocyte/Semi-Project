import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../../assets/PostWalkDetail.css';
import axios from 'axios';
import Kakao from '../../data/Kakao';
import { useDispatch } from 'react-redux';
import { setCityInfo } from '../../hooks/store';

// const initialReviews = [
//   {
//     id: 1,
//     content: '이 경로는 정말 아름답고 평화로워요!',
//     createdAt: '2024-09-02',
//   },
//   {
//     id: 2,
//     content: '산책하기에 최적의 장소였습니다.',
//     createdAt: '2024-09-03',
//   },
// ];



function PostWalkDetail({ isLoggedIn, onAddReview,  initialLikes}) {
  const { id } = useParams();
  const [walkingTrails, setWalkingTrails] = useState([]);
  const dispatch =useDispatch()
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikes);
  const [reviews, setReviews] = useState([]);
  const userId = localStorage.getItem('username');

  const [prevPostId, setPrevPostId] = useState(null);
  const [nextPostId, setNextPostId] = useState(null);

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
  useEffect(() => {
    // 초기 좋아요 상태는 따로 확인하지 않고 initialLikes로 추정
    setIsLiked(initialLikes > 0);
  }, [initialLikes]);

  const handleLike = async () => {
    try {
      const postId = walkingTrails.wid;
      const response = await axios.post(`/api/like`,{
        lId:userId,
        no:postId
      });
      const newLikeStatus = response.data;
      setIsLiked(newLikeStatus);
      setLikeCount(prevCount => newLikeStatus ? prevCount + 1 : prevCount - 1);
    } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    // 백엔드로부터 게시글 데이터를 가져옴
    axios.get('/walking/'+ id)
    .then(response => {
      console.log(response.data);
      setWalkingTrails(response.data);
      fetchReviews();
      fetchAdjacentPosts();
      console.log(walkingTrails);
    })
    .catch(error => {
      console.error('Error fetching walkingTrail data: ', error);
    });
  }, [id]);

  const fetchReviews = () => {
    axios.get(`/api/reviews/${id}`)
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching reviews: ', error);
      });
  };

  const handleAddReview = (newReview) => {
    axios.post(`/api/reviews`, {
      walkId: id,
      content: newReview.content,
      userId: userId
    })
      .then(response => {
        fetchReviews(); // 새로운 후기를 포함하여 모든 후기를 다시 가져옵니다
      })
      .catch(error => {
        console.error('Error adding review: ', error);
      });
  };

  
  // const [post, setPost] = useState(null);
  // const [likes, setLikes] = useState(0);
  // const [likedByUser, setLikedByUser] = useState(false);
  // const [views, setViews] = useState(0);
  // const [reviews, setReviews] = useState(initialReviews); // 후기 목록 상태 추가
  
  const navigate = useNavigate();

  // useEffect(() => {
  //   // 데이터 초기화
  //   const postId = parseInt(id, 10);
  //   // const foundPost = initialPostsData.find((p) => p.id === postId);

  //   if (foundPost) {
  //     const storedViews = localStorage.getItem(`post-${id}-views`);
  //     const initialViews = storedViews ? parseInt(storedViews, 10) : foundPost.views;

  //     setPost(foundPost);
  //     setLikes(foundPost.likes);
  //     setLikedByUser(foundPost.likedByUser || false);
  //     setViews(initialViews);

  //     if (!storedViews) {
  //       localStorage.setItem(`post-${id}-views`, initialViews + 1);
  //       setViews(initialViews + 1);
  //     }
  //   } else {
  //     setPost(null); // 게시글이 없는 경우
  //   }
  // }, [id]);

  // const handleLike = () => {
  //   if (isLoggedIn) {
  //     if (likedByUser) {
  //       setLikes(likes - 1);
  //     } else {
  //       setLikes(likes + 1);
  //     }
  //     setLikedByUser(!likedByUser);
  //   } else {
  //     alert('로그인 후 좋아요를 누를 수 있습니다.');
  //   }
  // };

  // const handleAddReview = (newReview) => {
  //   setReviews([...reviews, newReview]);
  // };

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

  const fetchAdjacentPosts = async () => {
    try {
      console.log('요청 URL:', `/api/walking/adjacent/${id}`);
      const response = await axios.get(`/api/walking/adjacent/${id}`);
      console.log('인접 게시물 데이터:', response.data);
      setPrevPostId(response.data.prevId);
      setNextPostId(response.data.nextId);
    } catch (error) {
      console.error('인접 게시물 가져오기 오류:', error);
    }
  };

  const navigateToAdjacentPost = (postId) => {
    console.log('이동할 게시물 ID:', postId);
    if (postId) {
      navigate(`/walk/${postId}`);
      console.log('이동할 게시물이 없습니다.');
    }
  };

  return (
    <div className="post-detail">
      {/* 이전글 버튼 */}
      <button
        className="nav-button prev-button"
        onClick={() => navigateToAdjacentPost(prevPostId)}
        // disabled={!prevPostId}
      >
        <FaChevronLeft />
      </button>

      <div className='detail-div'>
        <h1 className='h1-list'>{walkingTrails.wlktrlName}</h1>
        <button onClick={handleLike} className='button-detail'>
                {isLiked ? '좋아요 취소' : '👍'} {walkingTrails.likeCount}
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
            <tr key={review.id}>
              <td>{review.content}</td>
              <td>{review.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isLoggedIn && (
        <div className='div-detail'>
          <form onSubmit={(e) => {
            e.preventDefault();
            const content = e.target.reviewContent.value;
            handleAddReview({ content });
            e.target.reviewContent.value = '';
          }}>
            <textarea name="reviewContent" required></textarea>
            <button type="submit" className="button-detail">후기 작성</button>
          </form>
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

      <button
        className="nav-button next-button"
        onClick={() => navigateToAdjacentPost(nextPostId)}
        // disabled={!nextPostId}
      >
        <FaChevronRight />
      </button>
    </div>
  );
}

export default PostWalkDetail;