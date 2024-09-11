import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/PostList.css';
import axios from 'axios';
// import CustomPagination from './CustomPagination';

function WalkingTrail() {
  axios.get('/walking/'+3+'/'+10)
  .then(response => {
    // setWalkingTrails(response.data);
  })
  .catch(error => {
    console.error('Error fetching walkingTrail data: ', error);
  });
  
}

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

  const [currentPage, setCurrentPage] = useState(1);    // 현재 페이지
  const [postsPerPage, setPostsPerPage] = useState(10); // 한 페이지에 표시할 글 수
  const [totalBlock, setTotalBlock] = useState('');
  const [totalRecord, setTotalRecord] = useState('');
  const [totalPages, setTotalPages] = useState(1);      // 전체 페이지수
  const [walkingTrails, setWalkingTrails] = useState([]);   // 가져온 게시물 목록





  // useEffect(() => {
  //   axios.get(`/walking/list`, {
  //     params: {
  //       page: currentPage,        // 현재 페이지
  //       numPerPage: postsPerPage  // 페이지당 게시물 수
  //     }
  //   })
  //   .then((response) => {
  //     setWalkingTrails(response.data.items);    // 서버에서 가져온 데이터 설정
  //     setTotalPages(response.data.totalPages);  // 서버에서 반환된 총 페이지수 설정
  //   })
  //   .catch((error) => {
  //     console.error('Error fetching walking trail data: ', error);
  //   });
  // }, [currentPage, postsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  // useEffect(() => {
  //   axios.get('/api/your-endpoint')
  //     .then(response => {
  //       const totalPosts = response.data.totalPosts;  // 전체 게시글 수를 백엔드에서 받음
  //       const pages = Math.ceil(totalPosts / postsPerPage);  // 페이지 수 계산
  //       setTotalPages(pages);  // totalPages 값 설정
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, [postsPerPage]);
  






  function SearchWalkingTrail(){
    if(searchCategory == 'null'){
      alert('카테고리를 선택하십시오')

    }else{
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

  }
  useEffect(() => {
    // 백엔드로부터 게시글 데이터를 가져옴
    // axios.get('/walking/'+3+'/'+10)
    // .then(response => {
    //   console.log(response.data)
    //   setWalkingTrails(response.data);
    // })
    // .catch(error => {
    //   console.error('Error fetching walkingTrail data: ', error);
    // });

    
    axios.post('/walking/list',{
      'page' : currentPage,
      'numPerPage' : postsPerPage,
      'keyField' : searchCategory,
      'keyWord' : searchInput
    })
    .then(response => {
      console.log(response.data)
      setWalkingTrails(response.data.list);
      setTotalRecord(response.data.totalRecord);
      setTotalBlock(Math.ceil(response.data.totalRecord / postsPerPage));
    })
    .catch(error => {
      console.error('Error fetching walkingTrail data: ', error);
    });
  }, [currentPage]);
  
  const [posts, setPosts] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [searchCategory, setSearchCategory] = useState('id');

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const filteredPosts = walkingTrails.filter((post,i) => {
   
    return i>=indexOfFirstPost && i<=indexOfLastPost;
  });

  //const currentPosts = walkingTrails.get .slice(indexOfFirstPost, indexOfLastPost);

  // const handlePageChange = (pageNumber) => {
  //   axios.get(`/walking/list?page=${pageNumber}&size=${postsPerPage}`)
  //        .then(response => {
  //         setWalkingTrails(response.data.content);    // 해당 페이지의 데이터를 설정
  //         setCurrentPage(pageNumber);                 // 현재 페이지 업데이트
  //        })
  //        .catch(error => {
  //         console.error('Error fetching walkingTrail data: ', error);
  //        });
  // };

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

   //const totalPages = Math.ceil(총레코드 수 / postsPerPage);

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
          {filteredPosts.map((walkingTrails) => (
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
        {totalPages > 0 && 
        Array.from({ length: totalBlock }, (_, i) => i + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={currentPage === pageNumber ? 'active' : ''}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      {/* <div>
        {totalPages > 0 && (
          <CustomPagination
            pageCount={Math.max(1, totalPages - 1)}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        )}
      </div> */}

      <div className="search">
        <select value={searchCategory} onChange={handleCategoryChange} className="search-select">
          <option value="null">선택</option>
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