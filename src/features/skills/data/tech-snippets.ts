/**
 * One snippet per technology, keyed by the label used in resume.json.
 *
 * Every entry shows the thing you only learn after running the technology in
 * production: the footgun, the option nobody sets, the reason the obvious
 * version breaks. Listing syntax would prove nothing, since the syntax is on
 * the first page of any documentation.
 *
 * The comment names the trap and the code shows the way out. A missing entry
 * falls back to the section default, so this map does not have to be
 * exhaustive.
 */

export interface TechSnippet {
  language: string;
  code: string;
  /** Only when the name derived from the label reads wrong. */
  file?: string;
}

export const TECH_SNIPPETS: Record<string, TechSnippet> = {
  TypeScript: {
    language: 'typescript',
    code: `// An annotation widens. \`satisfies\` checks the shape
// and keeps the literal types, so routes.case stays a
// template literal, not string.
const routes = {
  home: '/',
  case: '/projetos/aurem',
} satisfies Record<string, \`/\${string}\`>;`,
  },

  React: {
    language: 'tsx',
    code: `// Resetting state with an effect runs after the paint,
// so the old document flashes first. A new key remounts
// before anything renders.
<Editor key={documentId} initialValue={doc.body} />`,
  },

  'Next.js': {
    language: 'typescript',
    code: `// notFound() cannot set the status once the shell
// has streamed: the response is already 200 with a
// not-found body. Closing the params moves the
// decision to before the render.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}`,
  },

  Tailwind: {
    language: 'css',
    code: `@theme {
  /* A --spacing-<n> key does not add a token. It
     redefines what p-<n> means, so declaring the
     design scale in pixels turns h-16 into 16px
     while every other number stays on the 4px
     multiplier. */
}`,
  },

  'React Query': {
    language: 'typescript',
    code: `// gcTime only decides when an unused cache entry is
// dropped. Without staleTime the query refetches on
// every mount anyway.
useQuery({
  queryKey: ['case', slug],
  queryFn: fetchCase,
  staleTime: 60_000,
});`,
  },

  Vitest: {
    language: 'typescript',
    code: `// vi.mock is hoisted above the imports, so the factory
// cannot read anything declared outside it. vi.hoisted
// gives it something to read.
const { get } = vi.hoisted(() => ({ get: vi.fn() }));
vi.mock('./client', () => ({ get }));`,
  },

  Redux: {
    language: 'typescript',
    code: `// A selector that builds a new object returns a new
// reference every dispatch, so the component re-renders
// even when nothing changed.
const ids = useSelector((state) => state.users.ids);
const user = useSelector((state) => state.users.byId[id]);`,
  },

  Playwright: {
    language: 'typescript',
    code: `// reuseExistingServer picks up a dev server started by
// hand, which does not carry the test environment. The
// suite then fails for a reason that has nothing to do
// with the code.
webServer: {
  command: 'npm run dev',
  env: { NEXT_PUBLIC_ANALYTICS_TEST_MODE: 'true' },
  reuseExistingServer: false,
}`,
  },

  Storybook: {
    language: 'typescript',
    code: `// A story that only renders proves the component
// mounts. The play function turns it into a test
// of the interaction.
export const Submits: Story = {
  play: async ({ canvasElement }) => {
    const form = within(canvasElement);
    const save = form.getByRole('button');
    await userEvent.click(save);
  },
};`,
  },

  Vite: {
    language: 'typescript',
    code: `// define does a raw text substitution at build
// time, so the value is baked into the bundle.
// Anything secret shipped this way is public.
export default defineConfig({
  define: {
    __BUILD__: JSON.stringify(process.env.GIT_SHA),
  },
});`,
  },

  'Testing Library': {
    language: 'typescript',
    code: `// getBy throws immediately, so it cannot wait for
// anything async. findBy is the one that retries until
// the element shows up.
await screen.findByRole('heading', { name: 'Aurem' });`,
  },

  Electron: {
    language: 'javascript',
    code: `// A transparent always-on-top window still eats
// every click under it. setIgnoreMouseEvents is
// what lets the caption float over PowerPoint.
const overlay = new BrowserWindow({
  transparent: true,
  frame: false,
});
overlay.setAlwaysOnTop(true, 'screen-saver');
overlay.setIgnoreMouseEvents(true, { forward: true });`,
  },

  JavaScript: {
    language: 'javascript',
    code: `// sort mutates the array it is called on, so this
// quietly reorders the caller's data. toSorted returns
// a copy.
const newest = works.toSorted((a, b) => b.year - a.year);`,
  },

  HTML: {
    language: 'html',
    code: `<!-- display: contents removes the box the browser
     uses to hide closed content, so nothing is
     hidden and the panel stays readable. -->
<details>
  <summary>Decisions</summary>
  <div>...</div>
</details>`,
  },

  CSS: {
    language: 'css',
    code: `/* An unlayered rule beats anything inside a layer,
   whatever the specificity. A reset copied outside
   @layer disables every utility it touches. */
@layer base, utilities;

@layer base {
  * { margin: 0; }
}`,
  },

  Sass: {
    language: 'scss',
    code: `// @import evaluates the file again on every import, so
// shared variables get duplicated in the output. @use
// loads it once.
@use 'tokens' as t;

.card { border-color: t.$line; }`,
  },

  'styled-components': {
    language: 'javascript',
    code: `// Without ServerStyleSheet the CSS arrives after the
// HTML, so the first paint is unstyled. On a landing
// page that is the first impression the company gets.
const sheet = new ServerStyleSheet();
const html = renderToString(sheet.collectStyles(<App />));
const css = sheet.getStyleTags();`,
  },

  Axios: {
    language: 'typescript',
    code: `// An interceptor that refreshes on 401 loops
// forever if the refresh call itself 401s. The
// retry flag is what stops it.
api.interceptors.response.use(undefined, (error) => {
  const request = error.config;
  if (error.response?.status !== 401) throw error;
  if (request._retry) throw error;
  request._retry = true;
  return api(request);
});`,
  },

  Figma: {
    language: 'javascript',
    code: `// vectorPaths are normalised to the node bounding box,
// so setting a path moves the node. Reposition by the
// path minimum afterwards.
node.vectorPaths = [{ windingRule: 'NONZERO', data }];
node.x = originalX + minX;`,
  },

  Jest: {
    language: 'typescript',
    code: `// Fake timers freeze the clock for promises too, so an
// await that depends on a timer never settles.
// advanceTimersByTime has to run between the call and
// the assertion.
jest.useFakeTimers();
const promise = debouncedSave();
jest.advanceTimersByTime(500);
await promise;`,
  },

  Cypress: {
    language: 'javascript',
    code: `// cy commands are queued, not promises. Reading a value
// outside the chain reads it before the queue has run.
cy.get('[data-test=total]')
  .invoke('text')
  .then((total) => expect(total).to.equal('R$ 120,00'));`,
  },

  ESLint: {
    language: 'javascript',
    code: `// In flat config the order is the precedence: the
// last object wins. A formatting config placed
// before the rules silently loses to them.
export default [
  js.configs.recommended,
  ...tseslint.configs.strict,
  prettier,
];`,
  },

  'Node.js': {
    language: 'typescript',
    code: `// Reading the whole body into memory works until
// someone uploads a file bigger than the container. A
// stream keeps memory flat.
await pipeline(request, createWriteStream(target));`,
  },

  Python: {
    language: 'python',
    code: `# A default argument is evaluated once, at definition
# time, so every call shares the same list. None is the
# only safe default.
def collect(item, into=None):
    into = [] if into is None else into
    into.append(item)
    return into`,
  },

  NestJS: {
    language: 'typescript',
    code: `// A request-scoped provider makes every consumer
// request-scoped too, including the controller. That
// quietly costs an instance per request.
@Injectable({ scope: Scope.REQUEST })
export class TenantContext {}`,
  },

  PostgreSQL: {
    language: 'sql',
    code: `-- A function on the indexed column throws the
-- index away. Index the expression instead.
CREATE INDEX ON orders (lower(email));

SELECT * FROM orders WHERE lower(email) = $1;`,
  },

  Prisma: {
    language: 'typescript',
    code: `// A findMany in a loop is one query per row. include
// resolves the relation in the same round-trip.
const cases = await prisma.project.findMany({
  include: { decisions: true },
});`,
  },

  'REST / OpenAPI': {
    language: 'yaml',
    code: `# A 201 without Location makes the client guess where
# the resource landed, and every client guesses
# differently.
responses:
  '201':
    headers:
      Location:
        schema: { type: string }`,
  },

  Express: {
    language: 'javascript',
    code: `// Error middleware is recognised by its arity.
// Drop the fourth argument and Express registers
// a normal handler that never runs.
app.use((error, request, response, next) => {
  response.status(error.status ?? 500).json({
    message: error.message,
  });
});`,
  },

  Redis: {
    language: 'bash',
    code: `# SET then EXPIRE can crash between the two and leave a
# lock forever. One command with NX and EX is atomic.
SET lock:invoice 1 NX EX 30`,
  },

  MongoDB: {
    language: 'javascript',
    code: `// Without a projection the driver pulls every field
// over the wire, including the blobs nobody on this
// screen reads.
db.cases.find({ published: true }, { title: 1, slug: 1 });`,
  },

  MySQL: {
    language: 'sql',
    code: `-- utf8 in MySQL is three bytes and cannot store
-- an emoji. utf8mb4 is the actual UTF-8.
ALTER TABLE messages CONVERT TO CHARACTER SET utf8mb4;`,
  },

  'SQL Server': {
    language: 'sql',
    code: `-- NOLOCK is not "no lock", it is "read
-- uncommitted": rows that were rolled back, and
-- rows read twice. Snapshot isolation is the fix.
ALTER DATABASE app SET READ_COMMITTED_SNAPSHOT ON;`,
  },

  'Socket.IO': {
    language: 'javascript',
    code: `// Broadcasting to everyone means every classroom gets
// every caption. Rooms are what keep a lesson inside
// its own lesson.
socket.join(\`lesson:\${lessonId}\`);
io.to(\`lesson:\${lessonId}\`).emit('caption', text);`,
  },

  JWT: {
    language: 'javascript',
    code: `// Verifying without pinning the algorithm accepts a
// token that says alg: none, or one signed with the
// public key as an HMAC secret.
jwt.verify(token, publicKey, { algorithms: ['RS256'] });`,
  },

  Swagger: {
    language: 'yaml',
    code: `# A spec written by hand drifts from the code within a
# sprint. Generating it from the same decorators that
# validate the request means the two cannot disagree.
components:
  schemas:
    Project:
      $ref: '#/components/schemas/ProjectDto'`,
  },

  'C++': {
    language: 'cpp',
    file: 'farm.cpp',
    code: `// Writing one of destructor, copy or move suppresses
// the others and you inherit a class that copies when
// you meant it to move. Owning the resource with a
// smart pointer keeps all five defaulted.
class Farm {
  std::vector<std::unique_ptr<Turbine>> turbines;
};`,
  },

  Wiremock: {
    language: 'json',
    code: `{
  "comment": "Stubs match in priority order and the
              default is 5, so a catch-all still
              wins unless the specific stub is
              given a lower number.",
  "priority": 1,
  "request": { "method": "GET", "url": "/orders/42" }
}`,
  },

  'Robot Framework': {
    language: 'markup',
    file: 'suite.robot',
    code: `*** Settings ***
# Test Setup runs per test, Suite Setup runs once.
# Logging in per test is what turns a five minute suite
# into a forty minute one.
Suite Setup    Log In As    operator`,
  },

  Docker: {
    language: 'docker',
    file: 'Dockerfile',
    code: `# Copying everything before installing busts the
# dependency layer on every source change. The manifest
# goes first so the install is cached.
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .`,
  },

  'GitHub Actions': {
    language: 'yaml',
    code: `# A tag is mutable: the same tag can point at new
# code tomorrow. A SHA cannot, which is why a
# pinned action is reviewable.
# v4.2.2
- uses: actions/checkout@11bd7190`,
  },

  Terraform: {
    language: 'hcl',
    code: `# count keys resources by position, so removing the
# first element destroys and recreates everything after
# it. for_each keys by name.
resource "sentry_rule" "alert" {
  for_each = var.alerts
  name     = each.key
}`,
  },

  AWS: {
    language: 'json',
    code: `{
  "Comment": "A wildcard resource is the difference
              between a leaked key reading one
              bucket and reading the account.",
  "Effect": "Allow",
  "Action": ["s3:GetObject"],
  "Resource": "arn:aws:s3:::assets-prod/*"
}`,
  },

  Prometheus: {
    language: 'yaml',
    code: `# A counter only means something as a rate, and an alert
# without a for clause fires on a single scrape blip.
expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.05
for: 10m`,
  },

  Shell: {
    language: 'bash',
    code: `# Without this a failing command in the middle of the
# script is ignored and the deploy carries on with half
# the work done.
set -euo pipefail`,
  },

  Kubernetes: {
    language: 'yaml',
    code: `# Liveness restarts the container, readiness only takes
# it out of the load balancer. Pointing liveness at a
# slow dependency turns a blip into a restart loop.
readinessProbe:
  httpGet: { path: /ready, port: 3000 }
livenessProbe:
  httpGet: { path: /healthz, port: 3000 }`,
  },

  Grafana: {
    language: 'json',
    code: `{
  "comment": "A dashboard edited in the UI lives
              only in that database. Provisioned
              from a file it survives the volume
              and shows up in review.",
  "apiVersion": 1,
  "providers": [
    { "type": "file", "options": { "path": "/etc/dash" } }
  ]
}`,
  },

  Vercel: {
    language: 'typescript',
    code: `// A route that reads a cookie or a header opts the
// whole tree out of static rendering, and the bill
// follows. next-intl does it implicitly unless the
// locale is set before rendering.
setRequestLocale(locale);`,
  },

  Azure: {
    language: 'typescript',
    code: `// The speech socket closes after a stretch of
// silence, and the reconnect drops the words
// spoken during it. Restarting on the cancelled
// event is what keeps a lesson captioned.
recognizer.canceled = () =>
  recognizer.startContinuousRecognitionAsync();`,
  },

  'Azure Pipelines': {
    language: 'yaml',
    code: `# A pipeline triggered by pull_request_target runs with
# the base repository secrets while checking out the
# fork's code.
trigger:
  branches: { include: [master] }
pr:
  autoCancel: true`,
  },

  Firebase: {
    language: 'javascript',
    code: `// Rules are the only thing between the client SDK and
// the database, because the client talks to it
// directly. A read rule of true is a public database.
match /leads/{id} {
  allow read: if request.auth.token.admin == true;
}`,
  },

  SonarQube: {
    language: 'yaml',
    code: `# Coverage on the whole project only ever moves slowly,
# so nobody reacts to it. A gate on new code fails the
# PR that caused the drop.
sonar.qualitygate.wait: true
sonar.newCode.referenceBranch: master`,
  },

  'CI/CD': {
    language: 'yaml',
    code: `# Two applies racing on the same state file corrupt it.
# A concurrency group without cancel-in-progress queues
# them instead.
concurrency:
  group: terraform-apply
  cancel-in-progress: false`,
  },

  Git: {
    language: 'bash',
    code: `# Reading the diff of a hundred commits finds nothing.
# bisect finds the one commit in seven steps, and the
# test can be a script.
git bisect start HEAD v1.4.0
git bisect run npm test`,
  },

  'Clean Architecture': {
    language: 'typescript',
    code: `// The dependency rule is the whole idea: the use case
// names the port and the database implements it, so the
// domain never imports Prisma.
export interface ProjectRepository {
  bySlug(slug: string): Promise<Project | null>;
}`,
  },

  DDD: {
    language: 'typescript',
    code: `// The aggregate is a consistency boundary, not a
// folder. If an invariant spans two of them, one of the
// boundaries is drawn wrong.
class Lesson {
  enrol(student: Student) {
    if (this.seats === 0) throw new LessonFull();
  }
}`,
  },

  MVVM: {
    language: 'typescript',
    code: `// The view model is where the logic becomes
// testable, because it runs without mounting
// anything. A hook that returns JSX is not one.
export function useWorkCardViewModel(project) {
  return {
    href: \`/projetos/\${project.slug}\`,
    isLive: !project.endDate,
  };
}`,
  },

  Monorepo: {
    language: 'json',
    code: `{
  "comment": "Running every test on every commit is
              what makes people stop trusting CI.
              The task graph runs only what the
              change can reach.",
  "tasks": { "test": { "dependsOn": ["^build"] } }
}`,
  },

  'Micro-frontends': {
    language: 'typescript',
    code: `// Independent deploys are the point, and shared runtime
// state is what takes them away. The contract between
// hosts is the URL.
window.location.assign(\`/checkout?cart=\${cartId}\`);`,
  },

  'Module Federation': {
    language: 'javascript',
    code: `// Two copies of React load happily and then break hooks
// at runtime. singleton is what makes the version
// mismatch fail loudly instead.
shared: {
  react: { singleton: true, requiredVersion: deps.react },
}`,
  },

  Performance: {
    language: 'typescript',
    code: `// Optimising before measuring moves the code and not
// the number. The profile said the cost was the image,
// not the render.
performance.mark('case:start');
performance.measure('case', 'case:start');`,
  },

  'React Native': {
    language: 'tsx',
    code: `// Every crossing of the bridge costs. Driving the
// animation on the native side keeps it at 60fps while
// JavaScript is busy.
Animated.timing(opacity, {
  toValue: 1,
  useNativeDriver: true,
}).start();`,
  },

  Expo: {
    language: 'javascript',
    code: `// Editing android/ and ios/ by hand means prebuild
// overwrites the change. A config plugin makes it
// part of the build instead.
module.exports = (config) =>
  withAndroidManifest(config, addCaptionService);`,
  },

  'React Navigation': {
    language: 'typescript',
    code: `// Params belong to a screen, not to a navigator, so
// reading them one level up returns undefined. The
// nested form addresses the screen.
navigation.navigate('Lesson', {
  screen: 'Captions',
  params: { lessonId },
});`,
  },
};
