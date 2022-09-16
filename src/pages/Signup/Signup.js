import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../Signup/Signup.scss";

const Signup = () => {
  const navigate = useNavigate();
  // const [email, setEmail] = useState("");
  // const [name, setName] = useState("");
  // const [nickname, setNickname] = useState("");
  // const [password, setPassword] = useState("");

  // const saveEmail = (event) => {
  //   setEmail(event.target.value);
  // };
  // const saveName = (event) => {
  //   setName(event.target.value);
  // };
  // const saveNickname = (event) => {
  //   setNickname(event.target.value);
  // };
  // const savePassword = (event) => {
  //   setPassword(event.target.value);
  // };

  const [imgFile, setImgFile] = useState("");
  const imgRef = useRef();

  const [inputValue, setInputValue] = useState({
    email: "",
    name: "",
    nickname: "",
    password: "",
  });

  const inputChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const { email, name, nickname, password } = inputValue;

  const isInputValid =
    email.includes("@") &&
    password.length > 0 &&
    name.length > 0 &&
    nickname.length > 0;

  const signupForm = document.getElementById("signupForm");

  const checkSignUp = (e) => {
    e.preventDefault();
    // const formData = new FormData();
    // formData.append("email", email);
    // formData.append("name", name);
    // formData.append("nickname", nickname);
    // formData.append("password", password);
    // formData.append("profileImg", imgRef.current.files[0]);
    // for (const keyValue of formData) console.log(keyValue);

    fetch("http://10.58.4.101:8000/users/signup", {
      method: "POST",
      headers: {
        enctype: "multipart/form-data",
        // "Content-Type": "multipart/form-data",
      },
      body: new FormData(signupForm),
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
        console.log(data);
        if (data.message === "추석 특공대 화이팅!") {
          alert("회원가입 성공");
          // navigate("/");
        } else {
          alert("회원가입 실패");
        }
      });
  };

  const previewImg = () => {
    const reader = new FileReader();
    const file = imgRef.current.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  return (
    <div className="signup">
      <div className="signup-box">
        <h1 className="signup-title">Westagram</h1>
        <img
          className="signup-profileImg"
          src={imgFile ? imgFile : `/images/icon/user.png`}
          alt="프로필 이미지"
        />
        <form
          className="form-signup"
          id="signupForm"
          onChange={inputChange}
          onSubmit={checkSignUp}
        >
          <label className="signup-profileImg-label" htmlFor="profileImg">
            프로필 이미지 추가
          </label>
          <input
            className="signup-profileImg-input"
            name="profileImg"
            type="file"
            accept="image/*"
            id="profileImg"
            onChange={previewImg}
            ref={imgRef}
          />
          <input
            // value={email}
            name="email"
            className="signup-email"
            // onChange={saveEmail}
            type="text"
            placeholder="이메일 주소"
          />
          <input
            //value={name}
            name="name"
            className="signup-name"
            // onChange={saveName}
            type="text"
            placeholder="이름"
          />
          <input
            // value={nickname}
            name="nickname"
            className="signup-id"
            // onChange={saveNickname}
            type="text"
            placeholder="닉네임"
          />
          <input
            // value={password}
            name="password"
            className="signup-pw"
            // onChange={savePassword}
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
            disabled={!isInputValid}
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
