import { useState, useCallback, useEffect } from "react";
const Cart = () => {

const [products, setProducts] = useState([]);
const [searchTerm, setSearchTerm] = useState('');
const [selectedCategory, setSelectedCategory] = useState("all");
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

 const onFormSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const searchValue = formData.get('searchTerm')?.toString().trim() ?? '';
        setSearchTerm(searchValue);
        fetchProducts(searchValue);
    }
    const handleCategoryClick = (category) => {
    setSelectedCategory(category);

    let url = "https://dummyjson.com/products";

    if (category !== "all") {
        url = `https://dummyjson.com/products/category/${category}`;
    }

    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            setProducts(data.products || []);
        })
        .catch((error) => {
            console.error("Error fetching category products:", error);
            setProducts([]);
        });
};

    return (
        <div className="products-container">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="sidebar-section">
                    <h3>Search</h3>
                    <form onSubmit={(e) => { onFormSubmit(e) }}>
                        <div className="input-group">
                                    <input
                                type="text"
                                name="searchTerm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                                placeholder="Search products..."
                            />
                            <button className="btn btn-primary" type="submit">Search</button>
                            <button className="btn btn-secondary" type="button" onClick={() => {setSearchTerm(''); fetchProducts(''); }}>Clear</button>
                        </div>
                    </form>
                </div>

                <div className="sidebar-section">
                    <h3>Categories</h3>
                    <ul className="category-list">
                        <li  className={selectedCategory === "all" ? "active" : ""}
                             onClick={() => handleCategoryClick("all")}>All Products</li>
                        <li   className={selectedCategory === "beauty" ? "active" : ""}
                              onClick={() => handleCategoryClick("beauty")}>Beauty</li>
                        <li className={selectedCategory === "fragrances" ? "active" : ""}
                            onClick={() => handleCategoryClick("fragrances")}>Fragrances</li>
                        <li  className={selectedCategory === "furniture" ? "active" : ""}
                            onClick={() => handleCategoryClick("furniture")}>Furniture</li>
                        <li  className={selectedCategory === "groceries" ? "active" : ""}
                            onClick={() => handleCategoryClick("groceries")} >Groceries</li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className="products-main">
                <div className="products-header">
                    <div>
                        <h1>Our Products</h1>
                        <p>Showing {products.length} Products</p>
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

