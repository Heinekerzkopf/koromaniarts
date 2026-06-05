import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './about.css';
import author from './author.jpg'

const translations = {
    en: "Welcome to my artistic world. My name is Ilona Koroman and I am a painter based in Prague. Creating art is more than just a passion for me – it is a language through which I communicate my emotions, thoughts, and perception of the world around me. Each of my paintings is an original with its own story, into which I put a piece of myself. I focus primarily on oil painting, striving to create works that not only decorate a space but, more importantly, resonate with those who look at them.",
    ua: "Ласкаво прошу до мого мистецького світу. Мене звати Ілона Короман, я художниця, яка працює в Празі. Творчість для мене — це більше, ніж просто захоплення. Це мова, якою я передаю свої емоції, думки та сприйняття навколишнього світу. Кожна з моїх картин — це оригінал із власною історією, в яку я вкладаю частинку себе. Я зосереджуюся переважно на олійному живописі, прагнучи створювати роботи, які не лише прикрашають простір, але й резонують з тими, хто на них дивиться.",
    cz: "Vítejte v mém uměleckém světě. Jmenuji se Ilona Koroman a jsem malířka působící v Praze. Tvorba je pro mě víc než jen vášeň – je to jazyk, kterým sděluji své emoce, myšlenky a vnímání okolního světa. Každý z mých obrazů je originál s vlastním příběhem, do kterého vkládám kus sebe. Zaměřuji se především na olejomalbu, přičemž se snažím, aby má díla nejen zdobila prostor, ale hlavně rezonovala s těmi, kteří se na ně dívají."
};

const About = () => {
    const [language, setLanguage] = useState("cz");

    return (
        <div className="about-container">
            <Helmet>
                <title>O mně | Koroman Arts</title>
                <meta name="description" content="Něco málo o mně a mé umělecké tvorbě. Olejomalba a originální obrazy z Prahy." />
            </Helmet>
            <h2>O mně</h2>
            <div className="about-content">
                <img src={author} alt="Artist" className="about-image" />
                <div>
                    <p className='about-text'>{translations[language]}</p>
                    <div className="language-buttons">
                        <button onClick={() => setLanguage("ua")}>UA</button>
                        <button onClick={() => setLanguage("en")}>EN</button>
                        <button onClick={() => setLanguage("cz")}>CZ</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;