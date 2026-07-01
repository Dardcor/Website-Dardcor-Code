import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import ProductCards from './components/sections/ProductCards';
import BuiltForDevs from './components/sections/BuiltForDevs';
import Showcase from './components/sections/Showcase';
import Blog from './components/sections/Blog';
import FeedbackForm from './components/forms/FeedbackForm';
import DownloadPage from './pages/DownloadPage';

function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Showcase />
        <ProductCards />
        <BuiltForDevs />
        <Blog />
        <FeedbackForm />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-surface-base text-text-secondary font-sans antialiased overflow-x-hidden">
      <div className="noise-overlay" />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/download" element={<DownloadPage />} />
      </Routes>
    </div>
  );
}

export default App;
