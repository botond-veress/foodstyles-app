import React from 'react';

export const Logo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 32" {...props}>
    <g fill="none" fillRule="evenodd">
      <path
        fill="#4A4AE5"
        d="M2.577 10.006L13.998 10.013 14.005 21.638 2.584 21.631z"
        transform="translate(-152 -98) translate(152 98) rotate(-45 8.29 15.822)"
      />
      <path
        fill="#4A77E5"
        d="M18.337 -0.692L29.758 -0.699 29.737 32.749 18.316 32.756z"
        transform="translate(-152 -98) translate(152 98) rotate(45 24.037 16.028)"
      />
    </g>
  </svg>
);
