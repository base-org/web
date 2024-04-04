import React from 'react';

import styles from './styles.module.css';

type FooterLink = {
  title: string;
  href: string;
};

type FooterCategoryProps = {
  title: string;
  links: FooterLink[];
};

function FooterCategory({ title, links }: FooterCategoryProps) {
  return (
    <div className={styles.footerCategory}>
      <div className={styles.footerCategoryTitle}>{title}</div>
      {links.map((link) => (
        <a key={link.title} href={link.href} className={styles.footerCategoryLink}>
          {link.title}
        </a>
      ))}
    </div>
  );
}

export default FooterCategory;
