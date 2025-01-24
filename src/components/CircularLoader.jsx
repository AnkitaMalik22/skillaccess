import React from "react";
import PropTypes from "prop-types";

function CircularLoader({ size }) {
  return <span className={`loading loading-spinner loading-${size}`}></span>;
}

CircularLoader.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
};

CircularLoader.defaultProps = {
  size: "md",
};

export default CircularLoader;
