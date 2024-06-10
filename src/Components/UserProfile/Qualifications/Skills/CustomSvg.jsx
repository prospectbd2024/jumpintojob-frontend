import React from 'react';

function CustomSVG({ className, style, pathClassName, pathStyle }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      width="24"
      // height="1080"
      className={className}
      style={style}
      viewBox="0 0 1080 1080"
      xmlSpace="preserve"
    >
      <desc>Created with Fabric.js 5.2.4</desc>
      <defs></defs>
      <g transform="matrix(1 0 0 1 540 540)" id="3e350558-c547-4db9-9c81-a6e12eff9d53">
        <rect
          style={{
            stroke: 'none',
            strokeWidth: '1',
            strokeDasharray: 'none',
            strokeLinecap: 'butt',
            strokeDashoffset: '0',
            strokeLinejoin: 'miter',
            strokeMiterlimit: '4',
            fill: 'rgb(255,255,255)',
            fillRule: 'nonzero',
            opacity: '1',
            visibility: 'hidden',
          }}
          vectorEffect="non-scaling-stroke"
          x="-540"
          y="-540"
          rx="0"
          ry="0"
          width="1080"
          height="1080"
        />
      </g>
      <g transform="matrix(1 0 0 1 540 540)" id="16c8d8d1-37ef-410e-b125-ae30ae6fae60"></g>
      <g transform="matrix(1.88 0 0 1.88 828.12 540)">
        <path
          style={{
            stroke: 'rgb(0,0,0)',
            strokeWidth: '10', // Adjust the width of the outline as needed
            strokeDasharray: 'none',
            strokeLinecap: 'butt',
            strokeDashoffset: '0',
            strokeLinejoin: 'miter',
            strokeMiterlimit: '4',
            fill: 'none', // Remove fill
            opacity: '1',
            ...pathStyle,
          }}
          className={pathClassName}
          transform="translate(-154.25, -255.96)"
          d="M 288 0 C 276.6 0 265.2 5.9 259.3 17.8 L 194 150.2 L 47.9 171.4 C 21.7 175.20000000000002 11.199999999999996 207.5 30.2 226 L 135.9 329 L 110.9 474.5 C 106.4 500.6 133.9 520.5 157.3 508.2 L 300 439.6"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export default CustomSVG;
