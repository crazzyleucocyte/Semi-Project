import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

// 예시 데이터
const postsData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `게시글 ${i + 1}`,
  routeType: `경로구분 ${i % 3}`, // 산책경로구분명
  city: `시군구 ${i % 5}`, // 시군구명
  level: `레벨 ${i % 4}`, // 경로레벨명
  time: `${30 + i * 5}분`, // 경로시간명
  likes: 0,
  likedByUser: false,
}));

function PostList({ isLoggedIn }) {
  const [posts, setPosts] = useState(postsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [searchCategory, setSearchCategory] = useState('title'); // 검색 카테고리 상태 추가
  const postsPerPage = 10;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  // 검색어에 맞는 게시글 필터링
  const filteredPosts = posts.filter(post => {
    switch (searchCategory) {
      case 'title':
        return post.title.toLowerCase().includes(searchTerm.toLowerCase());
      case 'routeType':
        return post.routeType.toLowerCase().includes(searchTerm.toLowerCase());
      case 'city':
        return post.city.toLowerCase().includes(searchTerm.toLowerCase());
      case 'level':
        return post.level.toLowerCase().includes(searchTerm.toLowerCase());
      case 'time':
        return post.time.toLowerCase().includes(searchTerm.toLowerCase());
      default:
        return false;
    }
  });

  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLike = (id) => {
    setPosts(posts.map(post =>
      post.id === id
        ? { ...post, 
            likes: post.likedByUser ? post.likes - 1 : post.likes + 1, 
            likedByUser: !post.likedByUser 
          }
        : post
    ));
  };

  const handleSearch = () => {
    setSearchTerm(searchInput);
    setCurrentPage(1);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSearchCategory(event.target.value);
  };

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div>
      <h1>게시판</h1>
      <table>
        <thead>
          <tr>
            <th>글번호</th>
            <th>제목</th>
            <th>산책경로구분명</th>
            <th>시군구명</th>
            <th>경로레벨명</th>
            <th>경로시간</th>
            <th>좋아요</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map(post => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </td>
              <td>{post.routeType}</td>
              <td>{post.city}</td>
              <td>{post.level}</td>
              <td>{post.time}</td>
              <td>
                {isLoggedIn ? (
                  <button onClick={() => handleLike(post.id)}>
                    {post.likedByUser ? '좋아요 취소' : '좋아요'} {post.likes}
                  </button>
                ) : (
                  <button disabled>
                    좋아요 {post.likes} (로그인 필요)
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
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
        <select onChange={handleCategoryChange} value={searchCategory} className="search-select">
          <option value="title">제목</option>
          <option value="routeType">산책경로구분명</option>
          <option value="city">시군구명</option>
          <option value="level">경로레벨명</option>
          <option value="time">경로시간명</option>
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

export default PostList;
