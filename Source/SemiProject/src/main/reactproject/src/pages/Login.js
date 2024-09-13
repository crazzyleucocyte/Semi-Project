import React, { useState, useEffect } from "react";
import { Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../assets/Login.css";
import BackgroundImage from "../assets/background.jpg";
import Logo from "../assets/logo.png";

const Login = ({ setIsLoggedIn }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // localStorage에서 저장된 username을 불러옵니다.
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setCredentials(prevState => ({ ...prevState, username: savedUsername }));
    }
  }, []);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("/member/login", {
        id: credentials.username,
        pwd: credentials.password
      });

      if (response.data.success) {
        setIsLoggedIn(true);
        // 로그인 성공 시 항상 아이디를 localStorage에 저장합니다.
        localStorage.setItem('username', credentials.username);
        navigate("/main");
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error("로그인 요청 실패:", error);
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="sign-in__backdrop"></div>

      <form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={Logo}
          alt="logo"
        />
        <div className="h4 mb-2 text-center">로그인</div>

        {showError && (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShowError(false)}
            dismissible
          >
            아이디 또는 비밀번호가 올바르지 않습니다.
          </Alert>
        )}

        <div className="mb-2">
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            name="username"
            id="username"
            value={credentials.username}
            placeholder="아이디를 입력하세요."
            onChange={handleChange}
            required
            className="form-control"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            name="password"
            id="password"
            value={credentials.password}
            placeholder="비밀번호를 입력하세요."
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
          {isLoading ? "로딩중.." : "로그인"}
        </Button>

        <Button className="w-100" variant="secondary" onClick={handleSignUp}>
          회원가입
        </Button>
      </form>
    </div>
  );
};

export default Login;