import React from 'react';
import { useTranslation } from 'react-i18next';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const { t } = useTranslation();

  return (
    <section className="w-full px-6 py-16 max-w-7xl mx-auto">
      <h3 className="text-3xl font-semibold text-purple-400 mb-8 text-center">{t('projects')}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((id) => (
          <ProjectCard key={id} id={id} />
        ))}
      </div>
    </section>
  );
}
