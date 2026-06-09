import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './blog.css';
import NewPost from '../components/NewPost';
import PostCard from '../components/PostCard';
import Modal from '../components/Modal';
import EditModal from '../components/EditModal';
import { getPosts } from '../api/api';

const STATIC_EXHIBITIONS = [
    {
        id: 1,
        isCurrent: false,
        title: "Klíčovou dírkou",
        date: "14. January – 14. February 2026",
        location: "Bold Gallery, Praha",
        coverImage: "/exhibitions/exhibition_01/cover.jpg",
        shortDescription: "Svět příběhů Ilony Koroman se otevírá v okamžiku, kdy se cizí intimita stává obrazem. Každý průzor odhaluje fragment reality naplněný očekáváním toho, co se stane. Stíny a světlo vytvářejí prostředí, kde se rodí atmosféra ne/klidu i pocitu osamění. Vnímaní blízkosti druhých odráží vlastní touhy. Výsledkem je vizuální hra mezi viděným a skrytým, mezi přitažlivostí tajemství a marnými pokusy o jeho odhalení. Kurátorem výstavy je Radek Wohlmuth.",
        fullDescription: "Malba Ilony Koroman (1998) se stává médiem intimity a zdůrazněného pohledu. Název její výstavy evokuje situaci, kdy člověk nahlíží do cizího života skrze úzký průzor, který je sice omezený na minimum, ale o to zrádnější a také nebezpečnější může být. Její obrazy představují fragmenty reality zachycené v okamžiku, kdy se stírá rozdíl mezi soukromým a veřejným. Klíčová dírka je navíc metaforou pohledu, který nikdy není neutrální, ale vždy je spojený s touhou, nějakým úmyslem nebo přinejmenším neovládnutou zvědavostí. Ilona Koroman vnímá obraz jako filtr, jenž odhaluje i zakrývá, podobně jako kamera, která rámuje scénu a určuje tím, co smí být vidět a co už ne. Atmosféra cyklu může něčím připomínat film Alfreda Hitchcocka Okno do dvora, kde se voyeurství stává prostředkem k cílenému rozkrývání skrytých událostí. Také Ilona Koroman staví člověka do pozice pozorovatele, který sleduje sekvence situací a útržkovitých dějů, aniž by znal jejich úplný kontext. Takový stav zostřuje pozornost a vyvolává nečekané emoce, pocit napětí a vnitřního neklidu. Její optika volně odkazuje k vizuální poetice Edwarda Hoppera, jehož malby zachycují osamělé postavy v interiérech, ponořených do ticha a světla, které odhaluje a izoluje zároveň. Práce Ilony Koroman podobně nakládají s kontrastem světla a stínu, zvláštní přízračnou atmosférou a pocitem, že každá scéna je výsekem širšího, v celku neuchopitelného příběhu. Ten může být někdy prostým odrazem každodennosti, jindy naopak zachycením něčeho podstatného, co ovšem našemu poznání uniká. Výstava Klíčovou dírkou otevírá také otázku samotného aktu vidění. Pozorování se stává zkušeností, která není jen estetická, ale i existenciální. Divák se konfrontuje se svou rolí i faktem, že sledování někoho nikdy není nevinné, a každý jeho pohled je tak zcizující i zrcadlící zároveň. Ilona Koroman vytváří prostor, kde se intimita mění ve sdílenou zkušenost, a kde se hranice mezi pozorovatelem a pozorovaným nenápadně rozpouští.",
        gallery: [
            "/exhibitions/exhibition_01/01.jpg",
            "/exhibitions/exhibition_01/02.jpg",
            "/exhibitions/exhibition_01/03.jpg",
            "/exhibitions/exhibition_01/04.jpg",
            "/exhibitions/exhibition_01/05.jpg",
            "/exhibitions/exhibition_01/06.jpg",
            "/exhibitions/exhibition_01/07.jpg",
            "/exhibitions/exhibition_01/08.jpg",
            "/exhibitions/exhibition_01/09.jpg",
            "/exhibitions/exhibition_01/10.jpg"
        ]
    },
];

