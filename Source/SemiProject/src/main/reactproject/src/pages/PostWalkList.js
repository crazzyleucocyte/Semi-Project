import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/App.css';

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

function PostWalkList({ isLoggedIn }) {
  const [posts, setPosts] = useState(postsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [searchCategory, setSearchCategory] = useState('pathType');
  const postsPerPage = 10;

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
      <h1>산책 경로 목록</h1>
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
          {currentPosts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>
                <Link to={`/walk/${post.id}`}>{post.pathType}</Link>
              </td>
              <td>{post.district}</td>
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
          <option value="id">글번호</option>
          <option value="pathType">산책경로구분명</option>
          <option value="district">시군구명</option>
          <option value="level">경로레벨명</option>
          <option value="time">경로시간</option>
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
