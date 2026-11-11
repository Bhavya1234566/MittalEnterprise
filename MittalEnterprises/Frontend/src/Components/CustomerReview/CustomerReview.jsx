import "./CustomerReview.css";
import { FaStar, FaUserCircle } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "Rajesh Kumar",
    location: "Punjab",
    review:
      "Excellent quality tractor parts. The oil seals fit perfectly and delivery was fast. Highly recommended!",
  },
  {
    id: 2,
    name: "Mohit Sharma",
    location: "Rajasthan",
    review:
      "Best wholesale prices with genuine products. Customer support was very helpful.",
  },
  {
    id: 3,
    name: "Sandeep Singh",
    location: "Haryana",
    review:
      "Premium quality bearings and fast delivery. I will definitely order again.",
  },
];

const CustomerReviews = () => {
  return (
    <section className="reviews-section">
      <div className="container">
        <div className="section-header">
          <h2>Customer Reviews</h2>
          <p>Trusted by Farmers, Dealers & Workshops Across India</p>
        </div>

        <div className="reviews-grid">
          {reviews.map((item) => (
            <div className="review-card" key={item.id}>
              <div className="review-top">
                <FaUserCircle className="user-icon" />

                <div>
                  <h3>{item.name}</h3>
                  <span>{item.location}</span>
                </div>
              </div>

              <div className="stars">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </div>

              <p>{item.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;