import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import "../styles/navbar.css";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar">
            <div className="logo">koromani</div>
            <button className="menu-toggle" onClick={toggleMenu}>
                {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
            <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
                <li>
                    <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""}>About</NavLink>
                </li>
                <li>
                    <NavLink to="/contacts" className={({ isActive }) => isActive ? "active" : ""}>Contacts</NavLink>
                </li>
            </ul>
            <NavLink to="/admin" className="admin-icon">
                <FaUser size={24} />
            </NavLink>
        </nav>
    );
};

export default Navbar;
