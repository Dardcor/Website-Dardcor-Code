import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Showcase from './components/sections/Showcase';
import AgentsBuild from './components/sections/AgentsBuild';
import MultiSurface from './components/sections/MultiSurface';
import SessionsView from './components/sections/SessionsView';
import CustomizationSection from './components/sections/CustomizationSection';
import FreeStartCta from './components/sections/FreeStartCta';
import CoreEditor from './components/sections/CoreEditor';
import ExtensionsSection from './components/sections/ExtensionsSection';
import LanguagesSection from './components/sections/LanguagesSection';
import CustomizableSection from './components/sections/CustomizableSection';
import CodeAnywhereSection from './components/sections/CodeAnywhereSection';
import RichFeaturesSection from './components/sections/RichFeaturesSection';
import Blog from './components/sections/Blog';
import AnimatedBackground from './components/ui/AnimatedBackground';
import DownloadPage from './pages/DownloadPage';
import ReleasePage from './pages/ReleasePage';
import FeaturesAgentsPage from './pages/FeaturesAgentsPage';
import FeaturesModelsPage from './pages/FeaturesModelsPage';
import FeaturesCustomizationsPage from './pages/FeaturesCustomizationsPage';
import FeaturesEnterprisePage from './pages/FeaturesEnterprisePage';
import FeaturesExtensibilityPage from './pages/FeaturesExtensibilityPage';
import DocsPage from './pages/DocsPage';
import DocsArticlePage from './pages/DocsArticlePage';
import ApiPage from './pages/ApiPage';
import FaqPage from './pages/FaqPage';
import BlogPage from './pages/BlogPage';
import LearnPage from './pages/LearnPage';
import McpPage from './pages/McpPage';
import { findDocsArticle } from './data/docsContent';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const canonicalPath = findDocsArticle(pathname)?.path ?? (pathname.replace(/\/+$/, '') || '/');
    const canonicalUrl = `https://www.dardcor-code.web.id${canonicalPath === '/' ? '/' : canonicalPath}`;
    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);
    document.querySelector<HTMLMetaElement>('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);
  }, [pathname]);
  return null;
}

function HomePage() {
  return (
    <main className="relative z-10">
      <Hero />
      <Showcase />
      <AgentsBuild />
      <MultiSurface />
      <SessionsView />
      <CustomizationSection />
      <FreeStartCta />
      <CoreEditor />
      <ExtensionsSection />
      <LanguagesSection />
      <CustomizableSection />
      <CodeAnywhereSection />
      <RichFeaturesSection />
      <Blog />
    </main>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-black text-text-secondary font-sans antialiased overflow-x-hidden relative flex flex-col">
      <AnimatedBackground />
      <ScrollToTop />
      <div className="relative z-10 flex flex-col flex-1">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/download" element={<DownloadPage />} />
            <Route path="/Download" element={<DownloadPage />} />
            <Route path="/release" element={<ReleasePage />} />
            <Route path="/updates" element={<ReleasePage />} />
            <Route path="/updates/*" element={<DocsArticlePage />} />
            <Route path="/features/agents" element={<FeaturesAgentsPage />} />
            <Route path="/features/models" element={<FeaturesModelsPage />} />
            <Route path="/features/customizations" element={<FeaturesCustomizationsPage />} />
            <Route path="/features/enterprise" element={<FeaturesEnterprisePage />} />
            <Route path="/features/extensibility" element={<FeaturesExtensibilityPage />} />
            <Route path="/docs" element={<DocsPage />} />
            <Route path="/docs/*" element={<DocsArticlePage />} />
            <Route path="/api" element={<ApiPage />} />
            <Route path="/api/*" element={<DocsArticlePage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/docs/supporting/faq" element={<FaqPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/mcp" element={<McpPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
