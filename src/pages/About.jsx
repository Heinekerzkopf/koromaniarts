import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './about.css';
import author from './author.jpg';

const translations = {
    en: [
        "Ilona Koroman is a painter living and working in Prague. She has Hungarian-Ukrainian roots and graduated from the Academy of Fine Arts in Prague, where she completed her studies in 2025.",
        "In her work, she focuses on the poetics of everyday life, intimate spaces, and quiet moments of ordinary life, which she captures with a sensitive relationship to architecture, light, and atmosphere. Through figurative compositions, urban landscapes, and interiors, she explores the relationship between private and public space, presence and absence, or closeness and alienation.",
        "She finds inspiration in her immediate surroundings, personal experiences, memories, and the observation of everyday situations. Her paintings often capture seemingly inconspicuous moments in which reality intertwines with inner experience. Characteristic for her is the work with atmosphere, light, and the psychology of space, where ordinary situations transform into open images inviting personal interpretation."
    ],
    cz: [
        "Ilona Koroman je malířka žijící a pracující v Praze. Má maďarsko-ukrajinské kořeny a absolvovala Akademii výtvarných umění v Praze, kde dokončila studium v roce 2025.",
        "Ve své tvorbě se soustředí na poetiku každodennosti, intimní prostory a tiché momenty běžného života, které zachycuje s citlivým vztahem k architektuře, světlu a atmosféře. Prostřednictvím figurálních kompozic, městských krajin a interiérů zkoumá vztah mezi soukromým a veřejným prostorem, přítomností a nepřítomností či blízkostí a odcizením.",
        "Inspiraci nachází v bezprostředním okolí, osobních zkušenostech, vzpomínkách a pozorování každodenních situací. Její obrazy často zachycují zdánlivě nenápadné okamžiky, v nichž se prolíná realita s vnitřním prožíváním. Charakteristická je pro ni práce s atmosférou, světlem a psychologií prostoru, kde se obyčejné situace proměňují v otevřené obrazy vybízející k vlastní interpretaci."
    ]
};

const About = () => {
    const [language, setLanguage] = useState("cz");

    return (
        <div className="about-container">
            <Helmet>
                <title>O mně | Koroman Arts</title>
                <meta name="description" content="Něco málo o mně a mé umělecké tvorbě. Olejomalba a originální obrazy z Prahy." />
            </Helmet>
            <h2>{language === 'cz' ? 'O mně' : 'About me'}</h2>
            <div className="about-content">
                <img src={author} alt="Artist" className="about-image" />
                <div>
                    <div className="about-text-container">
                        {translations[language].map((paragraph, index) => (
                            <p key={index} className='about-text'>{paragraph}</p>
                        ))}
                    </div>

                    <div className="language-buttons">
                        <button onClick={() => setLanguage("en")}>EN</button>
                        <button onClick={() => setLanguage("cz")}>CZ</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;