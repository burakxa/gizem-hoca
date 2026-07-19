import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import { AnimatePresence } from 'framer-motion';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import { AdminProvider } from '@/contexts/AdminContext';

import PageLayout from '@/components/layout/PageLayout';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import BlogPage from '@/pages/BlogPage';
import BlogPostPage from '@/pages/BlogPostPage';
import MusteriYorumlariPage from '@/pages/MusteriYorumlariPage';
import GalleryPage from '@/pages/GalleryPage';
import DerslerPage from '@/pages/DerslerPage';
import FiyatlarPage from '@/pages/FiyatlarPage';
import ContactPage from '@/pages/ContactPage';
import ProgramPage from '@/pages/ProgramPage';
import SSFPage from '@/pages/SSFPage';
import NotFoundPage from '@/pages/NotFoundPage';
import KVKKPage from '@/pages/KVKKPage';
import QuizPage from '@/pages/QuizPage';
import AdminPage from '@/pages/AdminPage';

function App() {
  const handleNotImplemented = (e) => {
    if (e) e.preventDefault();
    toast({ title: '🚧 Bu özellik henüz uygulanmadı', duration: 3000 });
  };
  const location = useLocation();

  return (
    <>
      <Helmet>
        <title>Gizem Hoca - Pilates & Wellness | İstanbul</title>
        <meta name="description" content="İstanbul Maltepe'ta profesyonel pilates dersleri." />
      </Helmet>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageLayout handleNotImplemented={handleNotImplemented} />}>
            <Route index element={<HomePage />} />
            <Route path="hakkimda" element={<AboutPage />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:id" element={<BlogPostPage />} />
} />
            <Route path="musteri-yorumlari" element={<MusteriYorumlariPage />} />
} />
} />
            <Route path="galeri" element={<GalleryPage />} />
            <Route path="dersler" element={<DerslerPage />} />
} />
            <Route path="fiyatlar" element={<FiyatlarPage />} />
            <Route path="iletisim" element={<ContactPage />} />
            <Route path="program" element={<ProgramPage />} />
            <Route path="sss" element={<SSFPage />} />
            <Route path="quiz" element={<QuizPage />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="kvkk" element={<KVKKPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
      <Toaster />
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <ErrorBoundary>
      <AdminProvider>
        <App />
      </AdminProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default AppWrapper;
