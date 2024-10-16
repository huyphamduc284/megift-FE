import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import Navbar from "../../components/Navbar";
import PageTitle from "../../components/pagetitle";
import Footer from "../../components/footer";
import Scrollbar from "../../components/scrollbar";
import FilterSidebar from "../../components/FilterSidebar";
import FilterAllProduct from "../../components/FilterAllProduct";
import api from "../../api"; // Giả sử `api()` trả về danh sách sản phẩm từ dữ liệu của bạn
import { addToCart, addToWishList } from "../../store/actions/action";

const ShopPage = ({ addToCart, addToWishList }) => {
  const productsArray = api(); // Lấy dữ liệu sản phẩm

  const [filter, setFilter] = useState({
    price: "",
    size: "",
    color: "",
    brand: "",
    stock: "",
  });

  const priceChangeHandler = ({ target: { name, value } }) => {
    const val = typeof value === "string" ? JSON.parse(value) : value;
    setFilter({ ...filter, [name]: val });
  };

  const changeHandler = ({ target: { name, value } }) => {
    setFilter({ ...filter, [name]: value });
  };

  const priceFilter = (price) => {
    if (filter.price === "") return true;
    if (filter.price.max && filter.price.min) {
      return price <= filter.price.max && price >= filter.price.min;
    }
    if (filter.price.min) return price >= filter.price.min;
    return false;
  };

  const stockFilter = (stock) => {
    return filter.stock ? stock === filter.stock : true;
  };

  const addToCartProduct = (product) => {
    addToCart(product, 1, filter.color, filter.size);
  };

  const addToWishListProduct = (product) => {
    addToWishList(product);
  };

  const products = productsArray
    .filter((el) =>
      priceFilter(parseFloat(el.price.replace(" VND", "").replace(".", "")))
    )
    .filter((el) => (filter.size ? el.size === filter.size : true))
    .filter((el) => (filter.color ? el.color === filter.color : true))
    .filter((el) => (filter.brand ? el.brand === filter.brand : true))
    .filter((el) => stockFilter(el.stock));

  return (
    <Fragment>
      <Navbar hClass={"header-style-2"} />
      <PageTitle pageTitle={"Cửa hàng"} pagesub={"Cửa hàng"} />
      <div className="shop-section">
        <div className="container">
          <div className="row">
            <FilterSidebar
              filter={filter}
              priceChangeHandler={priceChangeHandler}
              changeHandler={changeHandler}
            />
            <FilterAllProduct
              addToCartProduct={addToCartProduct}
              addToWishListProduct={addToWishListProduct}
              products={products}
            />
          </div>
        </div>
      </div>
      <Footer />
      <Scrollbar />
    </Fragment>
  );
};

export default connect(null, { addToCart, addToWishList })(ShopPage);
