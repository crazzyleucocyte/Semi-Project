import React, { useState, useEffect } from "react";
import { Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // useNavigate 가져오기
import "../assets/Profile2.css"; // CSS 파일 임포트
import BackgroundImage from "./../assets/background.jpg"; // 배경 이미지
import Logo from "./../assets/logo.png"; // 로고 이미지

const PasswordChange = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showSuccess, setShowSuccess] = useState(false); // 성공 메시지 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

  // input 필드 값 변경 시 passwords 상태 업데이트
  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  // 비밀번호 변경 시 처리하는 함수
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }
    setIsLoading(true); // 로딩 상태 시작
    await new Promise((resolve) => setTimeout(resolve, 500)); // 인위적으로 지연

    console.log("비밀번호 변경:", passwords);

    setShowSuccess(true); // 성공 메시지 표시
    setIsLoading(false); // 로딩 상태 종료
  };

  // 취소 버튼 클릭 시 프로필 페이지로 이동
  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <div
      className="profile__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }} // 배경 이미지 설정
    >
      <div className="profile__backdrop"></div> {/* 배경 위에 어두운 레이어 */}
      
      {/* 비밀번호 변경 폼 */}
      <form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        {/* 로고 이미지 */}
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={Logo}
          alt="logo"
        />

        {/* 비밀번호 변경 제목 */}
        <div className="h4 mb-2 text-center">비밀번호 변경</div>

        {/* 비밀번호 변경 성공 메시지 */}
        {showSuccess && (
          <Alert
            className="mb-2"
            variant="success"
            onClose={() => setShowSuccess(false)} // 닫기 버튼 클릭 시 성공 메시지 숨김
            dismissible
          >
            비밀번호가 성공적으로 변경되었습니다.
          </Alert>
        )}

        {/* 현재 비밀번호 입력 필드 */}
        <div className="mb-2">
          <label htmlFor="currentPassword">현재 비밀번호</label>
          <input
            type="password"
            name="currentPassword"
            id="currentPassword"
            value={passwords.currentPassword}
            placeholder="현재 비밀번호를 입력하세요."
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        {/* 새 비밀번호 입력 필드 */}
        <div className="mb-2">
          <label htmlFor="newPassword">새 비밀번호</label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={passwords.newPassword}
            placeholder="새 비밀번호를 입력하세요."
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        {/* 새 비밀번호 확인 입력 필드 */}
        <div className="mb-2">
          <label htmlFor="confirmPassword">새 비밀번호 확인</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={passwords.confirmPassword}
            placeholder="새 비밀번호를 다시 입력하세요."
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        {/* 저장 버튼 */}
        <Button
          className="w-100 mb-3"
          variant="primary"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "저장중.." : "변경"} {/* 로딩 중일 때 버튼 텍스트 변경 */}
        </Button>

        {/* 취소 버튼 */}
        <Button
          className="w-100"
          variant="secondary"
          onClick={handleCancel}
        >
          취소
        </Button>
      </form>
    </div>
  );
};

export default PasswordChange;