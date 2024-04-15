import React, { useEffect } from "react";
import "./Productlist.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../toolkit/actions/product_action";

const Productlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const seller_id = 3;

  const { productList, productImages } = useSelector((state) => state.product);

  const savemenunavi = (e) => {
    navigate(`/seller/product/save/${seller_id}`);
  };

  const listmenunavi = (e) => {
    navigate("/seller/product/list/");
  };

  useEffect(() => {
    console.log("+++++++++", seller_id);
    dispatch(productActions.getSellerList(seller_id));
  }, []);
  const imagePath = `/public/shopimg/44_product_img0_바밤바.png`;
  return (
    <>
      <div className="seller_body">
        <div className="seller_menu_box">
          <button className="seller_menu_button" onClick={listmenunavi}>
            물품 리스트
          </button>
          <button className="seller_menu_button" onClick={savemenunavi}>
            물품 등록
          </button>
          <button className="seller_menu_button">정산</button>
        </div>
        <div className="seller_list_body">
          <div>
            {productList &&
              productList.map((product) => (
                <div
                  key={product.product_code}
                  className="seller_list_body_list"
                >
                  {productImages[product.product_code]?.product_img0 && (
                    <img
                      className="seller_img"
                      src={`/shopimg/${
                        productImages[product.product_code].product_img0
                      }`}
                      alt={`${product.product_name}`}
                    />
                  )}
                  <div>상품이름: {product.product_name}</div>
                  <div>가격: {product.product_price}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* <form>
          <table>
            <tbody className="seller_list_body">
              <tr className="seller_list_body_list">
                <th>seller_id</th>
                <td>{seller_id}</td>
              </tr>
              <tr className="seller_list_body_list">
                <th></th>
                <td></td>
              </tr>
              <tr className="seller_list_body_list">
                <th></th>
                <td></td>
              </tr>
              <tr className="seller_list_body_list">
                <th></th>
                <td>
                  <img
                    src={imagePath}
                    alt="product_img0"
                    width="300"
                    height="300"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form> */}
      {/* </div> */}
    </>
  );
};

export default Productlist;
