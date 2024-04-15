import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  let user_id = 1;
  const handleimgClick1 = () => {
    navigate("/ws/chat", { state: { user_id: "1", chatRoomId: "2" } });
  };

  return (
    <div>
      <button onClick={handleimgClick1} className="bu">
        로그인
      </button>
    </div>
  );
}

export default Login;
