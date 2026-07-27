import { useState, useCallback, useEffect } from "react";
const Cart = () => {

const [products, setProducts] = useState([]);

const symbol = '$';


 const fetchProducts = useCallback((term = '') => {
        const normalizedTerm = term.toString().trim();
        console.log("Searching products with term:", normalizedTerm);

        let url = 'https://dummyjson.com/products';

        if (normalizedTerm.length > 2) {
            url = `https://dummyjson.com/products/search?q=${encodeURIComponent(normalizedTerm)}`;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setProducts(data.products || []);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                setProducts([]);
            });
    }, []);


useEffect(() => {
    fetchProducts();
}, [fetchProducts]);

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
                    />
                </div>

                <div className="sidebar-section">
                    <h3>Categories</h3>
                    <ul className="category-list">
                        <li className="active">All Products</li>
                        <li>Beauty</li>
                        <li>Fragrances</li>
                        <li>Furniture</li>
                        <li>Groceries</li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="products-main">
                <div className="products-header">
                    <div>
                        <h1>Our Products</h1>
                        <p>Showing 8 products</p>
                    </div>
                    <button className="cart-button">
                        <span className="cart-icon">🛒</span>
                        <span className="cart-text">Cart</span>
                        <span className="cart-count">0</span>
                    </button>
                </div>

                <div className="products-grid">
                    {/* Product Card 1 */}

                         {
                            products.length === 0 ? (
                              <div className="no-products">No products found.</div>
                            ) :
                            products.map(product => (
                           <div key={product.id} className="product-card">
                        <div  className="product-image">
                            <img src={product.images[0]} alt={product.title} />
                        </div>
                        <div className="product-details">
                            <p className="product-category">{product.category}</p>
                            <h3 className="product-name">{product.title}</h3>
                            <div className="product-tags">
                                <span className="tag">{product.tags[0]}</span>
                                <span className="tag">{product.tags[1]}</span>
                            </div>
                            <p className="product-description">{product.description}</p>
                            <div className="product-footer">
                                <span className="product-price">{symbol}{product.price.toFixed(2)}</span>
                                <button 
                                // onClick={()=>{addToCart(product)}} 
                                className="btn-add-to-cart">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                         )) 
                       }
                    </div>
                  </div>
            </div>
       
    );
};

export default Cart;

