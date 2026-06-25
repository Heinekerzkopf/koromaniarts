import React from "react";
import { Helmet } from 'react-helmet-async';
import "./contacts.css";
import contactImage from './contact-bp.JPG'; 
import instIcon from '../img/inst.png';

const Contacts = () => {
  return (
    <div className="contacts-container">
      <Helmet>
          <title>Kontakty | Koroman Arts</title>
          <meta name="description" content="Kontaktujte mě ohledně koupě obrazů nebo spolupráce." />
      </Helmet>

      <div className="contacts-card">
        <div className="contact-image-wrapper">
            <img src={contactImage} alt="Atelier" />
        </div>

        <h2>Contact</h2>
        
        <div className="contact-info">
          
          {/* TELEFON */}
          <div className="contact-group">
            <span className="contact-label">Phone</span>
            <a href="tel:+420776760718" className="contact-link">
              +420 776 760 718
            </a>
          </div>

          {/* E-MAIL */}
          <div className="contact-group">
            <span className="contact-label">E-mail</span>
            <a href="mailto:koromani19@gmail.com" className="contact-link">
              koromani19@gmail.com
            </a>
          </div>

          {/* INSTAGRAM */}
          <div className="contact-group">
            <span className="contact-label">Instagram</span>
            <a href="https://www.instagram.com/koromanilona" target="_blank" rel="noopener noreferrer" className="contact-link inst-link">
              <img src={instIcon} alt="Instagram" className="inst-icon" /> @koromanilona
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contacts;