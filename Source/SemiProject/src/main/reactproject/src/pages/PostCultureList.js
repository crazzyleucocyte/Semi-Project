import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/App.css';

// 예시 데이터
const postsData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `게시글 ${i + 1}`,
  pathType: `문화경로 ${i + 1}`,
  district: `시군구 ${i + 1}`,
  level: `레벨 ${i + 1}`,
  time: `${30 + i}분`,
  likes: 0,
  likedByUser: false,
}));

function PostCultureList({ isLoggedIn }) {
  const [posts, setPosts] = useState(postsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [searchCategory, setSearchCategory] = useState('title');
  const postsPerPage = 10;

  // 페이지 번호에 따른 게시글 추출
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const filteredPosts = posts.filter(post =>
    post[searchCategory].toString().toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 좋아요 버튼 클릭 핸들러
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

  // 검색 버튼 클릭 핸들러
  const handleSearch = () => {
    setSearchTerm(searchInput);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
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
        <nav>
            <Link to="/walk">산책 게시판으로 이동</Link>
        </nav>
      <h1>게시판</h1>
      <table>
        <thead>
          <tr>
            <th>글번호</th>
            <th>시설명</th>
            <th>카테고리1</th>
            <th>카테고리2</th>
            <th>시도명</th>
            <th>시군구명</th>
            <th>입장가능반려동물크기</th>
            <th>좋아요</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map(post => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>
                <Link to={`/culture/${post.id}`}>{post.pathType}</Link>
              </td>
              <td>{post.district}</td>
              <td>{post.level}</td>
              <td>{post.time}</td>
              <td>{post.time}</td>
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
        <select value={searchCategory} onChange={handleCategoryChange} className="search-select">
          <option value="id">글번호</option>
          <option value="pathType">시설명</option>
          <option value="district">시군구명</option>
          <option value="level">카테고리1</option>
          <option value="time">카테고리2</option>
          <option value="likes">입장가능반려동물크기</option>
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
