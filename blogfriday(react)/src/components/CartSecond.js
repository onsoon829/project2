import React, { useState, useEffect } from "react";
import axios from "axios";

function CartPage() {
  const [cartList, setCartList] = useState([]);
  const [newCartItem, setNewCartItem] = useState({
    product_code: "",
    cart_product_count: "",
    user_id: "",
  });
  const [updateCartData, setUpdateCartData] = useState({
    cart_product_code: "",
    product_code: "",
    cart_product_count: "",
    user_id: "",
  });

  // 장바구니 목록 불러오기
  useEffect(() => {
    axios
      .get("/api/cart/list")
      .then((response) => {
        setCartList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cart list:", error);
      });
  }, []);

  // 새로운 상품 추가
  const addCartItem = () => {
    axios
      .post("/api/cart/add", newCartItem)
      .then(() => {
        // 장바구니 목록 다시 불러오기
        axios.get("/api/cart/list").then((response) => {
          setCartList(response.data);
        });
      })
      .catch((error) => {
        console.error("Error adding cart item:", error);
      });
  };

  // 상품 수정
  const updateCartItem = () => {
    axios
      .put(`/api/cart/${updateCartData.cart_product_code}`, updateCartData)
      .then(() => {
        // 장바구니 목록 다시 불러오기
        axios.get("/api/cart/list").then((response) => {
          setCartList(response.data);
        });
      })
      .catch((error) => {
        console.error("Error updating cart item:", error);
      });
  };

  // 상품 삭제
  const deleteCartItem = (cartProductCode) => {
    axios
      .delete(`/api/cart/${cartProductCode}`)
      .then(() => {
        // 장바구니 목록 다시 불러오기
        axios.get("/api/cart/list").then((response) => {
          setCartList(response.data);
        });
      })
      .catch((error) => {
        console.error("Error deleting cart item:", error);
      });
  };

  return (
    <div>
      <h1>장바구니</h1>
      <ul>
        {cartList.map((item) => (
          <li key={item.cart_product_code}>
            상품 코드: {item.product_code}, 수량: {item.cart_product_count},
            유저 ID: {item.user_id}
            <button onClick={() => deleteCartItem(item.cart_product_code)}>
              삭제
            </button>
          </li>
        ))}
      </ul>
      <h2>상품 추가</h2>
      <input
        type="text"
        placeholder="상품 코드"
        value={newCartItem.product_code}
        onChange={(e) =>
          setNewCartItem({ ...newCartItem, product_code: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="수량"
        value={newCartItem.cart_product_count}
        onChange={(e) =>
          setNewCartItem({ ...newCartItem, cart_product_count: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="유저 ID"
        value={newCartItem.user_id}
        onChange={(e) =>
          setNewCartItem({ ...newCartItem, user_id: e.target.value })
        }
      />
      <button onClick={addCartItem}>추가</button>

      <h2>상품 수정</h2>
      <input
        type="text"
        placeholder="상품 코드"
        value={updateCartData.product_code}
        onChange={(e) =>
          setUpdateCartData({ ...updateCartData, product_code: e.target.value })
        }
      />
      <input
        type="text"
        placeholder="수량"
        value={updateCartData.cart_product_count}
        onChange={(e) =>
          setUpdateCartData({
            ...updateCartData,
            cart_product_count: e.target.value,
          })
        }
      />
      <input
        type="text"
        placeholder="유저 ID"
        value={updateCartData.user_id}
        onChange={(e) =>
          setUpdateCartData({ ...updateCartData, user_id: e.target.value })
        }
      />
      <button onClick={updateCartItem}>수정</button>
    </div>
  );
}

export default CartPage;
``;
