import React from 'react';
import { useTranslation } from 'react-i18next';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const { t } = useTranslation();

  return (
    <section className="w-full px-6 py-20 max-w-7xl mx-auto">
      <h3 className="text-4xl font-bold text-center mb-12 font-orbitron bg-gradient-to-r from-blue-500 to-cyan-400 dark:from-red-500 dark:to-rose-500 text-transparent bg-clip-text">
        {t('projects')}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((id) => (
          <ProjectCard key={id} id={id} />
        ))}
      </div>
    </section>
  );
}
