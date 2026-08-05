import { BlackHole } from './components/BlackHole';

/**
 * A band, not a section: it carries no copy and no landmark, so it stays out
 * of the document outline and out of the reading order entirely.
 */
export function Separator() {
  return (
    <div
      aria-hidden="true"
      className="relative h-[300px] w-full overflow-hidden bg-bg md:h-[460px]"
    >
      <BlackHole />
    </div>
  );
}
