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

        <h2>Contacts:</h2>
        
        
        <div className="contact-info">
          <a href="tel:+420776760718" className="contact-link">
            +420 776 760 718
          </a>
          <a href="mailto:koromani19@gmail.com" className="contact-link">
            koromani19@gmail.com
          </a>
          <a href="https://www.instagram.com/koromanilona" target="_blank" rel="noopener noreferrer" className="contact-link inst-link">
            <img src={instIcon} alt="Instagram" className="inst-icon" />instagram
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contacts;