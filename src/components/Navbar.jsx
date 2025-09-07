import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { slide as Menu } from "react-burger-menu";
import { useEffect, useState } from "react";
import "../styles/navbar.css";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(
        () => window.innerWidth < 768
    );

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const closeMenu = () => setMenuOpen(false);

    const navItems = (
        <>
            <li>
                <NavLink to="/" onClick={closeMenu} className={({ isActive }) => (isActive ? "active" : "")}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => (isActive ? "active" : "")}>
                    About
                </NavLink>
            </li>
            <li>
                <NavLink to="/blog" onClick={closeMenu} className={({ isActive }) => (isActive ? "active" : "")}>
                    Blog
                </NavLink>
            </li>
            <li>
                <NavLink to="/contacts" onClick={closeMenu} className={({ isActive }) => (isActive ? "active" : "")}>
                    Contacts
                </NavLink>
            </li>
        </>
    );

    return (
        <nav className="navbar">
            <div className="logo navbar__column">Koroman</div>

            {isMobile ? (
                <Menu right isOpen={menuOpen} onStateChange={({ isOpen }) => setMenuOpen(isOpen)}>
                    <ul className="nav-links-bg">{navItems}</ul>
                </Menu>
            ) : (
                <ul className="nav-links navbar__column center-me">{navItems}</ul>
            )}

            <NavLink to="/admin" className="admin-icon">
                <FaUser size={30} />
            </NavLink>
        </nav>
    );
};

export default Navbar;
