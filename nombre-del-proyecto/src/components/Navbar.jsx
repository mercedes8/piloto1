import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaSearch, FaShoppingCart, FaBars } from "react-icons/fa";
import "./Navbar.css";

const Dropdown = ({ isVisible, categories }) => {
  return (
    <div className={`dropdown ${isVisible ? "visible" : ""}`}>
      {categories.map((category, index) => (
        <div className="category" key={index}>
          {category.map((item, idx) => (
            <a href="#" key={idx}>
              {item}
            </a>
          ))}
        </div>
      ))}
    </div>
  );
};

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isMujerVisible, setIsMujerVisible] = useState(false);
  const [isHombreVisible, setIsHombreVisible] = useState(false);
  const [isNiñoVisible, setIsNiñoVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHamburgerActive, setIsHamburgerActive] = useState(false); // Estado del menú hamburguesa

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
  };

  const toggleHamburgerMenu = () => {
    setIsHamburgerActive(!isHamburgerActive);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const dropdownData = {
    mujer: [
      ["Producto Destacado", "Novedades", "Ver todo"],
      ["Calzado", "Zapatillas", "Fútbol", "Running", "Ver todo"],
      ["Indumentaria", "Remeras", "Camisetas", "Ver todo"],
    ],
    hombre: [
      ["Producto Destacado", "Novedades", "Ver todo"],
      ["Calzado", "Zapatillas", "Fútbol", "Running", "Ver todo"],
      ["Indumentaria", "Remeras", "Camisetas", "Ver todo"],
    ],
    niño: [
      ["Producto Destacado", "Novedades", "Ver todo"],
      ["Calzado", "Zapatillas", "Fútbol", "Running", "Ver todo"],
      ["Indumentaria", "Remeras", "Camisetas", "Ver todo"],
    ],
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      {/* Logo */}
      <Link to="/" className="navbar-logo">
        E-SHOP
      </Link>

      {/* Botón de hamburguesa */}
      <button
        className="hamburger-button"
        onClick={toggleHamburgerMenu}
        aria-label="Abrir menú"
      >
        <FaBars />
      </button>

      {/* Menú hamburguesa */}
      <div className={`menu-hamburger ${isHamburgerActive ? "active" : ""}`}>
        <Link to="/login">Iniciar Sesión</Link>
        <Link to="/register">Registrarse</Link>
        <Link to="/mujer">Mujer</Link>
        <Link to="/hombre">Hombre</Link>
        <Link to="/niño">Niño</Link>
      </div>

      {/* Links del centro */}
      <ul className="navbar-links">
        <li
          className="nav-item"
          onMouseEnter={() => setIsMujerVisible(true)}
          onMouseLeave={() => setIsMujerVisible(false)}
        >
          <Link to="/mujer">MUJER</Link>
          <Dropdown isVisible={isMujerVisible} categories={dropdownData.mujer} />
        </li>
        <li
          className="nav-item"
          onMouseEnter={() => setIsHombreVisible(true)}
          onMouseLeave={() => setIsHombreVisible(false)}
        >
          <Link to="/hombre">HOMBRE</Link>
          <Dropdown
            isVisible={isHombreVisible}
            categories={dropdownData.hombre}
          />
        </li>
        <li
          className="nav-item"
          onMouseEnter={() => setIsNiñoVisible(true)}
          onMouseLeave={() => setIsNiñoVisible(false)}
        >
          <Link to="/niño">NIÑO</Link>
          <Dropdown isVisible={isNiñoVisible} categories={dropdownData.niño} />
        </li>
      </ul>

      {/* Barra de búsqueda */}
      <div className={`search-input-container ${isSearchActive ? "active" : ""}`}>
        <input type="text" placeholder="Buscar productos..." />
        <button>Buscar</button>
      </div>

      {/* Iconos y autenticación */}
      <div className="navbar-icons">
        <span className="icon" onClick={toggleSearch}>
          <FaSearch />
        </span>
        <span className="icon">
          <FaShoppingCart />
        </span>
        {isAuthenticated ? (
          <>
            <span className="navbar-user">Hola {user?.username}</span>
            <button onClick={handleLogout} className="logout-button">
              Cerrar Sesión
            </button>
          </>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="auth-link">
              Iniciar Sesión
            </Link>
            <Link to="/register" className="auth-link">
              Registrarse
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
