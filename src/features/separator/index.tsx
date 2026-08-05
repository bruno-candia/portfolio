import { BlackHole } from './components/BlackHole';

/**
 * The band straddles the seam: half of it is pulled up over the end of the
 * hero, so the hole is centred on the fold, and the bottom half eats the empty
 * spacer that opens the about section. A negative top margin resolves against
 * the container width, so `16%` stays half of a `100/32` band at every size.
 */
export function Separator() {
  return (
    <div
      aria-hidden="true"
      data-motion-only
      className="pointer-events-none relative z-10 -mt-[16%] -mb-16 aspect-[100/32] w-full md:-mb-[120px]"
    >
      <BlackHole />
    </div>
  );
}
