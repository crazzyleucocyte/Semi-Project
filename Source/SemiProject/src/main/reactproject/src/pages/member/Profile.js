import React, { useState, useEffect } from "react";
import { Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // useNavigate 가져오기
import "../../assets/Profile2.css"; // CSS 파일 임포트
// import BackgroundImage from "./../assets/background.jpg"; // 배경 이미지
// import Logo from './../assets/logo.png'; // 로고 이미지

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [showSuccess, setShowSuccess] = useState(false); // 성공 메시지 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

  // API로 회원 정보 조회 (useEffect로 초기값 설정)
  useEffect(() => {
    setUserInfo({ name: "홍길동", email: "hong@test.com", phone: "010-1234-5678" });
  }, []);

  // input 필드 값 변경 시 userInfo 상태 업데이트
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  // 회원정보 수정 시 처리하는 함수
  const handleSave = async (event) => {
    event.preventDefault();
    setIsLoading(true); // 로딩 상태 시작
    await new Promise((resolve) => setTimeout(resolve, 500)); // 인위적으로 지연

    console.log("수정된 정보:", userInfo);

    setShowSuccess(true); // 성공 메시지 표시
    setIsLoading(false); // 로딩 상태 종료
  };

  // 비밀번호 변경 버튼 클릭 시 비밀번호 변경 페이지로 이동
  const handlePasswordChange = () => {
    navigate("/password-change");
  };

  // 회원 탈퇴 버튼 클릭 시 회원 탈퇴 확인 및 처리
  const handleDeleteAccount = () => {
    const isConfirmed = window.confirm("정말로 탈퇴하시겠습니까?");
    
    if (isConfirmed) {
      // 회원 탈퇴 API 호출
      console.log("회원 탈퇴 처리");
      navigate("/"); // 탈퇴 후 메인 페이지로 이동
    } else {
      console.log("회원 탈퇴 취소");
    }
  };

  return (
    <div
      className="profile__wrapper"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/member/background.jpg)` }} // 배경 이미지 설정
    >
      <div className="profile__backdrop"></div> {/* 배경 위에 어두운 레이어 */}
      
      {/* 회원 정보 폼 */}
      <form className="shadow p-4 bg-white rounded" onSubmit={handleSave}>
        {/* 로고 이미지 */}
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={process.env.PUBLIC_URL+'/img/member/logo.png'}
          alt="logo"
        />

        {/* 회원정보 제목 */}
        <div className="h4 mb-2 text-center">회원 정보</div>

        {/* 회원정보 수정 성공 메시지 */}
        {showSuccess && (
          <Alert
            className="mb-2"
            variant="success"
            onClose={() => setShowSuccess(false)} // 닫기 버튼 클릭 시 성공 메시지 숨김
            dismissible
          >
            회원 정보가 성공적으로 수정되었습니다.
          </Alert>
        )}

        {/* 이름 입력 필드 */}
        <div className="mb-2">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            name="name"
            id="name"
            value={userInfo.name}
            placeholder="이름을 입력하세요."
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        {/* 이메일 입력 필드 */}
        <div className="mb-2">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            name="email"
            id="email"
            value={userInfo.email}
            placeholder="이메일을 입력하세요."
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        {/* 전화번호 입력 필드 */}
        <div className="mb-2">
          <label htmlFor="phone">전화번호</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={userInfo.phone}
            placeholder="전화번호를 입력하세요."
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        {/* 수정 버튼 */}
        <Button
          className="w-100 mb-3"
          variant="primary"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "저장중.." : "수정"} {/* 로딩 중일 때 버튼 텍스트 변경 */}
        </Button>

        {/* 비밀번호 변경 버튼 */}
        <Button
          className="w-100 mb-3"
          variant="secondary"
          onClick={handlePasswordChange}
        >
          비밀번호 변경
        </Button>

        {/* 회원 탈퇴 버튼 */}
        <Button
          className="w-100"
          variant="danger"
          onClick={handleDeleteAccount} // 회원 탈퇴 기능 호출
        >
          회원 탈퇴
        </Button>
      </form>
    </div>
  );
};

export default Profile;