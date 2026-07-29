import { memo } from "react";
import { useState, useCallback, useEffect } from "react";

function Categories({ selectedCategory, setSelectedCategory }) {
  const [categories, setCategories] = useState([]);

  const fetchCategory = useCallback(() => {
    const url = "https://dummyjson.com/products/categories";

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        setCategories(result);
      })
      .catch((error) => {
        console.log("Unable to fetch the API:", error);
      });
  }, [setCategories]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  return (
    <>
      <ul className="category-list">
        <li className={selectedCategory === null ? "active" : ""} onClick={() => setSelectedCategory(null)}>
          All Products
        </li>

        {categories.map((category, index) => (
          <li
            key={index}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => setSelectedCategory(category)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default memo(Categories);
