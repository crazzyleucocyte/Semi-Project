import React, { useState, useEffect } from "react";
import { Button, Alert } from "react-bootstrap";
import axios from "axios";
import "../assets/Register.css";
import BackgroundImage from "./../assets/background.jpg";
import Logo from "./../assets/logo.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    phone: '',
    email: '',
    gender: '',
    password: '',
    confirmPassword: '',
    ssnFirst: '', 
    ssnSecond: '', 
  });

  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isIdTaken, setIsIdTaken] = useState(false);
  const [isCheckingId, setIsCheckingId] = useState(false);
  const [idChecked, setIdChecked] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "id") {
      setIdChecked(false);
    }
  };

  const handleAgreementChange = (e) => {
    setIsAgreed(e.target.checked);
  };

  const validateSSN = () => {
    const { ssnFirst, ssnSecond } = formData;
    const ssn = ssnFirst + ssnSecond;
    const regex = /^[0-9]{6}[1-4][0-9]{6}$/; 
    return regex.test(ssn);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
    setIsLoading(true); 

    const { id, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setShowError(true); 
      setIsLoading(false); 
      return;
    }

    if (!validateSSN()) {
      setShowError(true);
      setIsLoading(false);
      return;
    }

    if (!isAgreed) {
      setShowError(true);
      setIsLoading(false);
      return;
    }

    if (isIdTaken || !idChecked) {
      setShowError(true);
      setIsLoading(false);
      return;
    }

    axios.post("/member/signup", {
      id: formData.id,
      name: formData.name,
      phone: formData.phone.replace(/-/g, ''),
      email: formData.email,
      gender: formData.gender,
      pwd: formData.password,
      memSsn: Number(formData.ssnFirst + formData.ssnSecond),
    })
    .then(response => {
      console.log("회원가입 성공:", response.data);

      // 성공 시, 로그인 페이지로 리다이렉트 또는 다른 작업 수행
      handleLogin(); // 회원가입 성공 후 로그인 페이지로 이동
    })
    .catch(error => {
      console.error("회원가입 실패:", error);
      setShowError(true);
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length > 3 && value.length <= 7) {
      value = value.replace(/(\d{3})(\d{1,4})/, '$1-$2');
    } else if (value.length > 7) {
      value = value.replace(/(\d{3})(\d{4})(\d{1,4})/, '$1-$2-$3');
    }
    setFormData({ ...formData, phone: value });
  };

  const handleLogin = () => {
    window.location.href = "/"; 
  };
  const handleIdCheck = () => {
    const { id } = formData;
    if (id) {
      setIsCheckingId(true);
      axios.get(`/member/check-id/${id}`)  // 수정된 엔드포인트
        .then(response => {
          setIsIdTaken(response.data);
          setIdChecked(true);
        })
        .catch(error => {
          console.error("아이디 중복 확인 실패:", error);
        })
        .finally(() => {
          setIsCheckingId(false);
        });
    }
  };

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
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="sign-up__backdrop"></div>

      <form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={Logo}
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
            />
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
          />
        </div>

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
          />
        </div>

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
          />
        </div>

        <div className="mb-2">
          <label htmlFor="gender">성별</label>
          <select
            name="gender"
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="form-control"
          >
            <option value="">성별을 선택하세요</option>
            <option value="M">남성</option>
            <option value="F">여성</option>
            <option value="N">선택안함</option>
          </select>
        </div>

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
          />
        </div>

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
          />
        </div>

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

        <Button
          className="w-100 mb-3"
          variant="primary"
          type="submit"
          disabled={isLoading || isIdTaken || !idChecked}
        >
          {isLoading ? "로딩중.." : "회원가입"}
        </Button>

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