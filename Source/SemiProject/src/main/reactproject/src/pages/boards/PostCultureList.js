import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../assets/PostList.css';
import axios from 'axios';

function PostCultureList() {
  const [culture, setCulture] = useState([]);
  const [postsPerPage, setPostsPerPage] = useState(10); // 한 페이지에 표시할 글 수
  const [currentPage, setCurrentPage] = useState(1); // 1부터 시작하는 페이지 번호
  const [totalPages, setTotalPages] = useState(); // 전체 페이지 수
  const [searchInput, setSearchInput] = useState('');
  const [totalBlock, setTotalBlock] = useState('');       // 전체 페이지 블록
  const [currentBlock, setCurrentBlock] = useState(0);    // 현재 페이지 블록
  const [searchCategory, setSearchCategory] = useState('null');
  const userId = localStorage.getItem('username');
  const [like, setLike] = useState(false);


  // 페이지 변경 처리
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Spring Boot는 페이지 번호가 0부터 시작
  };

  const handlePostsPerPageChange = (event) => {
    setPostsPerPage(parseInt(event.target.value, 10));
    
  };

  function listCaller() {
    axios.post('/culture/list', {
      'page': currentPage,
      'numPerPage': postsPerPage,
      'keyField': searchCategory,
      'keyWord': searchInput
    })
      .then(response => {
        console.log("currentPage", currentPage);
        console.log(response.data);
        setCulture(response.data.list);
        setTotalPages(response.data.totalPages);

        // totalPages를 클라이언트에서 계산
        const calculatedTotalPages = Math.ceil(response.data.totalRecord / postsPerPage);
        setTotalPages(calculatedTotalPages);

        // totalBlock도 새로 계산된 totalPages를 기반으로 계산
        setTotalBlock(Math.ceil(calculatedTotalPages / 10));
      })
      .catch(error => {
        console.error('Error fetching culture data: ', error);
      });
  }

  useEffect(() => {
    listCaller()
  }, [currentPage, postsPerPage]);

  //검색버튼 누를떄
  const handleSearch = () => {
    SearchCulture();
    setCurrentPage(1);
  };
  // input onChange
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  function SearchCulture() {
    if (searchCategory == 'null') {
      alert('카테고리를 선택하십시오')
    } else {
      if (currentPage === 1) {
        listCaller()
      } else {
        setCurrentPage(1); // 한 페이지에 나타낼 글 수를 변경하면 첫 페이지로 이동
      }
    }
  }
  //  리스트에서 바로 좋아요 클릭할 수 있는 기능 구현중
  // const handleLike = async (cid) => {
  //   const likeOBJ = {
  //     lId: userId,
  //     no: cid
  //   }
  //   console.log('likeOBJ : ', likeOBJ)
  //   try {
  //     const response = await axios.post(`/like/toggle`, likeOBJ);
  //     console.log(response.data);

  //     // 서버 응답을 기반으로 상태 업데이트

  //   } catch (error) {
  //     console.error('좋아요 처리 중 오류 발생:', error);
  //     alert('좋아요 처리 중 오류가 발생했습니다.');
  //   }
  // };

  return (
    <div>
      <br /><br />
      <span className='mainTitle'><h1>산책누리 문화길</h1></span>

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
            <th>지역</th>
            <th>좋아요</th>
            <th>시설명</th>
            <th>펫 라이프 스타일</th>
            <th>펫 라이프 케어</th>
            <th>입장가능 반려동물 크기</th>
          </tr>
        </thead>
        <tbody>
          {culture.map((culture) => {
            return (

              <tr key={culture.cid}>
                <td>{culture.ctprvnName}&nbsp;{culture.signguName}</td>
                <td>
                  {/* <button onClick={() => handleLike(culture.cid)} className='likeBtn'> */}
                  {/* {culture.isLiked ? '❤️' : '🤍'}  */}
                  ❤️{culture.likeCount}
                  {/* </button> */}
                  &emsp;
                </td>
                <td className='detail-td'>
                  <Link to={`/culture/${culture.cid}`}>{culture.fcltyName}</Link>
                </td>
                <td>{culture.ctgryOne}</td>
                <td>{culture.ctgryTwo}</td>
                <td>{culture.entrPetSize}</td>
              </tr>
            )
          })}
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

        {Array.from({ length: Math.min(10, totalPages - currentBlock * 10) }, (_, i) => i + 1 + (currentBlock * 10))
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
        <select value={searchCategory} onChange={handleCategoryChange} className="search-select">
          <option value="null">선택</option>
          <option value="fcltyName">시설명</option>
          <option value="signguName">지역명</option>
          <option value="ctgryOne">펫 라이프 스타일</option>
          <option value="ctgryTwo">펫 라이프 케어</option>
          <option value="entrPetSize">입장가능반려동물크기</option>
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

export default PostCultureList;
