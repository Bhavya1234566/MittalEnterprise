import "./WhyChooseUs.css";
import {
  FaShieldAlt,
  FaTruck,
  FaTags,
  FaHeadset,
} from "react-icons/fa";

const features = [
  {
    icon: <FaShieldAlt />,
    title: "Genuine Products",
    desc: "Premium quality tractor parts from trusted manufacturers.",
  },
  {
    icon: <FaTruck />,
    title: "Fast Delivery",
    desc: "Quick and secure delivery across India.",
  },
  {
    icon: <FaTags />,
    title: "Wholesale Prices",
    desc: "Competitive pricing for retailers and bulk buyers.",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    desc: "Friendly customer support whenever you need assistance.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="why-section">
      <div className="container">
        <h2>Why Choose Mittal Enterprises</h2>
        <p className="subtitle">
          Trusted supplier of premium tractor parts across India.
        </p>

        <div className="why-grid">
          {features.map((item, index) => (
            <div className="why-card" key={index}>
              <div className="why-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}