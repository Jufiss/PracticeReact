import React from 'react';


function Button({ onClick, buttonText, className }) {
  return (
    
    <button onClick={onClick} className={className}>{buttonText}</button>
  );
}

export default Button;
