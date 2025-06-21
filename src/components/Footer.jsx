import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-300 dark:border-gray-800 py-8 px-6 text-center">
      <p className="text-sm text-gray-600 dark:text-gray-400 font-inter">
        © {currentYear}{' '}
        <span className="font-orbitron font-semibold bg-gradient-to-r from-blue-500 to-cyan-400 dark:from-red-500 dark:to-rose-500 text-transparent bg-clip-text">
          Boris J.
        </span>{' '}
        — {t('footer')}
      </p>
    </footer>
  );
}
