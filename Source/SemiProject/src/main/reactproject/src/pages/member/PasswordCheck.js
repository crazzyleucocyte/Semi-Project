import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../assets/Profile2.css"; // CSS 파일 임포트
// import BackgroundImage from "./../assets/background.jpg";
// import Logo from "./../assets/logo.png";

const PasswordCheck = () => {
  const [password, setPassword] = useState(""); // 입력된 비밀번호를 저장하는 상태
  const [showError, setShowError] = useState(false); // 에러 메시지 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const navigate = useNavigate();

  // 비밀번호 입력 시 상태 업데이트
  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  // 비밀번호 확인 처리 함수
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // 여기에 실제 비밀번호 확인 API를 호출하는 로직을 추가할 수 있습니다.
    // 지금은 간단하게 '1234'로 설정한 경우에만 성공한 것으로 처리합니다.
    await new Promise((resolve) => setTimeout(resolve, 500)); // 인위적 지연

    if (password === "1234") { // 예시: 실제 비밀번호 확인 로직을 여기에 추가
      setIsLoading(false);
      navigate("/profile"); // 비밀번호가 맞으면 Profile 페이지로 이동
    } else {
      setShowError(true); // 비밀번호가 틀리면 에러 메시지 표시
      setIsLoading(false);
    }
  };

  return (
    <div
      className="profile__wrapper"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/member/background.jpg)` }}
    >
      <div className="profile__backdrop"></div> {/* 배경 위에 어두운 레이어 */}

      <form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        {/* 로고 이미지 */}
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={process.env.PUBLIC_URL+'/img/member/logo.png'}
          alt="logo"
        />

        {/* 비밀번호 입력 제목 */}
        <div className="h4 mb-2 text-center">비밀번호 입력</div>

        {/* 에러 메시지 */}
        {showError && (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShowError(false)} // 닫기 버튼 클릭 시 에러 숨김
            dismissible
          >
            비밀번호가 일치하지 않습니다.
          </Alert>
        )}

        {/* 비밀번호 입력 필드 */}
        <div className="mb-3">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            placeholder="비밀번호를 입력하세요."
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        {/* 확인 버튼 */}
        <Button
          className="w-100"
          variant="primary"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "확인중..." : "확인"}
        </Button>
      </form>
    </div>
  );
};

export default PasswordCheck;