import React from 'react';
import "../styles/footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <p>All rights reserved {new Date().getFullYear()}</p>
        </footer>
    );
};

export default Footer;
