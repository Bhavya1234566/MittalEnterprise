import "./Categories.css";
import { Link } from "react-router-dom";
import all_products from "../../Components/assets/all_products";

const uniqueCategories = [
  ...new Map(
    all_products.map((item) => [item.category, item])
  ).values(),
];

const Categories = () => {
  return (
    <section className="categories">
      <div className="container">

        <div className="section-title">
          <h2>Shop by Categories</h2>

          <p>
            Browse our wide range of premium tractor spare parts for every
            farming need.
          </p>
        </div>

        <div className="category-grid">

          {uniqueCategories.map((item) => (

            <div className="category-card" key={item.id}>

              <div className="category-image">
                <img
                  src={item.image}
                  alt={item.category}
                />
              </div>

              <div className="category-content">

                <h3>{item.category}</h3>

                <Link
                  to={`/products?category=${encodeURIComponent(item.category)}`}
                  className="category-btn"
                >
                  Explore Category
                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
};

export default Categories;