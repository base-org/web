import React from 'react';
import styles from './styles.module.css';
import clsx from 'clsx';

function Button({ variant = 'primary', children, className, ...props }) {
  return (
    <button
      {...props}
      type="button"
      className={clsx(styles.button, styles[variant], `${className || ''}`)}
    >
      {children}
    </button>
  );
}

export { Button };
