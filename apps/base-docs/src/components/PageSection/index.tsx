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
      <h2 className={styles.pageSectionTitle}>{title}</h2>
      <h3 className={styles.pageSectionDescription}>{description}</h3>
      <div>{children}</div>
    </section>
  );
}

export default PageSection;
