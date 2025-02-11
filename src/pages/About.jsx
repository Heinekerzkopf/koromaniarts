import React, { useState } from 'react';
import './about.css';
import author from './author.png'

const translations = {
    en: "Hello! My name is Ilona. I am an artist passionate about creating unique paintings. Each of my works reflects emotions and stories that I want to share with the world.",
    ru: "Привет! Меня зовут Илона. Я художник, увлечённый созданием уникальных картин. Каждая моя работа отражает эмоции и истории, которыми я хочу поделиться с миром.",
    cz: "Ahoj! Jmenuji se Ilona. Jsem umělec, který se věnuje vytváření jedinečných obrazů. Každé mé dílo odráží emoce a příběhy, které chci sdílet se světem."
};

const About = () => {
    const [language, setLanguage] = useState("en");

    return (
        <div className="about-container">
            <h2>About Me</h2>
            <div className="about-content">
                <img src={author} alt="Artist" className="about-image" />
                <div>
                    <p className="about-text">{translations[language]}</p>
                    <div className="language-buttons">
                        <button onClick={() => setLanguage("ru")}>RU</button>
                        <button onClick={() => setLanguage("en")}>EN</button>
                        <button onClick={() => setLanguage("cz")}>CZ</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
