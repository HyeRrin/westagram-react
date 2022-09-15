import React, { useRef, useState } from "react";

const AddFeed = ({ open, setModal }) => {
  const closeModal = () => {
    setModal(false);
    setFeedImgFile("");
  };

  const [feedImgFile, setFeedImgFile] = useState("");
  const feedImgRef = useRef();

  const feedPreviewImg = () => {
    const reader = new FileReader();
    const file = feedImgRef.current.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFeedImgFile(reader.result);
    };
  };

  return (
    <>
      {open ? (
        <div className="addFeed-background">
          <button className="addFeed-close-btn" onClick={closeModal} />
          <div className="addFeed">
            <div className="addFeed-header">
              <img
                className="addFeed-header-icon"
                src="/images/icon/back.png"
                alt="뒤로가기 아이콘"
              />
              <h1 className="addFeed-header-title">새 게시물 만들기</h1>
              <button className="addFeed-header-btn">공유하기</button>
            </div>
            <div className="addFeed-content">
              <div className="addFeed-content-img">
                {feedImgFile ? (
                  <img
                    className="content-img-preview"
                    src={feedImgFile}
                    alt="업로드 이미지"
                  />
                ) : (
                  <div className="content-img-wrap">
                    <img
                      className="content-img-icon"
                      src={feedImgFile ? feedImgFile : "/images/icon/image.png"}
                      alt="이미지 아이콘"
                    />
                    <p className="content-img-info">
                      업로드할 사진을 선택해주세요
                    </p>
                    <label className="content-img-label" htmlFor="uploadImg">
                      컴퓨터에서 선택
                    </label>
                    <input
                      className="content-img-input"
                      type="file"
                      onChange={feedPreviewImg}
                      ref={feedImgRef}
                      id="uploadImg"
                    />
                  </div>
                )}
                {/* <img
                  className="content-img-icon"
                  src={feedImgFile ? feedImgFile : "/images/icon/image.png"}
                  alt="이미지 아이콘"
                />
                <p className="content-img-info">업로드할 사진을 선택해주세요</p>
                <label className="content-img-label" htmlFor="uploadImg">
                  컴퓨터에서 선택
                </label>
                <input
                  className="content-img-input"
                  type="file"
                  onChange={feedPreviewImg}
                  ref={feedImgRef}
                  id="uploadImg"
                /> */}
              </div>
              <div className="addFeed-content-text">
                <div className="addFeed-content-profile">
                  <img src="/images/profile_apple.jpg" alt="프로필 이미지" />
                  <p className="content-text-name">apple_01</p>
                </div>
                <textarea
                  rows={20}
                  className="content-text-input"
                  placeholder="문구 입력..."
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
