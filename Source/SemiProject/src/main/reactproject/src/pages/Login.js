import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // useNavigate 가져오기
import '../assets/Login.css';
import BackgroundImage from "./../assets/background.jpg";
import Logo from "./../assets/logo.png";

const Login = () => {
  // 로그인 정보를 저장하는 상태 (아이디와 비밀번호)
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  // 로그인 실패 시 에러 메시지를 보여줄 상태
  const [showError, setShowError] = useState(false);

  // 로그인 버튼 클릭 시 로딩 상태를 나타내기 위한 상태
  const [isLoading, setIsLoading] = useState(false);

  // 페이지 이동을 위한 useNavigate 훅 선언
  const navigate = useNavigate();

  // input 필드 값 변경 시 credentials 상태 업데이트
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // 로그인 폼 제출 시 처리하는 함수
  const handleSubmit = async (event) => {
    event.preventDefault(); // 폼 제출 시 페이지 리로드 방지
    setIsLoading(true); // 로딩 상태 시작

    // 인위적으로 0.5초의 지연을 줌 (로딩 상태 시뮬레이션)
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { username, password } = credentials;
    console.log(`Username: ${username}, Password: ${password}`);

    // 로그인 검증: 아이디 또는 비밀번호가 올바르지 않을 경우 에러 메시지 표시
    if (username !== "admin" || password !== "admin") {
      setShowError(true); // 에러 상태 설정
    }

    setIsLoading(false); // 로딩 상태 종료
  };

  // 회원가입 버튼 클릭 시 회원가입 페이지로 이동
  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }} // 배경 이미지 설정
    >
      <div className="sign-in__backdrop"></div> {/* 배경 위에 어두운 레이어 */}
      
      {/* 로그인 폼 */}
      <form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        {/* 로고 이미지 */}
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={Logo}
          alt="logo"
        />

        {/* 로그인 제목 */}
        <div className="h4 mb-2 text-center">로그인</div>

        {/* 로그인 실패 시 표시되는 에러 메시지 */}
        {showError && (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShowError(false)} // 닫기 버튼 클릭 시 에러 메시지 숨김
            dismissible // 경고창 닫기 기능 활성화
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
            onChange={handleChange} // 입력 시 상태 업데이트
            required
            className="form-control"
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
            onChange={handleChange} // 입력 시 상태 업데이트
            required
            className="form-control"
          />
        </div>

        {/* 로그인 버튼 */}
        <Button
          className="w-100 mb-3"
          variant="primary"
          type="submit"
          disabled={isLoading} // 로딩 중일 때 버튼 비활성화
        >
          {isLoading ? "로딩중.." : "로그인"} {/* 로딩 중일 때 버튼 텍스트 변경 */}
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