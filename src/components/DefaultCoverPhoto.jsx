import React from 'react';

const DefaultCoverPhoto = () => {
  return (
    <svg className="w-full h-full" viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
      {/* Background rectangle */}
      <rect width="100%" height="100%" className="fill-transparent" />

      {/* Camera icon */}
      <circle cx="250" cy="100" r="30" className="fill-gray-400" />
      <rect x="240" y="80" width="20" height="10" className="fill-gray-400" />
      <circle cx="250" cy="100" r="10" className="fill-white" />

      {/* Placeholder text */}
      <text
        x="50%"
        y="85%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="fill-gray-600 text-lg"
      >
        Cover Photo
      </text>
    </svg>
  );
};

export default DefaultCoverPhoto;
