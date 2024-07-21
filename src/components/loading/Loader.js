import React from 'react';
import './loader.scss'

const Loader = ({children,label,horizontal,labelColor}) => {
  return (
    <div className={`${horizontal ? 'hloader':'vloader'}`}>
      <h5 style={{'color': labelColor}}>{label}</h5>
      {children}
    </div>
  )
}

export default Loader;