import { useState } from "react";
import Products from "./Products";
import Categories from "./Categories";

const Cart = () => {
  const [product, setProduct] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");

  const filteredData = product.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));

  const addTocart = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div className="products-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-section">
          <h3>Search</h3>
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="sidebar-section">
          <h3>Categories</h3>

          <Categories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        </div>
      </div>

      {/* Main Content */}
      <div className="products-main">
        <div className="products-header">
          <div>
            <h1>Our Products</h1>
            <p>Showing {filteredData.length} products</p>
          </div>
          <button type="button" className="cart-button">
            <span className="cart-icon">🛒</span>
            <span className="cart-text">Cart</span>
            <span className="cart-count">{count}</span>
          </button>
        </div>

        {/* <Products addToCart={addTocart} productData={filteredData} setProductData={setProduct} /> */}
        {/* ab category k hisaab say display kr rhay hen tau */}
        <Products
          addToCart={addTocart}
          productData={filteredData}
          setProductData={setProduct}
          selectedCategory={selectedCategory}
        />
      </div>
    </div>
  );
};

export default Cart;
