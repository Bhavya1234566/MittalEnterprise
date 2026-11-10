import { Link } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import { getProductImageUrl } from "../../utils/productImage";
import "./Categories.css";

const Categories = () => {
  const { products, loading, error } = useProducts();
  const categories = [...new Map(products.filter((p) => p.category).map((p) => [p.category, p])).values()];

  return (
    <section className="categories">
      <div className="container">
        <div className="section-title">
          <h2>Shop by Categories</h2>
          <p>Browse our wide range of premium tractor spare parts for every farming need.</p>
        </div>
        {loading ? <p>Loading categories...</p> : error ? <p role="alert">{error}</p> : (
          <div className="category-grid">
            {categories.map((item) => (
              <div className="category-card" key={item.category}>
                <div className="category-image"><img src={getProductImageUrl(item.image)} alt={item.category} loading="lazy" /></div>
                <div className="category-content">
                  <h3>{item.category}</h3>
                  <Link to={`/products?category=${encodeURIComponent(item.category)}`} className="category-btn">Explore Category</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
