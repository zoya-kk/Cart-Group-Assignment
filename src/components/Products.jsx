import { memo, useCallback, useEffect } from "react";

function Products({ addToCart, setProductData, productData }) {
  // const [data, setData] = useState([]);

  const fetchProducts = useCallback(() => {
    const url = "https://dummyjson.com/products";

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setProductData(result.products);
      })
      .catch((error) => {
        console.log("Unable to fetch the API:", error);
      });
  }, [setProductData]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="products-grid">
      {productData.map((prd) => {
        return (
          <div className="product-card" key={prd.id}>
            <div className="product-image">
              <img src={prd.thumbnail} alt={prd.title} />
            </div>
            <div className="product-details">
              <p className="product-category">{prd.category}</p>
              <h3 className="product-name">{prd.title}</h3>
              <div className="product-tags">
                {prd.tags.map((tag) => {
                  return (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  );
                })}
              </div>
              <p className="product-description">{prd.description}</p>
              <div className="product-footer">
                <span className="product-price">${prd.price}</span>
                <button className="btn-add-to-cart" onClick={() => addToCart(prd.id)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default memo(Products);
