import React from "react";

const prices = [
  { id: 1, min: 50000, max: 100000 },
  { id: 2, min: 100000, max: 200000 },
  { id: 3, min: 200000, max: null },
];

const sizes = ["small", "medium", "large"];
const colors = ["fff", "000", "cf1105", "dd2202", "aa3301", "cc5506", "ff7702"];

const FilterSidebar = ({ filter, changeHandler, priceChangeHandler }) => {
  return (
    <div className="col-lg-4">
      <div className="shop-filter-wrap">
        <div className="filter-item">
          <div className="shop-filter-item">
            <h2>Tìm kiếm</h2>
            <div className="shop-filter-search">
              <form>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm"
                  />
                  <button type="submit">
                    <i className="ti-search"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="filter-item">
          <div className="shop-filter-item">
            <h2>Giá</h2>
            <ul>
              <li>
                <label className="topcoat-radio-button__label">
                  Tất cả giá
                  <input
                    type="radio"
                    value=""
                    checked={!filter.price}
                    name="price"
                    onChange={changeHandler}
                  />
                  <span className="topcoat-radio-button"></span>
                </label>
              </li>
              {prices.map((price) => (
                <li key={price.id}>
                  <label className="topcoat-radio-button__label">
                    {price.min.toLocaleString("vi-VN")} VND{" "}
                    {price.max
                      ? `- ${price.max.toLocaleString("vi-VN")} VND`
                      : "trở lên"}
                    <input
                      checked={filter.price?.id === price.id}
                      type="radio"
                      value={JSON.stringify(price)}
                      onChange={priceChangeHandler}
                      name="price"
                    />
                    <span className="topcoat-radio-button"></span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="filter-item">
          <div className="shop-filter-item">
            <h2>Kích thước</h2>
            <ul>
              <li>
                <label className="topcoat-radio-button__label">
                  Tất cả kích thước
                  <input
                    checked={filter.size === ""}
                    type="radio"
                    value=""
                    onChange={changeHandler}
                    name="size"
                  />
                  <span className="topcoat-radio-button"></span>
                </label>
              </li>
              {sizes.map((size) => (
                <li key={size}>
                  <label className="topcoat-radio-button__label">
                    {size}
                    <input
                      checked={filter.size === size}
                      type="radio"
                      value={size}
                      onChange={changeHandler}
                      name="size"
                    />
                    <span className="topcoat-radio-button"></span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="filter-item">
          <div className="shop-filter-item color">
            <h2>Màu sắc</h2>
            <div className="color-name">
              <ul>
                {colors.map((color) => (
                  <li key={color}>
                    <input
                      id={color}
                      onChange={changeHandler}
                      type="radio"
                      name="color"
                      value={color}
                    />
                    <label
                      style={{ background: `#${color}` }}
                      htmlFor={color}
                    ></label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
