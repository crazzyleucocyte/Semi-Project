import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import '../../assets/PostList.css';
// import * as FaqStyle from '../assets/FaqStyle';

function WalkingTrailsList({ likes, onLike }) {
  // const { id } = useParams();
  const [walkingTrails, setWalkingTrails] = useState([]);
  const [postsPerPage, setPostsPerPage] = useState(10); // 한 페이지에 표시할 글 수
  const [currentPage, setCurrentPage] = useState(1); // 1부터 시작하는 페이지 번호
  const [totalPages, setTotalPages] = useState(); // 전체 페이지 수
  const [searchInput, setSearchInput] = useState('');
  const [totalRecord, setTotalRecord] = useState('');
  const [totalBlock, setTotalBlock] = useState('');       // 전체 페이지 블록
  const [currentBlock, setCurrentBlock] = useState(0);    // 현재 페이지 블록
  const [searchCategory, setSearchCategory] = useState('null');
  const [searchTerm, setSearchTerm] = useState('');
  const [likedPosts, setLikedPosts] = useState({});

  // const [isLiked, setIsLiked] = useState(false);
  const userId = localStorage.getItem('username');
  const [like, setLike] = useState(false);
  
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  
  // 페이지 변경 처리
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Spring Boot는 페이지 번호가 0부터 시작
  };
  
  const handlePostsPerPageChange = (event) => {
    setPostsPerPage(parseInt(event.target.value, 10));
    if(currentPage === 1){
      listCaller()
    }else{
      setCurrentPage(1); // 한 페이지에 나타낼 글 수를 변경하면 첫 페이지로 이동
    }
  };
  
  // const filteredPosts = walkingTrails.filter((post,i) => {
  //   console.log("currentPage ", currentPage)
  //   console.log("currentBlock ", currentBlock)
  //   console.log("indexOfFirstPost ", indexOfFirstPost)
  //   console.log("indexOfLastPost ", indexOfLastPost)
  //   return i>=indexOfFirstPost && i<=indexOfLastPost;
  // });

  // const filteredPosts = walkingTrails.slice(indexOfFirstPost, indexOfLastPost);

  function listCaller(){
    axios.post('/walking/list',{
      'page' : currentPage,
      'numPerPage' : postsPerPage,
      'keyField' : searchCategory,
      'keyWord' : searchInput
    })
    .then(response => {
      console.log("currentPage ", currentPage);
      console.log(response.data);
      setWalkingTrails(response.data.list);
      setTotalRecord(response.data.totalRecord);
      setTotalPages(response.data.totalPages);
      // console.log(totalBlock);
      // setTotalBlock(Math.ceil(response.data.totalRecord / postsPerPage));

      // totalPages를 클라이언트에서 계산
      const calculatedTotalPages = Math.floor(response.data.totalRecord / postsPerPage);
      setTotalPages(calculatedTotalPages);
      
      // totalBlock도 새로 계산된 totalPages를 기반으로 계산
      setTotalBlock(Math.ceil(calculatedTotalPages / 10));

    })
    .catch(error => {
      console.error('Error fetching walkingTrail data: ', error);
    });
  }

  // postsPerPage가 변경될 때마다 totalPages와 totalBlock을 재계산
  // useEffect(() => {
  //   if (totalRecord > 0) {
  //     const calculatedTotalPages = Math.floor(totalRecord / postsPerPage);
  //     setTotalPages(calculatedTotalPages);
  //     console.log("totalRecord : ",totalRecord)
  //     console.log("postsPerPage : ", postsPerPage)
  //     console.log("calculatedTotalPages : ", calculatedTotalPages)
  //     setTotalBlock(Math.ceil(calculatedTotalPages / 10));
  //   }
  // }, [totalRecord, postsPerPage]);

  useEffect(() => {
    listCaller()
  }, [currentPage, postsPerPage ]);

  const handleSearch = () => {
    setSearchTerm(searchInput);
    SearchWalkingTrail();
    setCurrentPage(1);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  function SearchWalkingTrail(){
    if(searchCategory == 'null'){
      alert('카테고리를 선택하십시오')
    }else{
      listCaller();
    }
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

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.post('/walking/list', {
        'page': currentPage,
        'numPerPage': postsPerPage,
        'keyField': searchCategory,
        'keyWord': searchInput
      });
      
      const storedLikes = JSON.parse(localStorage.getItem('likedPosts') || '{}');
      
      const updatedTrails = response.data.list.map(trail => ({
        ...trail,
        isLiked: storedLikes[trail.wid] || false
      }));

      setWalkingTrails(updatedTrails);
      setTotalRecord(response.data.totalRecord);
      
      const calculatedTotalPages = Math.floor(response.data.totalRecord / postsPerPage);
      setTotalPages(calculatedTotalPages);
      setTotalBlock(Math.ceil(calculatedTotalPages / 10));
    } catch (error) {
      console.error('Error fetching walkingTrail data: ', error);
    }
  }, [currentPage, postsPerPage, searchCategory, searchInput]);

  useEffect(() => {
    const storedLikes = JSON.parse(localStorage.getItem('likedPosts') || '{}');
    setLikedPosts(storedLikes);
    fetchData();
  }, [fetchData]);

  const handleLike = async (wid) => {
    try {
      const response = await axios.post(`/api/like`,{
        lId:userId,
        no:wid
      });
      console.log(response.data);

      const newLikedStatus = response.data.isLiked;
      const newLikeCount = response.data.likeCount;

      setWalkingTrails(prevTrails => prevTrails.map(trail => 
        trail.wid === wid 
          ? {
            ...trail, 
            likeCount: newLikeCount,
            isLiked: newLikedStatus
          } 
          : trail
      ));

      // 로컬 스토리지 업데이트
      const updatedLikedPosts = { ...likedPosts, [wid]: newLikedStatus };
      setLikedPosts(updatedLikedPosts);
      localStorage.setItem('likedPosts', JSON.stringify(updatedLikedPosts));

    } catch (error) {
      console.error('좋아요 처리 중 오류 발생:', error);
      alert('좋아요 처리 중 오류가 발생했습니다.');
    }
  };


  // useEffect(() => {
    // console.log('id: ', id)
    // 백엔드로부터 게시글 데이터를 가져옴
    // axios.get(`/walking/${id}`)
    //   .then(response => {
    //     console.log(response.data);
    //     setWalkingTrails(response.data);
    //     console.log(walkingTrails);
    // })
    // .catch(error => {
    //   console.error('Error fetching walkingTrail data: ', error);
    // });
    // listCaller();
  // }, [like, currentPage, postsPerPage]);
  
  return (
    <div>
      <h1 className='h1-list'>산책누리 산책길</h1>

       {/* 한 페이지에 표시할 글 수 선택하는 select 요소 */}
       <div className="posts-per-page">
          <select id="postsPerPageSelect" value={postsPerPage} onChange={handlePostsPerPageChange}>
            <option value="10">10개씩 보기</option>
            <option value="20">20개씩 보기</option>
            <option value="50">50개씩 보기</option>
          </select>
        </div>

      <table className='table-list'>
        <thead className='thead-list'>
          <tr>
            {/* <th>글번호</th> */}
            <th>시군구</th>
            <th>좋아요</th>
            <th>산책길 이름</th>
            <th>경로레벨</th>
            <th>산책 시간</th>
          </tr>
        </thead>
        <tbody>
          {walkingTrails.map((walkingTrails) => (
            <tr key={walkingTrails.wid}>
              {/* <td>{walkingTrails.wid}</td> */}
              <td>{walkingTrails.signguNm}</td>
              <td>
                <button onClick={()=>handleLike(walkingTrails.wid)} className='likeBtn'>
                  {walkingTrails.isLiked ? '❤️' : '🤍'} {walkingTrails.likeCount || 0}
                </button>&emsp;
              </td>
              <td className='detail-td'>
                <Link to={`/walk/${walkingTrails.wid}`}>{walkingTrails.wlktrlName}</Link>
              </td>
              <td title='{walkingTrails.coursLvNm}'>
                {getLevelStars(walkingTrails.coursLvNm)}
              </td>
              <td>{walkingTrails.coursTmContent}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <div className="pagination">
        {currentBlock > 0 && (
          <button onClick={() => {
            const newPage = (currentBlock - 1) * 10 + 1;
            setCurrentPage(newPage);
            setCurrentBlock(currentBlock - 1);
          }}>Prev...</button>
        )}

        {Array.from({ length: Math.min(10, totalPages - currentBlock * 10) }, (_, i) => i +1 + (currentBlock * 10))
          .map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={currentPage === pageNumber ? 'active' : ''}
            >
              {pageNumber}
            </button>
        ))}

        {currentBlock < totalBlock - 1 && (
          <button onClick={() => {
            const newBlock = currentBlock + 1;
            const newPage = newBlock * 10 + 1;
            setCurrentBlock(newBlock);
            setCurrentPage(newPage);
          }}>...Next</button>
        )}
      </div>



      <div className="search">
        <select  onChange={handleCategoryChange} className="search-select">
          <option value="null">선택</option>
          <option value="wlktrlName">산책길 이름</option>
          <option value="signguNm">시군구</option>
          <option value="coursLvNm">경로레벨</option>
          <option value="coursTmContent">산책 시간</option>
        </select>
        <input
          type="text"
          placeholder="검색어 입력"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <button onClick={handleSearch} className="search-button">검색</button>
      </div>
    </div>
  );
}

export default WalkingTrailsList;