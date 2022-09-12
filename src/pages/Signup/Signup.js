import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Signup/Signup.scss";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const saveEmail = (event) => {
    setEmail(event.target.value);
  };
  const saveName = (event) => {
    setName(event.target.value);
  };
  const saveNickname = (event) => {
    setNickname(event.target.value);
  };
  const savePassword = (event) => {
    setPassword(event.target.value);
  };
  const isInputValid =
    email.includes("@") &&
    password.length > 0 &&
    name.length > 0 &&
    nickname.length > 0;

  const checkSignUp = (e) => {
    e.preventDefault();
    fetch("http://10.58.3.201:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: email,
        name: name,
        nickname: nickname,
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

  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();

  // 프로필 이미지 추가의 onChange
  const saveImgFile = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
    reader.readAsDataURL(file);

    const formData = new FormData(); // FormData{}
    formData.append("profileImg", file);
    for (const keyValue of formData) console.log(keyValue);
  };

  return (
    <div className="signup">
      <div className="signup-box">
        <h1 className="signup-title">Westagram</h1>
        <img
          className="signup-profileImg"
          src={
            imgFile ? imgFile : `${process.env.PUBLIC_URL}/images/icon/user.png`
          }
          alt="프로필 이미지"
        />
        <form className="form-signup">
          <label className="signup-profileImg-label" htmlFor="profileImg">
            프로필 이미지 추가
          </label>
          <input
            className="signup-profileImg-input"
            type="file"
            accept="image/*"
            id="profileImg"
            onChange={saveImgFile}
            ref={imgRef}
          />
          <input
            value={email}
            className="signup-email"
            onChange={saveEmail}
            type="text"
            placeholder="이메일 주소"
          />
          <input
            value={name}
            className="signup-name"
            onChange={saveName}
            type="text"
            placeholder="성명"
          />
          <input
            value={nickname}
            className="signup-id"
            onChange={saveNickname}
            type="text"
            placeholder="사용자 이름"
          />
          <input
            value={password}
            className="signup-pw"
            onChange={savePassword}
            type="password"
            placeholder="비밀번호"
          />

          <button
            style={
              isInputValid
                ? { backgroundColor: "rgb(0, 149, 246, 1)" }
                : { backgroundColor: "rgb(0, 149, 246, 0.3)" }
            }
            className="signup-btn"
            disabled={isInputValid}
            onClick={checkSignUp}
          >
            회원가입
          </button>
        </form>
      </div>
      <div className="signup-box">
        <p className="signup-question">계정이 있으신가요?</p>
        <Link to="/" className="signup-link">
          로그인
        </Link>
      </div>
    </div>
  );
};

export default Signup;
