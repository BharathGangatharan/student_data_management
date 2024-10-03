import React from 'react';
import './button.scss';

const Button = ({style,label,className="",onClick}) => {
  return (
    <div className={`buttonContainer button-d ${className}`} style={style} onClick={onClick}>{label}</div>
  )
}

export default Button;