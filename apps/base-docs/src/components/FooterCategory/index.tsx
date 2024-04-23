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
      <h4 className={styles.footerCategoryTitle}>{title}</h4>
      <ul className={styles.footerCategoryList}>
        {links.map((link) => (
          <li className={styles.footerCategoryListItem}>
            <a key={link.title} href={link.href} className={styles.footerCategoryLink}>
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FooterCategory;
