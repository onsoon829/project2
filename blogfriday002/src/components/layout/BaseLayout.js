import React from "react";
import "./BaseLayout.css";
import { useNavigate } from "react-router-dom";

const BaseLayout = () => {
  const navigate = useNavigate();

  const handleimgClick1 = () => {
    navigate("/blog");
  };

  return (
    <div className="base-layout">
      <div className="main-banner">
        <div className="banner-img" />
      </div>

      <div className="cardlist">
        <div className="card">
          <div className="card-img" onClick={handleimgClick1}></div>
          <div className="card-info">시계</div>
        </div>
        <div className="card">
          <div className="card-img"></div>
          <div className="card-info">텀블러</div>
        </div>
        <div className="card">
          <div className="card-img"></div>
          <div className="card-info">에어프라이기</div>
        </div>
        <div className="card">
          <div className="card-img"></div>
          <div className="card-info">자켓</div>
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
