import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/PostList.css';
import axios from 'axios';

function PostCultureList() {
  const [culture, setCulture] = useState([]);
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
  
  
  // const [posts, setPosts] = useState(postsData);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [postsPerPage, setPostsPerPage] = useState(10); // 한 페이지에 표시할 글 수
  // const [searchTerm, setSearchTerm] = useState('');
  // const [searchInput, setSearchInput] = useState('');
  // const [searchCategory, setSearchCategory] = useState('title');

  // // 페이지 번호에 따른 게시글 추출
  // const indexOfLastPost = currentPage * postsPerPage;
  // const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const filteredPosts = posts.filter(post =>
  //   post[searchCategory].toString().toLowerCase().includes(searchTerm.toLowerCase())
  // );
  // const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  
  function listCaller(){
    axios.post('/culture/list', {
      'page' : currentPage,
      'numPerPage' : postsPerPage,
      'keyField' : searchCategory,
      'keyWord' : searchInput
    })
    .then(response => {
      console.log("currentPage", currentPage);
      console.log(response.data);
      setCulture(response.data.list);
      setTotalRecord(response.data.totalRecord);
      setTotalPages(response.data.totalPages);
      console.log(totalBlock);
      setTotalBlock(Math.ceil(response.data.totalRecord / 10));
    })
    .catch(error => {
      console.error('Error fetching culture data: ', error);
    });
  }
  
  useEffect(() => {
    listCaller()
  }, [currentPage, postsPerPage, searchInput, searchCategory]);
  
  const handlePostsPerPageChange = (event) => {
    setPostsPerPage(parseInt(event.target.value, 10));
    if(currentPage === 1){
      listCaller()
    }else{
      setCurrentPage(1); // 한 페이지에 나타낼 글 수를 변경하면 첫 페이지로 이동
    }
  };

  const handleSearch = () => {
    setSearchTerm(searchInput);
    SearchCulture();
    setCurrentPage(1);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  function SearchCulture(){
    if(searchCategory == 'null'){
      alert('카테고리를 선택하십시오')
    }else{
      listCaller();
    }
  }

  // 좋아요 버튼 클릭 핸들러
  // const handleLike = (id) => {
  //   setPosts(posts.map(post =>
  //     post.id === id
  //       ? { ...post, 
  //           likes: post.likedByUser ? post.likes - 1 : post.likes + 1, 
  //           likedByUser: !post.likedByUser 
  //         }
  //       : post
  //   ));
  // };

  // 검색 버튼 클릭 핸들러
  // const handleSearch = () => {
  //   setSearchTerm(searchInput);
  //   setCurrentPage(1); // 검색 시 첫 페이지로 이동
  // };

  // const handleSearchInputChange = (event) => {
  //   setSearchInput(event.target.value);
  // };

  // const handleCategoryChange = (event) => {
  //   setSearchCategory(event.target.value);
  // };

  // const handlePostsPerPageChange = (event) => {
  //   setPostsPerPage(parseInt(event.target.value, 10));
  //   setCurrentPage(1); // 한 페이지에 나타낼 글 수를 변경하면 첫 페이지로 이동
  // };

  // const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div>
        <h1 className='h1-list'>산책누리 문화길</h1>

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
              <th>시·군·구 통합</th>
              {/* <th>시군구</th> */}
              <th>좋아요</th>
              <th>시설명</th>
              <th>펫 라이프 스타일</th>
              <th>펫 라이프 케어</th>
              <th>입장가능 반려동물 크기</th>
            </tr>
          </thead>
          <tbody>
            {culture.map((culture) => (
              <tr key={culture.cid}>
                {/* <td>{culture.cid}</td> */}
                <td>{culture.ctprvnName}&nbsp;{culture.signguName}</td>
                {/* <td>{culture.signguName}</td> */}
                <td>
                  <button className='likeBtn'>👍</button>
                </td>
                <td className='detail-td'>
                  <Link to={`/culture/${culture.cid}`}>{culture.fcltyName}</Link>
                </td>
                <td>{culture.ctgryOne}</td>
                <td>{culture.ctgryTwo}</td>
                <td>{culture.entrPetSize}</td>
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
          {/* <p>{currentPage}</p> */}
        </div>

        <div className="search">
          <select value={searchCategory} onChange={handleCategoryChange} className="search-select">
            <option value="null">선택</option>
            <option value="fcltyName">시설명</option>
            <option value="signguName">시군구명</option>
            <option value="ctgryOne">카테고리1</option>
            <option value="ctgryTwo">카테고리2</option>
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
