import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { slide as Menu } from 'react-burger-menu';
import "../styles/navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">koromani</div>
            <ul className='nav-links'>
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

            <Menu right>
                <ul className='nav-links-bg'>
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
            </Menu>

            <NavLink to="/admin" className="admin-icon">
                <FaUser size={30} />
            </NavLink>
        </nav>
    );
};

export default Navbar;
