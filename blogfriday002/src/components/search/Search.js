import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../toolkit/actions/product_action";
import "./Search.css";

const Search = () => {
  //기본 함수 선언
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product_name } = useParams();

  //이동
  const handleimgClick1 = (product_code) => {
    navigate(`/search/user/product/${product_code}`);
  };

  const { productList, productImages } = useSelector((state) => state.product);

  //반응
  useEffect(() => {
    dispatch(productActions.getProductList(product_name));

    if (productList && productList.length === 0) {
      navigate("/search/searchempty");
    }
    if (productList && productList.length > 0) {
      productList.forEach((product) => {
        const imageUrl = productImages[product.product_code]?.product_img0;
        console.log(`이미지 URL for ${product.product_name}: ${imageUrl}`);
      });
    }
  }, [product_name, dispatch]);

  return (
    <div>
      <div>
        <div className="product_map">
          <div>
            {productList &&
              productList.map((product) => (
                <div key={product.product_code} className="map_box">
                  {productImages[product.product_code]?.product_img0 && (
                    <img
                      className="search_img"
                      src={`/shopimg/${
                        productImages[product.product_code].product_img0
                      }`}
                      alt={`${product.product_name}`}
                      onClick={() => handleimgClick1(product.product_code)}
                    />
                  )}
                  <div className="search_text">
                    상품이름: {product.product_name}
                  </div>
                  <div className="search_text">
                    가격: {product.product_price}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
