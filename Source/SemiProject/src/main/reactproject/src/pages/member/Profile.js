import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; 
import "../../assets/Profile2.css";

const Profile = () => {
  // 사용자의 정보를 저장할 상태 선언
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

  // 성공 메시지 표시를 위한 상태
  const [showSuccess, setShowSuccess] = useState(false); 
  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(false); 

  // 페이지 이동을 위한 navigate 훅
  const navigate = useNavigate(); 
  // 현재 로그인된 사용자의 ID를 로컬 스토리지에서 가져옴
  const userId = localStorage.getItem("username");

  // 컴포넌트가 처음 렌더링될 때, 회원 정보를 가져오는 useEffect 훅
  useEffect(() => {
    axios
      .get(`/member/profile/${userId}`)  // 서버에서 회원 정보를 가져옴
      .then((response) => {
        setUserInfo(response.data); // 가져온 정보를 상태에 저장
      })
      .catch((error) => {
        console.error("회원 정보를 가져오는 중 오류 발생:", error);
      });
  }, [userId]);

  // input 필드 값이 변경될 때 userInfo 상태 업데이트
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  // 회원 정보 저장(수정) 처리 함수
  const handleSave = (event) => {
    event.preventDefault(); // 폼 제출 시 페이지 리로드 방지
    console.log(userInfo);
    setIsLoading(true); // 로딩 상태 활성화

    axios.put(`/member/profile/${userId}`, userInfo)  // 서버에 수정된 회원 정보를 전송
      .then((response) => {
        console.log("response = " , response);
        console.log("수정된 정보:", userInfo);
        setShowSuccess(true);  // 성공 메시지 표시
        setIsLoading(false);  // 로딩 상태 비활성화
      })
      .catch((error) => {
        console.error("회원 정보를 수정하는 중 오류 발생:", error);
        setIsLoading(false);  // 에러 발생 시 로딩 상태 비활성화
      });
  };

  // 비밀번호 변경 페이지로 이동하는 함수
  const handlePasswordChange = () => {
    navigate("/password-change"); // 비밀번호 변경 페이지로 이동
  };

  // 회원 탈퇴 처리 함수
  const handleDeleteAccount = () => {
    // 탈퇴 여부를 묻는 확인창
    const isConfirmed = window.confirm("정말로 탈퇴하시겠습니까?");
    
    if (isConfirmed) {
      axios
        .delete(`/member/profile/${userId}`)  // 서버에 탈퇴 요청
        .then((response) => {
          console.log("회원 탈퇴 처리:", response.data);
          // 탈퇴 후 로컬 스토리지와 세션 스토리지를 삭제
          localStorage.clear(); 
          sessionStorage.clear(); 
          // 탈퇴 후 메인 페이지로 이동
          navigate("/");  
          window.alert("탈퇴가 완료되었습니다.")
        })
        .catch((error) => {
          console.error("회원 탈퇴 중 오류 발생:", error);
        });
    } else {
      console.log("회원 탈퇴 취소"); // 탈퇴 취소 시 로그 출력
    }
  };

  return (
    <div className="profile__wrapper">
      {/* 회원 정보 수정 폼 */}
      <form 
        className="shadow p-4 bg-white rounded" 
        // style={{ border: '2px solid black' }}  // 검정색 테두리 추가
        onSubmit={handleSave}
      >
        {/* 로고 이미지 */}
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={process.env.PUBLIC_URL + '/img/member/logo5.png'}
          alt="logo"
        />

        <div className="h4 mb-2 text-center">회원 정보</div>

        {/* 성공 메시지 표시 */}
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
            // style={{ border: '2px solid black' }}
          ></input>
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
            // style={{ border: '2px solid black' }}
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
            // style={{ border: '2px solid black' }}
          />
        </div>

        {/* 성별 선택 필드 */}
        <div className="mb-2">
          <label htmlFor="gender">성별</label>
          <select
            name="gender"
            id="gender"
            value={userInfo.gender}
            onChange={handleChange}
            required
            className="form-control"
            // style={{ border: '2px solid black' }}
          >
            <option value="">성별을 선택하세요</option>
            <option value="M">남자</option>
            <option value="F">여자</option>
            <option value="N">선택안함</option>
          </select>
        </div>

        {/* 가입일 필드 (숨김 처리) */}
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

        {/* 마지막 수정일 필드 (숨김 처리) */}
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

        {/* 회원 정보 수정 버튼 */}
        <Button
          className="w-100 mb-3"
          variant="primary"
          type="submit"
          disabled={isLoading}  // 로딩 상태일 때 버튼 비활성화
        >
          {isLoading ? "저장중.." : "수정"}
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
          onClick={handleDeleteAccount}
        >
          회원 탈퇴
        </Button>
      </form>
    </div>
  );
};

export default Profile;
