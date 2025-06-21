import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full text-center text-sm text-gray-500 py-6 border-t border-gray-300 dark:border-gray-800">
      © 2025 Boris T. — {t('footer')}
    </footer>
  );
}
