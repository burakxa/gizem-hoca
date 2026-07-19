import { useEffect, useRef } from 'react';

export function useParallax(speed = 0.3) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handle = () => {
      const rect = el.getBoundingClientRect();
      const scrolled = window.scrollY;
      const offset = (rect.top + scrolled) * speed;
      el.style.transform = `translateY(${offset * 0.15}px)`;
    };

    window.addEventListener('scroll', handle, { passive: true });
    handle();
    return () => window.removeEventListener('scroll', handle);
  }, [speed]);

  return ref;
}
