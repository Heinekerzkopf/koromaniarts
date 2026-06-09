import { NavLink } from "react-router-dom";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import "../styles/navbar.css";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);

    // Sledování velikosti okna
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Zabráníme scrollování pozadí, když je mobilní menu otevřené
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    const navItems = (
        <>
            <li>
                <NavLink to="/" onClick={closeMenu} className={({ isActive }) => (isActive ? "active" : "")}>
                    Portfolio
                </NavLink>
            </li>
            <li>
                <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => (isActive ? "active" : "")}>
                    About
                </NavLink>
            </li>
            <li>
                <NavLink to="/blog" onClick={closeMenu} className={({ isActive }) => (isActive ? "active" : "")}>
                    Exhibitions
                </NavLink>
            </li>
            <li>
                <NavLink to="/contacts" onClick={closeMenu} className={({ isActive }) => (isActive ? "active" : "")}>
                    Contact
                </NavLink>
            </li>
        </>
    );

    return (
        <nav className="navbar">
            <NavLink to="/" className="logo navbar__column" onClick={closeMenu}>
                Koroman
            </NavLink>

            {!isMobile && (
                <ul className="nav-links navbar__column center-me">{navItems}</ul>
            )}

            <div className="mobile-controls navbar__column">
                <NavLink to="/admin" className="admin-icon">
                    <FaUser size={isMobile ? 24 : 30} />
                </NavLink>

                {isMobile && (
                    <button className="burger-icon" onClick={() => setMenuOpen(true)}>
                        <FaBars size={28} />
                    </button>
                )}
            </div>

            {isMobile && (
                <div className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}>
                    <button className="close-menu-btn" onClick={closeMenu}>
                        <FaTimes size={36} color="#ffffff" />
                    </button>
                    <ul className="mobile-nav-links">
                        {navItems}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;