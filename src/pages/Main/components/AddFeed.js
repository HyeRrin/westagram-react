import React, { useRef, useState } from "react";

const AddFeed = ({ open, setModal }) => {
  const closeModal = () => {
    setModal(false);
    setFeedImgFile("");
  };

  const [feedText, setFeedText] = useState("");
  const ChangefeedText = (e) => {
    setFeedText(e.target.value);
  };

  const [feedImgFile, setFeedImgFile] = useState("");
  const feedImgRef = useRef();

  // 이미지 미리보기
  const feedPreviewImg = () => {
    const reader = new FileReader();
    const file = feedImgRef.current.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFeedImgFile(reader.result);
    };
  };

  // 피드 업로드
  const uploadFeed = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("feedText", feedText);
    formData.append("feedImg", feedImgRef.current.files[0]);
    for (const keyValue of formData) console.log(keyValue);

    fetch("API 주소", {
      method: "POST",
      headers: {
        enctype: "multipart/form-data",
      },
      body: formData,
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
          alert("업로드 성공");
        } else {
          alert("업로드 실패");
        }
      });
  };

  return (
    <>
      {open ? (
        <div className="addFeed-background">
          <button className="addFeed-close-btn" onClick={closeModal} />
          <div className="addFeed-box">
            <div className="addFeed-header">
              <img
                className="addFeed-header-icon"
                src="/images/icon/back.png"
                alt="뒤로가기 아이콘"
              />
              <h1 className="addFeed-header-title">새 게시물 만들기</h1>
              <button className="addFeed-upload-btn" onClick={uploadFeed}>
                공유하기
              </button>
            </div>
            <div className="addFeed">
              <div className="addFeed-img">
                <img
                  className="addFeed-previewImg"
                  src={feedImgFile}
                  style={
                    feedImgFile
                      ? { display: "inline-block" }
                      : { display: "none" }
                  }
                  alt="업로드 이미지"
                />
                <div
                  className="addFeed-chooseImg"
                  style={
                    feedImgFile
                      ? { display: "none" }
                      : { display: "iline-block" }
                  }
                >
                  <img
                    className="addFeed-chooseImg-icon"
                    src="/images/icon/image.png"
                    alt="이미지 아이콘"
                  />
                  <p className="addFeed-chooseImg-info">
                    업로드할 사진을 선택해주세요
                  </p>
                  <label
                    className="addFeed-chooseImg-label"
                    htmlFor="uploadImg"
                  >
                    컴퓨터에서 선택
                  </label>
                  <input
                    className="addFeed-chooseImg-input"
                    type="file"
                    accept="image/*"
                    id="uploadImg"
                    onChange={feedPreviewImg}
                    ref={feedImgRef}
                  />
                </div>
              </div>
              <div className="addFeed-text">
                <div className="addFeed-profile">
                  <img src="/images/profile_apple.jpg" alt="프로필 이미지" />
                  <p className="addFeed-profile-name">apple_01</p>
                </div>
                <textarea
                  rows={20}
                  className="addFeed-text-input"
                  placeholder="문구 입력..."
                  onChange={ChangefeedText}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default AddFeed;
