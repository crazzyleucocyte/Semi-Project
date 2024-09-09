import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/PostList.css';
import axios from 'axios';

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
  const [postsPerPage, setPostsPerPage] = useState(10); // 한 페이지에 표시할 글 수
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [searchCategory, setSearchCategory] = useState('title');

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

  const handlePostsPerPageChange = (event) => {
    setPostsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // 한 페이지에 나타낼 글 수를 변경하면 첫 페이지로 이동
  };

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div>
        <h1>게시판</h1>

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
                <td>{post.wid}</td>
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
