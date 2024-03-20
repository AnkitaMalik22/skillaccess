import React from 'react';

function Loader({ size = "md" }) {
  return <span className={`loading loading-spinner loading-${size}`}></span>;
}

export default Loader;


