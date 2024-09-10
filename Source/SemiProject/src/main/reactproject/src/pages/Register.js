import React, { useState } from "react";
import { Button, Alert, FormCheck } from "react-bootstrap";
import "../assets/Register.css";
import BackgroundImage from "./../assets/background.jpg";
import Logo from "./../assets/logo.png";

const Signup = () => {
  // 폼 데이터 상태를 관리하는 상태 변수
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    phone: '',
    email: '',
    gender: '',
    password: '',
    confirmPassword: '',
    ssnFirst: '',  // 주민번호 앞 6자리
    ssnSecond: '', // 주민번호 뒤 7자리
  });

  // 오류 메시지를 보여줄지 여부를 관리하는 상태 변수
  const [showError, setShowError] = useState(false);

  // 로딩 상태를 관리하는 상태 변수
  const [isLoading, setIsLoading] = useState(false);

  // 약관 동의 체크 여부 상태 변수
  const [isAgreed, setIsAgreed] = useState(false);

  // 입력 필드의 값이 변경될 때 폼 데이터를 업데이트하는 함수
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 약관 동의 체크박스가 변경될 때 상태를 업데이트하는 함수
  const handleAgreementChange = (e) => {
    setIsAgreed(e.target.checked);
  };

  // 주민번호 유효성을 확인하는 함수
  const validateSSN = () => {
    const { ssnFirst, ssnSecond } = formData;
    const ssn = ssnFirst + ssnSecond;
    const regex = /^[0-9]{6}[1-4][0-9]{6}$/; // 주민등록번호 형식: 앞자리 6자리 + 뒷자리 7자리 (첫 자리 1-4)
    return regex.test(ssn);
  };

  // 폼이 제출되었을 때 처리하는 함수
  const handleSubmit = async (event) => {
    event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
    setIsLoading(true); // 로딩 상태 시작

    // 인위적으로 0.5초 지연 (로딩 시뮬레이션)
    await new Promise((resolve) => setTimeout(resolve, 500));

    const { username, email, password, confirmPassword } = formData;

    // 비밀번호와 비밀번호 확인이 일치하는지 확인
    if (password !== confirmPassword) {
      setShowError(true); // 에러 메시지 표시
      setIsLoading(false); // 로딩 상태 종료
      return;
    }

    // 주민번호 유효성 검사 실패 시 경고 메시지
    if (!validateSSN()) {
      setShowError(true);
      setIsLoading(false);
      return;
    }

    // 약관 동의 여부 확인
    if (!isAgreed) {
      setShowError(true);
      setIsLoading(false);
      return;
    }

    console.log(`Username: ${username}, Email: ${email}, Password: ${password}`);
    
    // 여기에 회원가입 요청을 백엔드에 보내는 로직을 추가할 수 있습니다.

    setIsLoading(false); // 로딩 상태 종료
  };

  // 로그인 페이지로 이동하는 함수
  const handleLogin = () => {
    window.location.href = "/"; // 로그인 페이지로 리다이렉트
  };

  // 휴대폰 번호를 자동으로 '-' 형식으로 변경해주는 함수
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ''); // 숫자 이외의 문자는 제거
    if (value.length > 3 && value.length <= 7) {
      value = value.replace(/(\d{3})(\d{1,4})/, '$1-$2'); // 형식: 000-0000
    } else if (value.length > 7) {
      value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3'); // 형식: 000-0000-0000
    }
    setFormData({ ...formData, phone: value });
  };

  return (
    <div
      className="sign-up__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }} // 배경 이미지 설정
    >
      <div className="sign-up__backdrop"></div> {/* 배경 위에 어두운 레이어 추가 */}

      {/* 회원가입 폼 */}
      <form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        {/* 로고 이미지 */}
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={Logo}
          alt="logo"
        />

        {/* 회원가입 폼 제목 */}
        <div className="h4 mb-2 text-center">회원가입</div>

        {/* 비밀번호 불일치 또는 주민번호 오류 시 경고 메시지 표시 */}
        {showError && (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShowError(false)} // 경고창 닫기 버튼 클릭 시
            dismissible // 경고창 닫기 기능 활성화
          >
            비밀번호가 일치하지 않거나 유효하지 않은 주민번호입니다. 또는 약관에 동의해주세요.
          </Alert>
        )}

        {/* 아이디 입력 필드 */}
        <div className="mb-2">
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            placeholder="아이디를 입력하세요."
            onChange={handleChange} // 값이 변경될 때 상태 업데이트
            required
            className="form-control"
          />
        </div>

        {/* 이름 입력 필드 */}
        <div className="mb-2">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            placeholder="이름을 입력하세요."
            onChange={handleChange} // 값이 변경될 때 상태 업데이트
            required
            className="form-control"
          />
        </div>

        {/* 휴대폰 번호 입력 필드 */}
        <div className="mb-2">
          <label htmlFor="phone">휴대폰 번호</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={formData.phone}
            placeholder="010-1234-5678 '-'자동입니다."
            onChange={handlePhoneChange} // 휴대폰 번호 형식 자동 처리
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
            value={formData.email}
            placeholder="이메일을 입력하세요."
            onChange={handleChange} // 값이 변경될 때 상태 업데이트
            required
            className="form-control"
          />
        </div>

        {/* 성별 선택 필드 */}
        <div className="mb-2">
          <label htmlFor="gender">성별</label>
          <select
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={handleChange} // 선택이 변경될 때 상태 업데이트
            required
            className="form-control"
          >
            <option value="">성별을 선택하세요</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
        </div>

        {/* 주민등록번호 입력 필드 */}
        <div className="mb-2">
          <label htmlFor="ssn">주민등록번호</label>
          <div className="d-flex">
            <input
              type="text"
              name="ssnFirst"
              id="ssnFirst"
              value={formData.ssnFirst}
              placeholder="앞 6자리"
              maxLength="6"
              onChange={handleChange}
              required
              className="form-control me-2"
            />
            <input
              type="password"
              name="ssnSecond"
              id="ssnSecond"
              value={formData.ssnSecond}
              placeholder="뒤 7자리"
              maxLength="7"
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
        </div>

        {/* 비밀번호 입력 필드 */}
        <div className="mb-2">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            placeholder="비밀번호를 입력하세요."
            onChange={handleChange} // 값이 변경될 때 상태 업데이트
            required
            className="form-control"
          />
        </div>

        {/* 비밀번호 확인 입력 필드 */}
        <div className="mb-3">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            placeholder="비밀번호를 다시 입력하세요."
            onChange={handleChange} // 값이 변경될 때 상태 업데이트
            required
            className="form-control"
          />
        </div>

        {/* 약관 동의 체크박스 */}
    <div className="mb-3 d-flex justify-content-between align-items-center">
      <label htmlFor="termsCheck" className="mb-0">
      회원가입 약관에 동의합니다.
    </label>
    <input
     type="checkbox"
      id="termsCheck"
      checked={isAgreed}
      onChange={handleAgreementChange} // 약관 동의 체크 상태 업데이트
      required
      className="custom-checkbox"
   />
    </div>
        {/* 회원가입 버튼 */}
        <Button
          className="w-100 mb-3"
          variant="primary"
          type="submit"
          disabled={isLoading} // 로딩 중일 때 버튼 비활성화
        >
          {isLoading ? "로딩중.." : "회원가입"} {/* 로딩 상태에 따라 버튼 텍스트 변경 */}
        </Button>

        {/* 로그인 버튼 */}
        <Button
          className="w-100"
          variant="secondary"
          onClick={handleLogin} // 로그인 페이지로 이동
        >
          로그인
        </Button>
      </form>
    </div>
  );
};

export default Signup;