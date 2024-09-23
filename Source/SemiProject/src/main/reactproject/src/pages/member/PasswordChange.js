import React, { useState } from "react";
import axios from "axios"; // axios를 이용한 비동기 통신을 위해 axios 임포트
import { Button, Alert } from "react-bootstrap"; // Bootstrap 스타일 버튼과 Alert 사용
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 훅 사용
import "../../assets/Profile2.css"; // CSS 파일 임포트

const PasswordChange = () => {
  // 비밀번호 입력 필드의 상태 관리
  const [passwords, setPasswords] = useState({
    currentPassword: "", // 현재 비밀번호
    newPassword: "",     // 새 비밀번호
    confirmPassword: "", // 새 비밀번호 확인
  });

  // 성공 메시지 표시 여부를 관리하는 상태
  const [showSuccess, setShowSuccess] = useState(false); 
  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(false); 
  // 페이지 이동을 위한 useNavigate 훅 사용
  const navigate = useNavigate(); 
  // 현재 로그인된 사용자의 ID를 로컬 스토리지에서 가져오기
  const userId = localStorage.getItem("username");  

  // 입력 필드 값이 변경될 때 passwords 상태를 업데이트하는 함수
  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  // 비밀번호 변경을 처리하는 함수
  const handleSubmit = async (event) => {
    event.preventDefault(); // 폼 제출 시 페이지 리로드 방지
    
    // 새 비밀번호와 확인 비밀번호가 일치하는지 확인
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsLoading(true); // 로딩 상태 활성화

    try {
      // 비밀번호 변경 요청을 서버에 전송 (axios 사용)
      const response = await axios.put(`/member/changePassword/${userId}`, {
        currentPassword: passwords.currentPassword, // 현재 비밀번호
        newPassword: passwords.newPassword,         // 새 비밀번호
      });

      console.log("비밀번호 변경 성공:", response.data);

      setShowSuccess(true); // 성공 메시지 표시
      setIsLoading(false); // 로딩 상태 비활성화
      localStorage.clear(); // 비밀번호 변경 후 로컬 스토리지 삭제
      sessionStorage.clear(); // 세션 스토리지 삭제
      window.alert("비밀번호 변경이 완료되었습니다."); // 변경 완료 알림
      navigate("/"); // 메인 페이지로 이동
    } catch (error) {
      // 비밀번호 변경 실패 시 에러 처리
      console.error("비밀번호 변경 중 오류 발생:", error);
      alert("현재 비밀번호가 일치하지 않습니다."); // 에러 메시지 표시
      setIsLoading(false); // 로딩 상태 비활성화
    }
  };

  // 취소 버튼 클릭 시 프로필 페이지로 이동하는 함수
  const handleCancel = () => {
    navigate("/profile");
  };

  return (
    <div className="profile__wrapper">
      {/* 비밀번호 변경 폼 */}
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

        {/* 비밀번호 변경 제목 */}
        <div className="h4 mb-2 text-center">비밀번호 변경</div>

        {/* 비밀번호 변경 성공 시 성공 메시지 표시 */}
        {showSuccess && (
          <Alert
            className="mb-2"
            variant="success"
            onClose={() => setShowSuccess(false)} // 닫기 버튼 클릭 시 메시지 숨김
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
            // style={{ border: '2px solid black' }}
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
            // style={{ border: '2px solid black' }}
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
            // style={{ border: '2px solid black' }}
          />
        </div>

        {/* 비밀번호 변경 버튼 */}
        <Button
          className="w-100 mb-3"
          variant="primary"
          type="submit"
          disabled={isLoading} // 로딩 중에는 버튼 비활성화
        >
          {isLoading ? "저장중.." : "변경"}
        </Button>

        {/* 취소 버튼 */}
        <Button
          className="w-100"
          variant="secondary"
          onClick={handleCancel} // 클릭 시 취소 처리
        >
          취소
        </Button>
      </form>
    </div>
  );
};

export default PasswordChange;