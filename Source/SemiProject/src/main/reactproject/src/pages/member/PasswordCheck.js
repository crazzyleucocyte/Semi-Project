import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/Profile2.css";

const PasswordCheck = () => {
  const [password, setPassword] = useState(""); // 입력된 비밀번호 상태
  const [showError, setShowError] = useState({ show: false, message: "" }); // 에러 상태
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const userId = localStorage.getItem("username");
  const navigate = useNavigate();

  // 비밀번호 입력 시 상태 업데이트
  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  // 비밀번호 확인 처리 함수 (axios 적용)
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    // 서버에서 비밀번호 가져오기
    axios
      .get(`/member/getPassword/${userId}`)  // 비밀번호를 GET 요청으로 가져옴
      .then((response) => {
        setIsLoading(false);
        
        const savedPassword = response.data.password; // 서버에서 받은 비밀번호
        if (savedPassword === password) {  // 비밀번호 비교
          navigate("/profile"); // 비밀번호가 맞으면 Profile 페이지로 이동
        } else {
          setShowError({ show: true, message: "비밀번호가 일치하지 않습니다." });
          setPassword(""); // 비밀번호 필드 초기화
        }
      })
      .catch((error) => {
        console.error("비밀번호 확인 중 오류 발생:", error);
        setShowError({
          show: true,
          message: error.response?.data || "서버 오류가 발생했습니다. 다시 시도해주세요.",
        });
        setIsLoading(false);
      });
  };

  return (
    <div className="profile__wrapper">
      {/* 배경 관련 요소 삭제 */}
      <form 
        className="shadow p-4 bg-white rounded" 
        // style={{ border: '2px solid black' }}  // 검정색 테두리 추가
        onSubmit={handleSubmit}
      >
        {/* 로고 이미지 */}
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={process.env.PUBLIC_URL + "/img/member/logo5.png"}
          alt="logo"
        />

        {/* 비밀번호 입력 제목 */}
        <div className="h4 mb-2 text-center">비밀번호 입력</div>

        {/* 에러 메시지 */}
        {showError.show && (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShowError({ show: false, message: "" })}
            dismissible
          >
            {showError.message}
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
            // style={{ border: '2px solid black' }}
          />
        </div>

        {/* 확인 버튼 */}
        <Button className="w-100" variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "확인중..." : "확인"}
        </Button>
      </form>
    </div>
  );
};

export default PasswordCheck;
