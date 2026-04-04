import React from 'react';

const Button = ({ children, onClick, href, className = '', style = {}, ...props }) => {
  const Component = href ? 'a' : 'button';
  
  return (
    <Component
      href={href}
      onClick={onClick}
      className={`btn-shimmer ${className}`}
      style={style}
      {...props}
    >
      <span>{children}</span>
    </Component>
  );
};

export default Button;
