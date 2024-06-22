const CaretDown = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={16}
    data-testid="caret-icon"
    fill="#ffff"
    viewBox="0 0 256 256"
    {...props}
  >
    <path d="m213.66 101.66-80 80a8 8 0 0 1-11.32 0l-80-80a8 8 0 0 1 11.32-11.32L128 164.69l74.34-74.35a8 8 0 0 1 11.32 11.32Z" />
  </svg>
)
export default CaretDown
