import React, { useState } from "react";
import AddFeed from "./AddFeed";

const Nav = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleAdd = () => {
    setOpenModal(!openModal);
  };

  return (
    <header>
      <h1>Westagram</h1>
      <div className="header-search">
        <img
          className="header-search-icon"
          src={`${process.env.PUBLIC_URL}/images/icon/explore.png`}
          alt="돋보기 아이콘"
        />
        <input className="header-search-input" type="text" placeholder="검색" />
      </div>
      <nav>
        <ul className="nav-list">
          {/* {ICON_SRC.map((icon) => (
            <li key={icon.id}>
              <img
                src={`${process.env.PUBLIC_URL}/images/icon/${icon.src}`}
                alt="Nav 아이콘"
              />
            </li>
          ))} */}
          <li>
            <img
              src={`${process.env.PUBLIC_URL}/images/icon/add.png`}
              alt="Nav 아이콘"
              onClick={handleAdd}
            />
            <AddFeed open={openModal} setModal={setOpenModal} />
          </li>
          <li>
            <img
              className="nav-list-profile-img"
              src={`${process.env.PUBLIC_URL}/images/profile_candy.jpg`}
              alt="프로필 이미지"
            />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;

// const ICON_SRC = [
//   { id: 1, src: "home.png" },
//   { id: 2, src: "send.png" },
//   { id: 3, src: "add.png" },
//   { id: 4, src: "compass.png" },
//   { id: 5, src: "heart.png" },
// ];
