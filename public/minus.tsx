import * as React from 'react'
const MinusIcon = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={24}
    fill="rgba(168, 174, 191, 1)"
    viewBox="0 0 256 256"
    {...props}
  >
    <path d="M224 128a8 8 0 0 1-8 8H40a8 8 0 0 1 0-16h176a8 8 0 0 1 8 8Z" />
  </svg>
)
export default MinusIcon
