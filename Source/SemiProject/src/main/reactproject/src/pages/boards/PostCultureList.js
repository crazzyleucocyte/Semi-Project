import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../assets/PostList.css';
import axios from 'axios';

function PostCultureList({ likes, onLike }) {
  const { id } = useParams();
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

  // const [isLiked, setIsLiked] = useState(false);
  const userId = localStorage.getItem('username');
  const [like, setLike] = useState(false);
 
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

  const handleLike = async (cid) => {
    try {
      const response = await axios.post(`/api/like`,{
        lId:userId,
        no:cid
      });
      console.log(response.data);

      setCulture(prevTrails => prevTrails.map(trail => 
        trail.cid === cid 
          ? {
            ...trail, 
            likeCount: trail.isLiked ? trail.likeCount - 1 : trail.likeCount + 1,
            isLiked: !trail.isLiked
          } 
          : trail
      ));
      } catch (error) {
        console.error('좋아요 처리 중 오류 발생:', error);
        alert('좋아요 처리 중 오류가 발생했습니다.');
      }
    };

    useEffect(() => {
      // 백엔드로부터 게시글 데이터를 가져옴
      axios.get('/culture/'+ id)
      .then(response => {
        console.log(response.data);
        setCulture(response.data);
        console.log(culture);
      })
      .catch(error => {
        console.error('Error fetching walkingTrail data: ', error);
      });
    }, [like]);

    useEffect(() => {
      const storedUserId = localStorage.getItem('username');
      console.log('저장된 사용자 ID:', storedUserId);
      // userId 상태를 설정하는 로직이 있다면 여기에 추가
    }, []);

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
                  <button onClick={()=>handleLike(culture.wid)} className='likeBtn'>
                    {culture.isLiked ? '💔 취소' : '❤️ 좋아요'} {culture.likeCount || 0}
                  </button>&emsp;
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
