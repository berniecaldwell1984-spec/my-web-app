import React from "react";

export const Icons = {
  Bot: ({ className = "", size = 20 }) => (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="3" y="7" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8.5" cy="12" r="1" fill="currentColor" />
      <circle cx="15.5" cy="12" r="1" fill="currentColor" />
      <path d="M8 4v3M16 4v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),

  Send: ({ className = "", size = 16 }) => (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M22 2L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default Icons;
