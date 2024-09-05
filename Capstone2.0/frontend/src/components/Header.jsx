import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <header>
      <nav>
        <div className="nav-container">
          <div className="logo">
            <a href="/">Explore Columbus</a>
          </div>
          <ul className="nav-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/families">Families</a>
            </li>
            <li>
              <a href="/women">Women's Safe Spaces</a>
            </li>
            <li>
              <a href="/couples">Couples & Friends</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
          </ul>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
