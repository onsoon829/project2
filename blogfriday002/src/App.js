import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
// import BaseLayout from "./components/layout/BaseLayout";
import Header from "./components/Header";
import Porductsave from "./components/product/Productsave";
import Search from "./components/search/Search";
import BlogUserProduct from "./components/search/SearchDetail";
import Productlist from "./components/product/Productlist";
import Footer from "./components/Footer";
import PaymentPage from "./components/pay/PaymentPage";
import PaymentCompletePage from "./components/pay/PaymentCompletePage";
import Main from "./components/Main";
import SearchEmpty from "./components/search/SearchEmpty";
import Login from "./components/login/Login";
import Chat from "./components/chat/Chat";
import ChatHome from "./components/chat/ChatHome";

function App() {
  const location = useLocation();
  const showLayout = !["/chat/home", "/chat"].includes(location.pathname);
  return (
    <div className="app">
      {showLayout && <Header />}

      {showLayout ? (
        <div className="body">
          <div className="body_blank"></div>
          <Routes>
            <Route path="/" element={<Main />} />

            <Route path="/chat/list" element={<Login />}></Route>
            <Route path="/search/searchempty" element={<SearchEmpty />} />
            <Route path="/search/:product_name" element={<Search />} />
            <Route path="/seller/product/list" element={<Productlist />} />
            <Route
              path="/seller/product/save/:seller_id"
              element={<Porductsave />}
            />
            <Route
              path="/search/user/product/:product_code"
              element={<BlogUserProduct />}
            />
            <Route path="/payment/:product_code" element={<PaymentPage />} />
            <Route path="/order/complete" element={<PaymentCompletePage />} />
          </Routes>
        </div>
      ) : (
        <Routes>
          <Route path="/chat/home" element={<ChatHome />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      )}

      {showLayout && <Footer />}
    </div>
  );
}

export default App;
