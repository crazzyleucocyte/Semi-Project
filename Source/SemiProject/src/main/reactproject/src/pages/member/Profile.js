import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 
import "../../assets/Profile2.css";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    id: "",
    pwd: "",
    name: "",
    memSsn: "",
    phone: "",
    email: "",
    gender: "",
    createDate: "",
    modifiedDate: "",
    isDeleted: "",
  });

  const [showSuccess, setShowSuccess] = useState(false); 
  const [isLoading, setIsLoading] = useState(false); 

  const navigate = useNavigate(); 
  const userId = localStorage.getItem("username");  // 현재 로그인된 사용자의 ID를 가져오는 로직이 필요

  // 회원 정보 가져오기 (axios 사용)
  useEffect(() => {
    axios
      .get(`/member/profile/${userId}`)  // 백엔드에서 회원 정보 가져오기
      .then((response) => {
        setUserInfo(response.data); // 가져온 회원 정보 설정
      })
      .catch((error) => {
        console.error("회원 정보를 가져오는 중 오류 발생:", error);
      });
  }, [userId]);

  // input 필드 값 변경 시 userInfo 상태 업데이트
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  // 회원정보 수정 시 처리하는 함수
  const handleSave = (event) => {
    event.preventDefault();
    console.log(userInfo);
    setIsLoading(true); 

    axios.put(`/member/profile/${userId}`, userInfo)  // 백엔드에 수정된 정보 전달
      .then((response) => {
        console.log("response = " , response);
        console.log("수정된 정보:", userInfo);
        setShowSuccess(true);  // 성공 메시지 표시
        setIsLoading(false);  // 로딩 상태 종료
      })
      .catch((error) => {
        console.error("회원 정보를 수정하는 중 오류 발생:", error);
        setIsLoading(false); 
      });
  };

  // 비밀번호 변경 버튼 클릭 시 비밀번호 변경 페이지로 이동
  const handlePasswordChange = () => {
    navigate("/password-change");
  };

  // 회원 탈퇴 버튼 클릭 시 회원 탈퇴 확인 및 처리
  const handleDeleteAccount = () => {
    const isConfirmed = window.confirm("정말로 탈퇴하시겠습니까?");
    
    if (isConfirmed) {
      axios
        .delete(`/member/profile/${userId}`)  // 백엔드에서 회원 탈퇴 처리
        .then((response) => {
          console.log("회원 탈퇴 처리:", response.data);
          localStorage.clear(); //탈퇴 후 localStorage 데이터 삭제 
          sessionStorage.clear(); // 탈퇴 후 sessionStorage 데이터 삭제
          navigate("/");  // 탈퇴 후 메인 페이지로 이동
        })
        .catch((error) => {
          console.error("회원 탈퇴 중 오류 발생:", error);
        });
    } else {
      console.log("회원 탈퇴 취소");
    }
  };

  return (
    <div
      className="profile__wrapper"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/member/background.jpg)` }} 
    >
      <div className="profile__backdrop"></div> 
      
      <form className="shadow p-4 bg-white rounded" onSubmit={handleSave}>
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={process.env.PUBLIC_URL + '/img/member/logo.png'}
          alt="logo"
        />

        <div className="h4 mb-2 text-center">회원 정보</div>

        {showSuccess && (
          <Alert
            className="mb-2"
            variant="success"
            onClose={() => setShowSuccess(false)} 
            dismissible
          >
            회원 정보가 성공적으로 수정되었습니다.
          </Alert>
        )}

        {/* 이름 필드 */}
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
          ></input>
        </div>

        {/* 이메일 필드 */}
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

        {/* 전화번호 필드 */}
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

        {/* 성별 필드 - 드롭다운으로 변경 */}
        <div className="mb-2">
          <label htmlFor="gender">성별</label>
          <select
            name="gender"
            id="gender"
            value={userInfo.gender}
            onChange={handleChange}
            required
            className="form-control"
          >
            <option value="">성별을 선택하세요</option>
            <option value="M">남자</option>
            <option value="F">여자</option>
            <option value="N">선택안함</option>
          </select>
        </div>

        {/* 가입일 필드 - 숨김 처리 */}
        <div className="mb-2" style={{ display: "none" }}>
          <label htmlFor="createDate">가입일</label>
          <input
            type="text"
            name="createDate"
            id="createDate"
            value={userInfo.createDate}
            placeholder="가입일을 입력하세요."
            onChange={handleChange}
            className="form-control"
            disabled  // 가입일은 수정 불가
          />
        </div>

        {/* 마지막 수정일 필드 - 숨김 처리 */}
        <div className="mb-2" style={{ display: "none" }}>
          <label htmlFor="modifiedDate">마지막 수정일</label>
          <input
            type="text"
            name="modifiedDate"
            id="modifiedDate"
            value={userInfo.modifiedDate}
            placeholder="마지막 수정일을 입력하세요."
            onChange={handleChange}
            className="form-control"
            disabled  // 마지막 수정일도 수정 불가
          />
        </div>

        <Button
          className="w-100 mb-3"
          variant="primary"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "저장중.." : "수정"}
        </Button>

        <Button
          className="w-100 mb-3"
          variant="secondary"
          onClick={handlePasswordChange}
        >
          비밀번호 변경
        </Button>

        <Button
          className="w-100"
          variant="danger"
          onClick={handleDeleteAccount}
        >
          회원 탈퇴
        </Button>
      </form>
    </div>
  );
};

export default Profile;