const Blog = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedExhibition, setSelectedExhibition] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await getPosts();
            setPosts(response.data);
        } catch (error) {
            console.error('Error loading posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const openModal = (post) => {
        setSelectedPost(post);
        setIsEditing(false);
    };

    const openEditModal = (post) => {
        setSelectedPost(post);
        setIsEditing(true);
    };

    const closeModal = () => {
        setSelectedPost(null);
    };

    const handleDelete = async (id) => {
        setPosts(posts.filter(post => post._id !== id));
    };

    // Filtrace výstav
    const currentExhibitions = STATIC_EXHIBITIONS.filter(ex => ex.isCurrent);
    const pastExhibitions = STATIC_EXHIBITIONS.filter(ex => !ex.isCurrent);

    // --- POHLED 2: DETAIL VÝSTAVY ---
    if (selectedExhibition) {
        return (
            <div className="blog-container exhibition-detail-container">
                <Helmet>
                    <title>{selectedExhibition.title} | Koroman Arts</title>
                </Helmet>

                <button className="back-button" onClick={() => setSelectedExhibition(null)}>
                    &larr; Zpět na přehled
                </button>

                <div className="exhibition-detail">
                    <h1 className="detail-title">{selectedExhibition.title}</h1>
                    <div className="detail-meta">
                        <span className="meta-date">{selectedExhibition.date}</span>
                        <span className="meta-separator">|</span>
                        <span className="meta-location">{selectedExhibition.location}</span>
                    </div>

                    <p className="detail-description">{selectedExhibition.fullDescription}</p>

                    <div className="detail-gallery">
                        {selectedExhibition.gallery.map((imgUrl, index) => (
                            <img key={index} src={imgUrl} alt={`Z výstavy ${index + 1}`} className="detail-gallery-image" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    // --- POHLED 1: HLAVNÍ STRÁNKA (Novinky + Výstavy) ---
    return (
        <div className="blog-container">
            <Helmet>
                <title>Výstavy a Novinky | Koroman Arts</title>
                <meta name="description" content="Přečtěte si novinky a informace o mých výstavách." />
            </Helmet>

            {/* SEKCE 1: DYNAMICKÉ NOVINKY (POSTS) */}
            <div className="news-section">
                <h1 className="section-title">Novinky</h1>
                <div className="blog-new-post">
                    <NewPost onCreated={fetchPosts} />
                </div>
                <div className="blog-content">
                    {loading && (
                        <div className="loading-indicator">
                            <div className="circle"></div>
                        </div>
                    )}
                    <div className="posts">
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <PostCard
                                    key={post._id}
                                    post={post}
                                    onClick={openModal}
                                    onEditClick={openEditModal}
                                    onDelete={handleDelete}
                                />
                            ))
                        ) : (
                            !loading && <p className="no-posts-message">Zatím zde nejsou žádné aktuality...</p>
                        )}
                    </div>

                    {selectedPost && !isEditing && (
                        <Modal image={selectedPost} onClose={closeModal} />
                    )}

                    {selectedPost && isEditing && (
                        <EditModal
                            image={selectedPost}
                            onClose={closeModal}
                            onUpdate={fetchPosts}
                        />
                    )}
                </div>
            </div>

            <hr className="section-divider" />

            {/* SEKCE 2: AKTUÁLNÍ VÝSTAVA */}
            {currentExhibitions.length > 0 && (
                <div className="exhibitions-section">
                    <h2 className="section-title">Aktuální výstava</h2>
                    <div className="exhibitions-list">
                        {currentExhibitions.map((ex) => (
                            <div className="exhibition-card" key={ex.id}>
                                <div className="card-image-wrapper">
                                    <img src={ex.coverImage} alt={ex.title} className="card-image" />
                                </div>
                                <div className="card-content">
                                    <span className="card-date">{ex.date}</span>
                                    <h3 className="card-title">{ex.title}</h3>
                                    <p className="card-location">{ex.location}</p>
                                    <p className="card-description">{ex.shortDescription}</p>
                                    <button className="card-button" onClick={() => setSelectedExhibition(ex)}>
                                        Více o výstavě
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* SEKCE 3: PŘEDCHOZÍ VÝSTAVY */}
            {pastExhibitions.length > 0 && (
                <div className="exhibitions-section past-exhibitions">
                    <h2 className="section-title">Předchozí výstavy</h2>
                    <div className="exhibitions-list">
                        {pastExhibitions.map((ex) => (
                            <div className="exhibition-card" key={ex.id}>
                                <div className="card-image-wrapper">
                                    <img src={ex.coverImage} alt={ex.title} className="card-image" />
                                </div>
                                <div className="card-content">
                                    <span className="card-date">{ex.date}</span>
                                    <h3 className="card-title">{ex.title}</h3>
                                    <p className="card-location">{ex.location}</p>
                                    <p className="card-description">{ex.shortDescription}</p>
                                    <button className="card-button" onClick={() => setSelectedExhibition(ex)}>
                                        Více o výstavě
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Blog;