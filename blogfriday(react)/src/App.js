import { Route, RouterProvider, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./components/Cart";
import { useEffect } from "react";

function App() {
  return (
    <div className="container">
      <h1>장바구니</h1>
      <Routes>
        <Routes path="/" element={<Cart />}>
          <Route index element={<Cart />} />
        </Routes>
      </Routes>
    </div>
  );
}

export default App;
