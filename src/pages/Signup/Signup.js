import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Signup/Signup.scss";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const saveEmail = (event) => {
    setEmail(event.target.value);
  };
  const saveUserName = (event) => {
    setUserName(event.target.value);
  };
  const saveUserId = (event) => {
    setUserId(event.target.value);
  };
  const savePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleDisabled = () => {
    let validation = email.includes("@") && password.length > 4;
    return validation ? setDisabled(false) : setDisabled(true);
  };

  const checkSignUp = (e) => {
    e.preventDefault();
    fetch("http://10.58.3.201:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: email,
        userName: userName,
        userId: userId,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok === true) {
          return response.json();
        }
        throw new Error("에러 발생!");
      })
      .catch((error) => {
        alert(error);
      })
      .then((data) => {
        if (data.message === "login success") {
          localStorage.setItem("TOKEN", data.accessToken);
          alert("회원가입 성공");
          navigate("/login-joo");
        } else {
          alert("회원가입 실패");
        }
      });
  };

  return (
    <div className="signup">
      <div className="signup-box">
        <h1 className="signup-title">Westagram</h1>
        <p className="signup-message">
          친구들의 사진과 동영상을 보려면 가입하세요.
        </p>
        <form className="form-signup">
          <input
            value={email}
            className="signup-email"
            onChange={saveEmail}
            onKeyUp={handleDisabled}
            type="text"
            placeholder="휴대폰 번호 또는 이메일 주소"
          />
          <input
            value={userName}
            className="signup-username"
            onChange={saveUserName}
            onKeyUp={handleDisabled}
            type="text"
            placeholder="성명"
          />
          <input
            value={userId}
            className="signup-id"
            onChange={saveUserId}
            onKeyUp={handleDisabled}
            type="text"
            placeholder="사용자 이름"
          />
          <input
            value={password}
            className="signup-pw"
            onChange={savePassword}
            onKeyUp={handleDisabled}
            type="password"
            placeholder="비밀번호"
          />
          <button
            style={
              disabled === true
                ? { backgroundColor: "rgb(0, 149, 246, 0.3)" }
                : { backgroundColor: "rgb(0, 149, 246, 1)" }
            }
            className="signup-btn"
            disabled={disabled}
            onClick={checkSignUp}
          >
            가입
          </button>
        </form>
      </div>
      <div className="signup-box">
        <p className="signup-question">계정이 있으신가요?</p>
        <p className="signup-link">로그인</p>
      </div>
    </div>
  );
};

export default Signup;
