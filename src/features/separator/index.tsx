import { BlackHole } from './components/BlackHole';

/**
 * Two placements, one for each shape of the fold.
 *
 * `seam` straddles the end of the hero: half the band is pulled up over it, so
 * the hole is centred on the fold and the bottom half eats the empty spacer
 * that opens the about section. A negative top margin resolves against the
 * container width, so `16%` stays half of a `100/32` band at every size.
 *
 * `hero` is the phone, where the social row already sits at the bottom edge and
 * a straddling band lands on top of it. There the hole takes its own place in
 * the flow, between the call to action and the icons.
 */
export function Separator({
  placement = 'seam',
}: {
  placement?: 'seam' | 'hero';
}) {
  const geometry =
    placement === 'seam'
      ? 'pointer-events-none relative z-10 -mt-[230px] -mb-[120px] hidden h-[460px] w-full md:block'
      : 'pointer-events-none relative aspect-[100/32] w-full md:hidden';

  return (
    <div
      aria-hidden="true"
      data-motion-only
      data-separator={placement}
      className={geometry}
    >
      <BlackHole />
    </div>
  );
}
