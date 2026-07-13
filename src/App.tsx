import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import ProductCards from './components/sections/ProductCards';
import HowItWorks from './components/sections/HowItWorks';
import Showcase from './components/sections/Showcase';
import Blog from './components/sections/Blog';
import FeedbackForm from './components/forms/FeedbackForm';
import AnimatedBackground from './components/ui/AnimatedBackground';
import ReleasePage from './pages/ReleasePage';

function HomePage() {
  return (
    <>
      <main className="relative z-10">
        <Hero />
        <Showcase />
        <HowItWorks />
        <ProductCards />
        <Blog />
        <FeedbackForm />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-surface-base text-text-secondary font-sans antialiased overflow-x-hidden relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/release" element={<ReleasePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
