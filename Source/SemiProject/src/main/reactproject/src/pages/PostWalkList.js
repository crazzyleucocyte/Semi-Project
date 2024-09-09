import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/PostList.css';
import axios from 'axios';

// 예시 데이터
const postsData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  pathType: `산책경로 ${i + 1}`,
  district: `시군구 ${i + 1}`,
  level: `레벨 ${i + 1}`,
  time: `${30 + i}분`,
  likes: 0,
  likedByUser: false,
}));

function WalkingTrail() {
  axios.get('/walking/'+3+'/'+10)
  .then(response => {
    // setWalkingTrails(response.data);
  })
  .catch(error => {
    console.error('Error fetching walkingTrail data: ', error);
  });
  
}

function PostWalkList({ isLoggedIn }) {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10); // 한 페이지에 표시할 글 수
  function SearchWalkingTrail(){
    axios.post('/walking/list',{
      'page' : currentPage,
      'numPerPage' : postsPerPage,
      'keyField' : searchCategory,
      'keyWord' : searchInput
    })
    .then(response => {
      console.log(response.data)
      setWalkingTrails(response.data);
    })
    .catch(error => {
      console.error('Error fetching walkingTrail data: ', error);
    });
  }
  useEffect(() => {
    // 백엔드로부터 게시글 데이터를 가져옴
    axios.get('/walking/'+3+'/'+10)
    .then(response => {
      console.log(response.data)
      setWalkingTrails(response.data);
    })
    .catch(error => {
      console.error('Error fetching walkingTrail data: ', error);
    });
    
    axios.post('/walking/list',{
      'page' : currentPage,
      'numPerPage' : postsPerPage,
      'keyField' : searchCategory,
      'keyWord' : searchInput
    })
    .then(response => {
      console.log(response.data)
      setWalkingTrails(response.data);
    })
    .catch(error => {
      console.error('Error fetching walkingTrail data: ', error);
    });
  }, [currentPage]);
  
  const [walkingTrails, setWalkingTrails] = useState([]);
  const [posts, setPosts] = useState(postsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [searchCategory, setSearchCategory] = useState('id');

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const filteredPosts = posts.filter((post) => {
    if (!searchTerm) return true;
    const value = post[searchCategory];
    return value ? value.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false;
  });

  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLike = (id) => {
    if (isLoggedIn) {
      setPosts(posts.map((post) =>
        post.id === id
          ? {
              ...post,
              likes: post.likedByUser ? post.likes - 1 : post.likes + 1,
              likedByUser: !post.likedByUser,
            }
          : post
      ));
    } else {
      alert('로그인 후 좋아요를 누를 수 있습니다.');
    }
  };

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

  const handlePostsPerPageChange = (event) => {
    setPostsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // 한 페이지에 나타낼 글 수를 변경하면 첫 페이지로 이동
  };

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div>
      <h1>산책 경로 목록</h1>

      {/* 한 페이지에 표시할 글 수 선택하는 select 요소 */}
      <div className="posts-per-page">
        <select id="postsPerPageSelect" value={postsPerPage} onChange={handlePostsPerPageChange}>
          <option value="10">10개씩 보기</option>
          <option value="20">20개씩 보기</option>
          <option value="50">50개씩 보기</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>글번호</th>
            <th>산책경로구분명</th>
            <th>시군구명</th>
            <th>경로레벨명</th>
            <th>경로시간</th>
            <th>좋아요</th>
          </tr>
        </thead>
        <tbody>
          {walkingTrails.map((walkingTrails) => (
            <tr key={walkingTrails.wid}>
              <td>{walkingTrails.wid}</td>
              <td className='detail-td'>
                <Link to={`/walk/${walkingTrails.wid}`}>{walkingTrails.wlktrlName}</Link>
              </td>
              <td>{walkingTrails.signguNm}</td>
              <td>{walkingTrails.coursLvNm}</td>
              <td>{walkingTrails.coursTmContent}</td>
              <td>
                {isLoggedIn ? (
                  <button onClick={() => handleLike(walkingTrails.id)}>
                    {walkingTrails.likedByUser ? '좋아요 취소' : '좋아요'} {walkingTrails.likes}
                  </button>
                ) : (
                  <button disabled>
                    좋아요 {walkingTrails.likes}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={currentPage === pageNumber ? 'active' : ''}
          >
            {pageNumber}
          </button>
        ))}
      </div>

      <div className="search">
        <select value={searchCategory} onChange={handleCategoryChange} className="search-select">
          <option value="wlktrlName">산책경로구분명</option>
          <option value="signguNm">시군구명</option>
          <option value="coursLvNm">경로레벨명</option>
          <option value="coursTmContent">경로시간</option>
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

export default PostWalkList;
