import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { ThemeContext } from '../context/ThemeContext';

export default function About() {
  const { t } = useTranslation();
  const { darkMode } = useContext(ThemeContext);

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [displayedText, setDisplayedText] = useState('');
  const [fixedHeight, setFixedHeight] = useState(null);
  const fullTextRef = useRef(null);

  const fullText = t('about.text');

  useEffect(() => {
    if (!inView) return;

    setDisplayedText('');
    let i = 0;

    // Pre animacije izmeri visinu punog teksta
    if (fullTextRef.current) {
      setFixedHeight(fullTextRef.current.offsetHeight);
    }

    const interval = setInterval(() => {
      setDisplayedText(prev => {
        if (i > fullText.length) {
          clearInterval(interval);
          setFixedHeight(null); // Ukloni kada završi
          return fullText;
        }
        const next = fullText.slice(0, i);
        i++;
        return next;
      });
    }, 8);

    return () => clearInterval(interval);
  }, [inView, fullText, i18n.language]);

  const textColor = darkMode ? 'text-white' : 'text-black';
  const promptColor = darkMode ? 'text-red-500' : 'text-blue-600';
  const accentColor = darkMode ? 'text-red-400' : 'text-blue-700';
  const borderColor = darkMode ? 'border-neutral-800' : 'border-neutral-300';

  const renderStyledJson = () => {
    const lines = displayedText.split('\n');
    return lines.map((line, index) => {
      const match = line.match(/^(\s*"[^"]*"\s*:\s*)(.*)/);
      if (match) {
        const keyPart = match[1];
        const valuePart = match[2];
        return (
          <div key={index}>
            <span>{keyPart}</span>
            <span className={accentColor}>{valuePart}</span>
          </div>
        );
      }
      return <div key={index}>{line}</div>;
    });
  };

  return (
    <motion.section
      id="about"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="w-full px-4 sm:px-6 py-12 max-w-4xl mx-auto mt-10"
    >
      <div
        className={`rounded-2xl shadow-xl border ${borderColor} overflow-hidden backdrop-blur-sm bg-[#000000]/60`}
      >
        <div className="p-4 sm:p-6 font-mono relative">

          {/* Prompt */}
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className={`mb-4 ${promptColor} select-none`}
          >
            {'> cat about.txt'}
          </motion.p>

          {/* Nevidljivo merenje */}
          <pre
            ref={fullTextRef}
            className="absolute opacity-0 pointer-events-none whitespace-pre-wrap text-sm sm:text-base leading-relaxed"
          >
            {fullText}
          </pre>

          {/* Prikaz */}
          <pre
            className={`whitespace-pre-wrap text-sm sm:text-base ${textColor} leading-relaxed transition-all duration-300 min-h-[240px]`}
            style={fixedHeight ? { minHeight: `${fixedHeight + 40}px` } : {}}
          >
            {renderStyledJson()}
            {displayedText.length === fullText.length && (
              <motion.span
                className={accentColor}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                █
              </motion.span>
            )}
          </pre>
        </div>
      </div>
    </motion.section>
  );
}
