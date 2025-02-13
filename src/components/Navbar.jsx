import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { slide as Menu } from 'react-burger-menu';
import { useState } from 'react';
import "../styles/navbar.css";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    // Функция для закрытия меню
    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className="navbar">
            <div className="logo">ilona K.</div>
            <ul className='nav-links'>
                <li>
                    <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} onClick={closeMenu}>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""} onClick={closeMenu}>About</NavLink>
                </li>
                <li>
                    <NavLink to="/contacts" className={({ isActive }) => isActive ? "active" : ""} onClick={closeMenu}>Contacts</NavLink>
                </li>
            </ul>

            <Menu right isOpen={menuOpen} onStateChange={({ isOpen }) => setMenuOpen(isOpen)}>
                <ul className='nav-links-bg'>
                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} onClick={closeMenu}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className={({ isActive }) => isActive ? "active" : ""} onClick={closeMenu}>About</NavLink>
                    </li>
                    <li>
                        <NavLink to="/contacts" className={({ isActive }) => isActive ? "active" : ""} onClick={closeMenu}>Contacts</NavLink>
                    </li>
                </ul>
            </Menu>
            <NavLink to="/admin" className="admin-icon">
                <FaUser size={30} />
            </NavLink>
        </nav>
    );
};

export default Navbar;
