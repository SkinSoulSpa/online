import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ScrollToTop from './components/ScrollToTop';
import GoogleAnalytics from './components/GoogleAnalytics';
import MistBackground from './components/MistBackground';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import OrganicLine from './components/OrganicLine';
import WhatsAppWidget from './components/WhatsAppWidget';
import BackToTopButton from './components/BackToTopButton';
import { AudioProvider } from './context/AudioContext';
import Home from './pages/Home';
import Sanctuary from './components/Sanctuary';
import ExperiencesPage from './components/ExperiencesPage';
import Promotions from './components/Promotions';
import TheArtisans from './components/TheArtisans';
import TheJournal from './components/TheJournal';
import Reservations from './components/Reservations';
import './styles/main.scss';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <GoogleAnalytics />
      <AudioProvider>
        <div className="app" style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Preloader onComplete={() => setIsLoaded(true)} />
          <MistBackground />
          <OrganicLine />
          <Navigation />
          
          <main style={{ position: 'relative', zIndex: 1, flex: '1 0 auto', paddingTop: '80px' }}>
            <Routes>
              <Route path="/" element={<Home isLoaded={isLoaded} />} />
              <Route path="/sanctuary" element={<Sanctuary />} />
              <Route path="/experiences" element={<ExperiencesPage />} />
              <Route path="/promotions" element={<Promotions />} />
              <Route path="/artisans" element={<TheArtisans />} />
              <Route path="/journal" element={<TheJournal />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          
          <Footer />
          <WhatsAppWidget />
          <BackToTopButton />
        </div>
      </AudioProvider>
    </Router>
  );
}

export default App;
