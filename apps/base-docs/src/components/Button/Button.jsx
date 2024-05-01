import React from 'react';

const variantStyles = {
  primary:
    'text-black bg-white hover:bg-translucent-900 active:bg-translucent-800 ease-in duration-200',
  secondary:
    'text-white bg-transparent border border-white hover:bg-translucent-100 active:bg-translucent-200 ease-in duration-200',
  secondaryDark:
    'text-black bg-transparent border border-black hover:bg-translucent-100 active:bg-translucent-200 ease-in duration-200',
};

function Button({ variant = 'primary', children, className, ...props }) {
  return (
    <button
      {...props}
      type="button"
      className={`font-display rounded text-sm md:text-lg ${
        variantStyles[variant]
      } px-10 py-3.5 text-center ${className || ''}`}
    >
      {children}
    </button>
  );
}

export { Button };
