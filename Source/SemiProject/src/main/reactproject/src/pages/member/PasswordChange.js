import React, { useState, useEffect } from "react";
import axios from "axios"; // axios 임포트 추가
import { Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 
import "../../assets/Profile2.css"; 

const PasswordChange = () => {
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showSuccess, setShowSuccess] = useState(false); 
  const [isLoading, setIsLoading] = useState(false); 
  const navigate = useNavigate(); 
  const userId = localStorage.getItem("username");  // 현재 로그인된 사용자의 ID 가져오기

  // input 필드 값 변경 시 passwords 상태 업데이트
  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  // 비밀번호 변경 시 처리하는 함수
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // 새 비밀번호와 확인 비밀번호가 일치하는지 확인
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsLoading(true); // 로딩 상태 시작

    try {
      // 비밀번호 변경 요청 (axios 사용)
      const response = await axios.put(`/member/changePassword/${userId}`, {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });

      console.log("비밀번호 변경 성공:", response.data);

      setShowSuccess(true); // 성공 메시지 표시
      setIsLoading(false); // 로딩 상태 종료
      localStorage.clear();
      sessionStorage.clear();
      navigate("/")
    } catch (error) {
      console.error("비밀번호 변경 중 오류 발생:", error);
      alert("현재 비밀번호가 일치하지 않습니다.");
      setIsLoading(false); // 로딩 상태 종료
    }
  };

  // 취소 버튼 클릭 시 프로필 페이지로 이동
  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <div
      className="profile__wrapper"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/member/background.jpg)` }} 
    >
      <div className="profile__backdrop"></div> 
      
      <form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={process.env.PUBLIC_URL+'/img/member/logo.png'}
          alt="logo"
        />

        <div className="h4 mb-2 text-center">비밀번호 변경</div>

        {showSuccess && (
          <Alert
            className="mb-2"
            variant="success"
            onClose={() => setShowSuccess(false)} 
            dismissible
          >
            비밀번호가 성공적으로 변경되었습니다.
          </Alert>
        )}

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

        <Button
          className="w-100 mb-3"
          variant="primary"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "저장중.." : "변경"}
        </Button>

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