import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ProjectCard from './ProjectCard';
import { useSwipeable } from 'react-swipeable';
import { scroller } from 'react-scroll';
import { motion } from 'framer-motion';

export default function Projects() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const wheelHandlerRef = useRef(null);

  const handlers = useSwipeable({
    onSwipedUp: () =>
      scroller.scrollTo('contact', { duration: 600, smooth: true, offset: -60 }),
    onSwipedDown: () =>
      scroller.scrollTo('about', { duration: 600, smooth: true, offset: -60 }),
    preventScrollOnSwipe: true,
    trackTouch: true,
  });

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
      if (e.deltaY > 10) {
        scroller.scrollTo('contact', { duration: 600, smooth: true, offset: -60 });
      } else if (e.deltaY < -10) {
        scroller.scrollTo('about', { duration: 600, smooth: true, offset: -60 });
      }
    };

    wheelHandlerRef.current = handleWheel;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener('wheel', wheelHandlerRef.current, { passive: false });
        } else {
          window.removeEventListener('wheel', wheelHandlerRef.current);
        }
      },
      { threshold: 0.6 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => {
      observer.disconnect();
      window.removeEventListener('wheel', wheelHandlerRef.current);
    };
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      {...handlers}
      className="min-h-screen w-full flex flex-col justify-center px-6 py-20 max-w-7xl mx-auto"
    >
      <motion.h3
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-12 font-orbitron bg-gradient-to-r from-blue-500 to-cyan-400 dark:from-red-500 dark:to-rose-500 text-transparent bg-clip-text"
      >
        {t('projects')}
      </motion.h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((id) => (
          <ProjectCard key={id} id={id} />
        ))}
      </div>
    </section>
  );
}
