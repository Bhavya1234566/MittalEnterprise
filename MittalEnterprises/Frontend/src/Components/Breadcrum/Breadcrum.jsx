import React from "react";
import { Link } from "react-router-dom";
import "./Breadcrum.css";

const Breadcrumb = ({ currentPage }) => {
  return (
    <div className="breadcrumb">
      <div className="breadcrumb-container">
        <Link to="/">Home</Link>
        <span className="separator">›</span>
        <span className="current-page">{currentPage}</span>
      </div>
    </div>
  );
};

export default Breadcrumb;