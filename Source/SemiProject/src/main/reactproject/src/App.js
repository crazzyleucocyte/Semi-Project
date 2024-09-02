import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import './App.css';

// 예시 데이터
const postsData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `게시글 ${i + 1}`,
  likes: 0,
  likedByUser: false,
}));

function PostList({ isLoggedIn }) {
  const [posts, setPosts] = useState(postsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState(''); // 사용자가 입력하는 검색어
  const postsPerPage = 10;

  // 페이지 번호에 따른 게시글 추출
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts
    .filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase())) // 검색어 필터링
    .slice(indexOfFirstPost, indexOfLastPost);

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

  const totalPages = Math.ceil(posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase())).length / postsPerPage);

  return (
    <div>
      <h1>게시판</h1>
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
          {currentPosts.map(post => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </td>
              <td></td>
              <td></td>
              <td></td>
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
        <input 
          type="text" 
          placeholder="제목 검색" 
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <button onClick={handleSearch} className="search-button">검색</button>
      </div>
    </div>
  );
}

function PostDetail() {
  const { postId } = useParams();
  const post = postsData.find(p => p.id === parseInt(postId));

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>글 번호: {post.id}</p>
      <p>좋아요: {post.likes}</p>
      <p>산책경로구분명: {/* 추가 데이터 */}</p>
      <p>시군구명: {/* 추가 데이터 */}</p>
      <p>경로레벨명: {/* 추가 데이터 */}</p>
      <p>경로시간: {/* 추가 데이터 */}</p>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <Router>
      <div>
        <button onClick={toggleLogin}>
          {isLoggedIn ? '로그아웃' : '로그인'}
        </button>
        <Routes>
          <Route path="/" element={<PostList isLoggedIn={isLoggedIn} />} />
          <Route path="/post/:postId" element={<PostDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
