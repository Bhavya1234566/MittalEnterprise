import Navbar from "../../Components/Navbar/Navbar";
import Hero from "../../Components/Hero/Hero";
import Popular from "../../Components/Popularinoil&seal/Popular";
import Categories from "../../Components/Categories/Categories";
import Brands from "../../Components/Brands/Brands";
import Offers from "../../Components/Offers/Offers";
import WhyChooseUs from "../../Components/WhyChooseUs/WhyChooseUs";
import Collection from "../../Components/Collections/Collection";
import CustomerReviews from "../../Components/CustomerReview/CustomerReview";
import FAQs from "../../Components/FAQs/FAQs";
import Footer from "../../Components/Footer/Footer";

const Home = () => {
  return (
    <>
      <Navbar />

      {/* Hero Banner */}
      <Hero />

      {/* Popular Products */}
      <Popular />

      {/* Product Categories */}
      <Categories />

      {/* Featured Brands */}
      <Brands />

      {/* Special Offers */}
      <Offers />

      {/* Why Choose Mittal Enterprises */}
      <WhyChooseUs />

      {/* Featured Collections */}
      <Collection />

      {/* Customer Reviews */}
      <CustomerReviews />

      {/* Frequently Asked Questions */}
      <FAQs />

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;