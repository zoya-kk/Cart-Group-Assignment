import { useCallback, useState } from "react";
import Products from "./Products";

const Cart = () => {
  const [product, setProduct] = useState([]);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");

  const addTocart = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);
  const filteredData = product.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));

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
          <ul className="category-list">
            <li className="active">All Products</li>
            <li>Fragrance</li>
            <li>Groceries</li>
            <li>Beauty</li>
            <li>Furniture</li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="products-main">
        <div className="products-header">
          <div>
            <h1>Our Products</h1>
            <p>Showing {filteredData.length} products</p>
          </div>
          <button className="cart-button">
            <span className="cart-icon">🛒</span>
            <span className="cart-text">Cart</span>
            <span className="cart-count">{count}</span>
          </button>
        </div>

        <Products addToCart={addTocart} productData={filteredData} setProductData={setProduct} />
      </div>
    </div>
  );
};

export default Cart;
