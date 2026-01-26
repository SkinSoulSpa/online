import React from 'react';

const Button = ({ children, onClick, href, className = '', style = {} }) => {
  const Component = href ? 'a' : 'button';
  
  return (
    <Component
      href={href}
      onClick={onClick}
      className={`btn-shimmer ${className}`}
      style={style}
    >
      {children}
    </Component>
  );
};

export default Button;
