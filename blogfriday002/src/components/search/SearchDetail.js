import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SearchDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../toolkit/actions/product_action";

const SearchDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { product_code } = useParams();
  console.log("+++++++++", product_code);
  const productDetail = useSelector((state) => state.product.productDetail);
  const productImgDetail = useSelector(
    (state) => state.product.productImgDetail
  );

  const onhandlebuybutton = () => {
    navigate(`/payment/${productDetail.product_code}`);
  };

  const onhandleblogbutton = () => {
    navigate("/blog");
  };

  //   dispatch(productActions.getProductDetail(product_code.product_code));

  useEffect(() => {
    console.log("+++++++++", product_code);

    // 특정 파라미터 값(예: product_code)을 콘솔에 출력합니다.

    dispatch(productActions.getProductDetail(product_code));
    dispatch(productActions.getProductimgDownload(product_code));
  }, []);
  const imagePath = `/shopimg/${productImgDetail.product_img0}`;
  console.log("경로", imagePath);
  return (
    <>
      <h1 className="headline">blog detail</h1>
      <div className="detailbody">
        <div className="productbox">
          <div className="row">
            <p>product_code</p>
            <p>{productDetail.product_code}</p>
          </div>
          <div className="row">
            <p>product_name</p>
            <p>{productDetail.product_name}</p>
          </div>
          <div className="row">
            <p>product_price</p>
            <p>{productDetail.product_price}</p>
          </div>
          <div className="row">
            <p>product_count</p>
            <p>{productDetail.product_count}</p>
          </div>
          <div className="row">
            <p>product_img0</p>
            <p>
              <img
                src={imagePath}
                alt="product_img0"
                width="300"
                height="300"
              />
            </p>
          </div>
        </div>
      </div>
      <div></div>
      <div class="menu-bar">
        {/* <!-- 메뉴바 내용 --> */}
        <div class="dropdown-menu">
          {/* <!-- 드롭다운 메뉴 --> */}
          옵션 선택
        </div>
        <button class="buy" onClick={onhandlebuybutton}>
          구매하기
        </button>
        <button class="cart" onClick={onhandlebuybutton}>
          장바구니
        </button>
        {/* <!-- 소셜 아이콘 --> */}
        <div className="menu-bar-icorn">
          <img
            src="/images/Instagram_logo.png"
            alt="Instagram"
            className="social-icon"
            width="100"
            height="100"
          />
          <img
            src="/images/blog.png"
            alt="Blog"
            class="social-icon"
            width="100"
            height="100"
            onClick={onhandleblogbutton}
          />
        </div>
      </div>
    </>
  );
};

export default SearchDetail;
