import React from "react";

function Loader({ size = "sm" }) {
  return <span className={`loading loading-spinner loading-${size}`}></span>;
}

export default Loader;
