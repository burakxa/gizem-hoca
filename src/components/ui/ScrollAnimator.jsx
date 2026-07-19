import { useEffect } from 'react';

export default function ScrollAnimator() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    const observe = () => {
      document.querySelectorAll('.fade-up, .fade-left, .fade-right, .scale-in').forEach(el => {
        observer.observe(el);
      });
    };

    observe();
    // SPA route değişimlerinde tekrar gözlemle
    const timer = setInterval(observe, 800);
    setTimeout(() => clearInterval(timer), 4000);

    return () => observer.disconnect();
  }, []);

  return null;
}
