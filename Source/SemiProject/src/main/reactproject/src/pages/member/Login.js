import React, { useState, useEffect } from "react";
import { Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/Login.css"; // 스타일 시트 임포트

const Login = ({ setIsLoggedIn }) => {
  // 사용자의 입력값 (아이디와 비밀번호) 상태 관리
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  // 로그인 실패 시 오류 메시지 표시 상태 관리
  const [showError, setShowError] = useState(false);
  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(false);
  // 페이지 이동을 위한 useNavigate 훅
  const navigate = useNavigate();

  // 컴포넌트가 렌더링될 때, sessionStorage나 localStorage에 저장된 아이디를 가져옴
  useEffect(() => {
    // sessionStorage에서 username을 가져옴
    const sessionUsername = sessionStorage.getItem('username');
    
    if (!sessionUsername) {
      // sessionStorage에 username이 없으면 localStorage에서 username을 삭제
      localStorage.removeItem('username');
    }

    // localStorage에서 저장된 username을 불러옴
    const savedUsername = localStorage.getItem('username');
    // sessionStorage에 username이 있으면 그 값을 설정, 그렇지 않으면 localStorage에서 가져옴
    if (sessionUsername) {
      setCredentials(prevState => ({ ...prevState, username: sessionUsername }));
    } else if (savedUsername) {
      setCredentials(prevState => ({ ...prevState, username: savedUsername }));
    }
  }, []);

  // input 필드 값 변경 시 credentials 상태를 업데이트하는 함수
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // 로그인 처리 함수
  const handleSubmit = async (event) => {
    event.preventDefault(); // 폼 제출 시 페이지 리로드 방지
    setIsLoading(true); // 로딩 상태 활성화

    try {
      // 서버에 로그인 요청 (아이디와 비밀번호 전송)
      const response = await axios.post("/member/login", {
        id: credentials.username,
        pwd: credentials.password
      });

      if (response.data.success) {
        // 로그인 성공 시, 상태와 sessionStorage, localStorage에 사용자 정보 저장
        setIsLoggedIn(true);
        sessionStorage.setItem('username', credentials.username);
        localStorage.setItem('username', credentials.username);
        navigate("/main"); // 메인 페이지로 이동
      } else {
        // 로그인 실패 시 오류 메시지 표시
        setShowError(true);
      }
    } catch (error) {
      // 로그인 요청 중 오류 발생 시 처리
      console.error("로그인 요청 실패:", error);
      setShowError(true); // 오류 메시지 표시
    } finally {
      // 로딩 상태 종료
      setIsLoading(false);
    }
  };

  // 회원가입 페이지로 이동하는 함수
  const handleSignUp = () => {
    navigate("/register"); // 회원가입 페이지로 이동
  };

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/member/background.jpg)` }} // 배경 이미지 설정
    >
      <div className="sign-in__backdrop"></div> {/* 배경 위에 어두운 레이어 추가 */}

      {/* 로그인 폼 */}
      <form 
        className="shadow p-4 bg-white rounded" 
        // style={{ border: '2px solid black' }}  // 검정색 테두리 추가
        onSubmit={handleSubmit}
      >
        {/* 로고 이미지 */}
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={process.env.PUBLIC_URL + '/img/member/logo5.png'}
          alt="logo"
        />
        <div className="h4 mb-2 text-center">로그인</div>

        {/* 로그인 실패 시 오류 메시지 표시 */}
        {showError && (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShowError(false)} // 닫기 버튼 클릭 시 오류 메시지 숨김
            dismissible
          >
            아이디 또는 비밀번호가 올바르지 않습니다.
          </Alert>
        )}

        {/* 아이디 입력 필드 */}
        <div className="mb-2">
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            name="username"
            id="username"
            value={credentials.username}
            placeholder="아이디를 입력하세요."
            onChange={handleChange} // 입력된 값을 상태에 반영
            required
            className="form-control"
            // style={{ border: '2px solid black' }}
          />
        </div>

        {/* 비밀번호 입력 필드 */}
        <div className="mb-2">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            name="password"
            id="password"
            value={credentials.password}
            placeholder="비밀번호를 입력하세요."
            onChange={handleChange} // 입력된 값을 상태에 반영
            required
            className="form-control"
            // style={{ border: '2px solid black' }}
          />
        </div>

        {/* 로그인 버튼 */}
        <Button
          className="w-100 mb-3"
          variant="primary"
          type="submit"
          disabled={isLoading} // 로딩 중에는 버튼 비활성화
        >
          {isLoading ? "로딩중.." : "로그인"}
        </Button>

        {/* 회원가입 버튼 */}
        <Button className="w-100" variant="secondary" onClick={handleSignUp}>
          회원가입
        </Button>
      </form>
    </div>
  );
};

export default Login;
