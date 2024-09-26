import React, { useState, useEffect } from "react";
import { Button, Alert } from "react-bootstrap";
import axios from "axios";
import "../../assets/Register.css"; // 회원가입 페이지에 적용할 CSS 파일

// 회원가입 컴포넌트 정의
const Signup = () => {
  // formData 상태로 폼 입력 값을 관리
  const [formData, setFormData] = useState({
    id: '',              // 사용자 아이디
    name: '',            // 사용자 이름
    phone: '',           // 사용자 휴대폰 번호
    email: '',           // 사용자 이메일
    gender: '',          // 성별
    password: '',        // 비밀번호
    confirmPassword: '', // 비밀번호 확인
    ssnFirst: '',        // 주민등록번호 앞자리
    ssnSecond: '',       // 주민등록번호 뒷자리
  });

  // 오류 메시지 상태
  const [showError, setShowError] = useState(false);
  // 로딩 상태
  const [isLoading, setIsLoading] = useState(false);
  // 약관 동의 여부 상태
  const [isAgreed, setIsAgreed] = useState(false);
  // 아이디 중복 여부 상태
  const [isIdTaken, setIsIdTaken] = useState(false);
  // 아이디 중복 체크 상태
  const [isCheckingId, setIsCheckingId] = useState(false);
  // 아이디가 확인되었는지 여부
  const [idChecked, setIdChecked] = useState(false);

  // 폼 입력 값이 변경될 때마다 상태를 업데이트
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "id") {
      setIdChecked(false); // 아이디가 변경되면 중복 체크 상태 초기화
    }
  };

  // 약관 동의 상태를 변경
  const handleAgreementChange = (e) => {
    setIsAgreed(e.target.checked);
  };

  // 주민등록번호 유효성 검증 함수
  const validateSSN = () => {
    const { ssnFirst, ssnSecond } = formData;
    const ssn = ssnFirst + ssnSecond;
    // 주민등록번호 형식에 맞는지 확인 (6자리 + 7자리)
    const regex = /^[0-9]{6}[1-4][0-9]{6}$/;
    return regex.test(ssn);
  };

  // 회원가입 버튼 클릭 시 실행되는 함수
  const handleSubmit = (event) => {
    event.preventDefault(); // 페이지 새로고침 방지
    setIsLoading(true); // 로딩 상태 활성화

    const { id, email, password, confirmPassword } = formData;

    // 비밀번호와 비밀번호 확인이 일치하지 않으면 에러 처리
    if (password !== confirmPassword) {
      setShowError(true);
      setIsLoading(false);
      return;
    }

    // 주민등록번호 유효성 검사
    if (!validateSSN()) {
      setShowError(true);
      setIsLoading(false);
      return;
    }

    // 약관에 동의하지 않았을 때 에러 처리
    if (!isAgreed) {
      setShowError(true);
      setIsLoading(false);
      return;
    }

    // 아이디 중복 체크가 안됐거나 이미 중복된 경우 에러 처리
    if (isIdTaken || !idChecked) {
      setShowError(true);
      setIsLoading(false);
      return;
    }

    // 회원가입 요청
    axios.post("/member/signup", {
      id: formData.id,
      name: formData.name,
      phone: formData.phone.replace(/-/g, ''), // 휴대폰 번호에서 '-' 제거
      email: formData.email,
      gender: formData.gender,
      pwd: formData.password,
      memSsn: Number(formData.ssnFirst + formData.ssnSecond), // 주민등록번호
    })
      .then(response => {
        console.log("회원가입 성공:", response.data);
        window.alert("회원가입을 완료했습니다."); // 성공 메시지

        // 성공 시 로그인 페이지로 이동
        handleLogin();
      })
      .catch(error => {
        console.error("회원가입 실패:", error);
        setShowError(true); // 에러 발생 시 상태 업데이트
      })
      .finally(() => {
        setIsLoading(false); // 로딩 상태 종료
      });
  };

  // 휴대폰 번호 입력 시 '-' 자동으로 추가하는 함수
  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 허용
    if (value.length > 3 && value.length <= 7) {
      value = value.replace(/(\d{3})(\d{1,4})/, '$1-$2'); // 중간에 '-' 추가
    } else if (value.length > 7) {
      value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3'); // 마지막에 '-' 추가
    }
    setFormData({ ...formData, phone: value }); // 상태 업데이트
  };

  // 로그인 페이지로 리다이렉트하는 함수
  const handleLogin = () => {
    window.location.href = "/"; // 로그인 페이지로 이동
  };

  // 아이디 중복 확인 함수
  const handleIdCheck = () => {
    const { id } = formData;
    if (id) {
      setIsCheckingId(true); // 아이디 중복 체크 시작
      axios.get(`/member/check-id/${id}`)  // 서버에 중복 체크 요청
        .then(response => {
          setIsIdTaken(response.data); // 중복 여부 결과
          setIdChecked(true); // 아이디가 확인되었음을 표시
        })
        .catch(error => {
          console.error("아이디 중복 확인 실패:", error);
        })
        .finally(() => {
          setIsCheckingId(false); // 체크 완료
        });
    }
  };

  // 아이디 중복 체크 후 상태에 따라 에러 표시
  useEffect(() => {
    if (isIdTaken) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [isIdTaken]);

  return (
    <div
      className="sign-up__wrapper"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/img/member/background.jpg)` }} // 배경 이미지 설정
    >
      <div className="sign-up__backdrop"></div>

      <form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={process.env.PUBLIC_URL + '/img/member/logo5.png'} // 로고 이미지 설정
          alt="logo"
        />

        <div className="h4 mb-2 text-center">회원가입</div>

        {showError && (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShowError(false)}
            dismissible
          >
            {isIdTaken
              ? "이미 존재하는 아이디입니다. 다른 아이디를 입력하세요."
              : "비밀번호가 일치하지 않거나 유효하지 않은 주민번호입니다. 또는 약관에 동의해주세요."}
          </Alert>
        )}

        {/* 아이디 입력란 */}
        <div className="mb-2">
          <label htmlFor="id">아이디</label>
          <div className="d-flex">
            <input
              type="text"
              name="id"
              id="id"
              value={formData.id}
              placeholder="아이디를 입력하세요."
              onChange={handleChange}
              required
              className="form-control me-2"
            // style={{ border: '2px solid black' }}
            />
            {/* 아이디 중복확인  */}
            <Button
              variant="secondary"
              onClick={handleIdCheck}
              disabled={isCheckingId || !formData.id}
              className="form-control"
              style={{ width: 'auto' }}
            >
              {isCheckingId ? "확인 중..." : "중복 확인"}
            </Button>
          </div>
          {idChecked && !isIdTaken && (
            <small className="text-success">사용 가능한 아이디입니다.</small>
          )}
          {idChecked && isIdTaken && (
            <small className="text-danger">이미 존재하는 아이디입니다.</small>
          )}
        </div>

        {/* 이름 입력란 */}
        <div className="mb-2">
          <label htmlFor="name">이름</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            placeholder="이름을 입력하세요."
            onChange={handleChange}
            required
            className="form-control"
          // style={{ border: '2px solid black' }}
          />
        </div>

        {/* 휴대폰 번호 입력란 */}
        <div className="mb-2">
          <label htmlFor="phone">휴대폰 번호</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={formData.phone}
            placeholder="010-1234-5678 '-'자동입니다."
            onChange={handlePhoneChange}
            required
            className="form-control"
          // style={{ border: '2px solid black' }}
          />
        </div>

        {/* 이메일 입력란 */}
        <div className="mb-2">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            placeholder="이메일을 입력하세요."
            onChange={handleChange}
            required
            className="form-control"
          // style={{ border: '2px solid black' }}
          />
        </div>

        {/* 성별 선택 */}
        <div className="mb-2">
          <label htmlFor="gender">성별</label>
          <select
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="form-control"
          // style={{ border: '2px solid black' }}
          >
            <option value="">성별을 선택하세요</option>
            <option value="M">남성</option>
            <option value="F">여성</option>
            <option value="N">선택안함</option>
          </select>
        </div>

        {/* 주민등록번호 입력란 */}
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
            // style={{ border: '2px solid black' }}
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
            // style={{ border: '2px solid black' }}
            />
          </div>
        </div>

        {/* 비밀번호 입력란 */}
        <div className="mb-2">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            placeholder="비밀번호를 입력하세요."
            onChange={handleChange}
            required
            className="form-control"
          // style={{ border: '2px solid black' }}
          />
        </div>

        {/* 비밀번호 확인 입력란 */}
        <div className="mb-3">
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            placeholder="비밀번호를 다시 입력하세요."
            onChange={handleChange}
            required
            className="form-control"
          // style={{ border: '2px solid black' }}
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
            onChange={handleAgreementChange}
            required
            className="custom-checkbox"
          />
        </div>

        {/* 회원가입 버튼 */}
        <Button
          className="w-100 mb-3"
          variant="primary"
          type="submit"
          disabled={isLoading || isIdTaken || !idChecked}
        >
          {isLoading ? "로딩중.." : "회원가입"}
        </Button>

        {/* 로그인 버튼 */}
        <Button
          className="w-100"
          variant="secondary"
          onClick={handleLogin}
        >
          로그인
        </Button>
      </form>
    </div>
  );
};

export default Signup;