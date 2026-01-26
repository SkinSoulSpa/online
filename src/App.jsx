import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollToTop from './components/ScrollToTop';
import MistBackground from './components/MistBackground';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import OrganicLine from './components/OrganicLine';
import WhatsAppWidget from './components/WhatsAppWidget';
import { AudioProvider } from './context/AudioContext';
import Home from './pages/Home';
import Sanctuary from './components/Sanctuary';
import ExperiencesPage from './components/ExperiencesPage';
import './styles/main.scss';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AudioProvider>
        <div className="app" style={{ position: 'relative' }}>
          <Preloader />
          <MistBackground />
          <OrganicLine />
          <Navigation />
          
          <main style={{ position: 'relative', zIndex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sanctuary" element={<Sanctuary />} />
              <Route path="/experiences" element={<ExperiencesPage />} />
            </Routes>
          </main>
          
          <Footer />
          <WhatsAppWidget />
        </div>
      </AudioProvider>
    </Router>
  );
}

export default App;
