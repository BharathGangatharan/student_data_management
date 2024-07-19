import React from 'react';
import './loader.scss'

const Loader = ({children}) => {
  return (
    <div className='loader'>
      <h5>Logging in...</h5>     
      {children}
    </div>
  )
}

export default Loader;