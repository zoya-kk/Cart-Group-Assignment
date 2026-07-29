import { memo, useCallback, useEffect, useState } from "react";

function Products({ addToCart, setProductData, productData, selectedCategory }) {
  // const [data, setData] = useState([]);
  const [totalProductsCount, setTotalProductsCount] = useState(0);
  const [pageNo, setPageNo] = useState(1);

  const limit = 12;
  const fetchProducts = useCallback(() => {
    let url = "https://dummyjson.com/products";

    if (selectedCategory) {
      url = `https://dummyjson.com/products/category/${selectedCategory.slug}`;
    }
    url += `?limit=${limit}&skip=${(pageNo - 1) * limit}`;

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setProductData(result.products);
        setTotalProductsCount(result.total);
      })
      .catch((error) => {
        console.log("Unable to fetch the API:", error);
      });
  }, [setProductData, selectedCategory, limit, setTotalProductsCount, pageNo]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const totalPages = Math.ceil(totalProductsCount / limit);

  return (
    <>
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
                  <button className="btn-add-to-cart" onClick={() => addToCart(prd)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {totalProductsCount > limit && (
        <nav className="d-flex justify-content-center mt-4">
          <ul className="pagination shadow-sm">
            <li className={`page-item ${pageNo === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setPageNo((prev) => prev - 1)} disabled={pageNo === 1}>
                Previous
              </button>
            </li>

            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;

              return (
                <li key={page} className={`page-item ${page === pageNo ? "active" : ""}`}>
                  <button className="page-link" onClick={() => setPageNo(page)}>
                    {page}
                  </button>
                </li>
              );
            })}

            <li className={`page-item ${pageNo === totalPages ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setPageNo((prev) => prev + 1)}
                disabled={pageNo === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}

export default memo(Products);
