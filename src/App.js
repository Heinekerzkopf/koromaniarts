import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home'
import About from './pages/About'
import Contacts from './pages/Contacts'
import Admin from './pages/Admin'
import Footer from "./components/Footer";
import Blog from "./pages/Blog";

function App() {
    return (
        <div className="App">
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
}

export default App;
