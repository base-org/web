import React from 'react';

import styles from './styles.module.css';

type PageSectionProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

function PageSection({ title, description, children }: PageSectionProps) {
  return (
    <section className="layout-container">
      <div className={styles.pageSectionTitle}>{title}</div>
      <div className={styles.pageSectionDescription}>{description}</div>
      <div>{children}</div>
    </section>
  );
}

export default PageSection;
