import React from "react";
import "./contacts.css";

const Contacts = () => {
  return (
    <div className="contacts-container">
      <div className="contacts-card">
        <h2>Get in Touch</h2>
        <p>
          If you are interested in my paintings, feel free to contact me via email or phone.
        </p>
        <div className="contact-info">
          <p>
            <strong>Phone: </strong> 
            <a href="tel:+420776760718">+420 776 760 718</a>
          </p>
          <p>
            <strong>Email: </strong> 
            <a href="mailto:koromani19@gmail.com">koromani19@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
