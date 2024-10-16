import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import ProductGrid from "../ProductGrid";
import ProductList from "../ProductList";
import "./index.css";
const FilterAllProduct = ({
  products,
  addToCartProduct,
  addToWishListProduct,
}) => {
  const [activeTab, setActiveTab] = useState("1");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // Số sản phẩm hiển thị mỗi trang

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  // Tính toán sản phẩm hiển thị dựa trên trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="col-lg-8">
      <div className="shop-section-top-inner">
        <div className="shoping-list">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "1" })}
                onClick={() => toggle("1")}
              >
                <i className="fa fa-th"></i>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "2" })}
                onClick={() => toggle("2")}
              >
                <i className="fa fa-list"></i>
              </NavLink>
            </NavItem>
          </Nav>
        </div>
        <div className="shoping-product">
          <span>
            Hiển thị {indexOfFirstProduct + 1} -{" "}
            {Math.min(indexOfLastProduct, products.length)} trên tổng số{" "}
            {products.length} sản phẩm
          </span>
        </div>
      </div>

      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <ProductGrid
            addToCartProduct={addToCartProduct}
            addToWishListProduct={addToWishListProduct}
            products={currentProducts}
          />
        </TabPane>

        <TabPane tabId="2">
          <ProductList
            addToCartProduct={addToCartProduct}
            addToWishListProduct={addToWishListProduct}
            products={currentProducts}
          />
        </TabPane>
      </TabContent>

      <div className="pagination">
        <ul className="pagination-list">
          {Array.from({ length: totalPages }, (_, i) => (
            <li key={i + 1} className={i + 1 === currentPage ? "active" : ""}>
              <button onClick={() => paginate(i + 1)}>{i + 1}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterAllProduct;
