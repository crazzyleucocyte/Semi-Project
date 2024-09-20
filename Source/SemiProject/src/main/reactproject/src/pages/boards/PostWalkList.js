import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../assets/PostList.css';
// import * as FaqStyle from '../assets/FaqStyle';

function WalkingTrailsList() {
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
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  
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
      console.log(totalBlock);
      setTotalBlock(Math.ceil(response.data.totalRecord / postsPerPage));
    })
    .catch(error => {
      console.error('Error fetching walkingTrail data: ', error);
    });
  }
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

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedWalkingTrails = [...walkingTrails].sort((a, b) => {
    if (sortField === null) return 0;
    
    let aValue = a[sortField];
    let bValue = b[sortField];

    if (sortField === 'coursLvNm') {
      const levelOrder = { '매우쉬움': 1, '쉬움': 2, '보통': 3, '어려움': 4, '매우어려움': 5 };
      aValue = levelOrder[a.coursLvNm] || 0;
      bValue = levelOrder[b.coursLvNm] || 0;
    } else if (sortField === 'coursTmContent') {
      aValue = parseInt(a.coursTmContent) || 0;
      bValue = parseInt(b.coursTmContent) || 0;
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  
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
            <th onClick={() => handleSort('likes')} style={{cursor: 'pointer'}}>
              좋아요 {sortField === 'likes' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th>산책길 이름</th>
            <th onClick={() => handleSort('coursLvNm')} style={{cursor: 'pointer'}}>
              경로레벨 {sortField === 'coursLvNm' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
            <th onClick={() => handleSort('coursTmContent')} style={{cursor: 'pointer'}}>
              산책 시간 {sortField === 'coursTmContent' && (sortDirection === 'asc' ? '▲' : '▼')}
            </th>
          </tr>
        </thead>
        <tbody>
          {walkingTrails.map((walkingTrails) => (
            <tr key={walkingTrails.wid}>
              {/* <td>{walkingTrails.wid}</td> */}
              <td>{walkingTrails.signguNm}</td>
              <td>
                <button className='likeBtn'>👍</button>
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
      {currentBlock > 0 ? (
        <button onClick={() => {
          setCurrentPage((currentBlock - 1) * 10 + 1);
          setCurrentBlock(currentBlock - 1);
        }}>Prev...</button>
      ) : null}

      {/* 현재 블록에서 보여줄 페이지 버튼 생성 */}
      {totalPages > 0 && 
        Array.from({ length: Math.min(10, totalPages - currentBlock * 10) }, (_, i) => i + 1 + (currentBlock * 10))
        .map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={currentPage === pageNumber ? 'active' : ''}
          >
            {pageNumber}
          </button>
      ))}

      {/* 다음 블록으로 이동하는 버튼 */}
      {currentPage < totalPages ? (
        <button onClick={() => {
          setCurrentBlock(currentBlock + 1);
          setCurrentPage(currentBlock * 10 + 1);
        }}>...Next</button>
      ) : null}
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