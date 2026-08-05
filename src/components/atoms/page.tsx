/**
 * The page grid, in one place so no section invents its own.
 *
 * Content is `--container` wide and the two vertical rules sit one `--gutter`
 * outside it, so nothing ever touches a rule. The Figma frames draw the rules
 * flush against the content because a static frame has no scrollbar and no
 * text that reflows; on the page that reads as content running into the line.
 */
export const pageContent =
  'mx-auto w-full max-w-[calc(var(--container)+2*var(--gutter))] px-5 md:px-[var(--gutter)]';

export function PageRules() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-[calc(var(--container)+2*var(--gutter))] -translate-x-1/2 md:block"
    >
      <span className="absolute inset-y-0 left-0 w-px bg-line" />
      <span className="absolute inset-y-0 right-0 w-px bg-line" />
    </div>
  );
}
