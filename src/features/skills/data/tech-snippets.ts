/**
 * Code sample per technology, keyed by the same label used in resume.json.
 *
 * Recovered from the previous skills data module. A missing entry falls back
 * to the section default, so this map does not have to be exhaustive.
 */

export interface TechSnippet {
  language: string;
  code: string;
}

export const TECH_SNIPPETS: Record<string, TechSnippet> = {
  'Node.js': {
    language: 'ts',
    code: `import { createServer } from 'node:http';

createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ ok: true }));
}).listen(3000);`,
  },
  Python: {
    language: 'python',
    code: `from fastapi import FastAPI

app = FastAPI()

@app.get('/health')
async def health() -> dict[str, str]:
    return {'status': 'ok'}`,
  },
  JavaScript: {
    language: 'js',
    code: `const grouped = Object.groupBy(orders, (o) => o.status);

const total = orders
  .filter((o) => o.status === 'paid')
  .reduce((sum, o) => sum + o.cents, 0);`,
  },
  Playwright: {
    language: 'ts',
    code: `test('sends a page view only after consent', async ({ page }) => {
  const event = page.waitForRequest((r) => r.url().includes('/api/events'));
  await page.goto('/');
  await page.getByRole('button', { name: /Accept/ }).click();
  expect((await event).postDataJSON().name).toBe('page_view');
});`,
  },
  'React Native': {
    language: 'tsx',
    code: `export function Screen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Row item={item} />}
      />
    </SafeAreaView>
  );
}`,
  },
  Expo: {
    language: 'ts',
    code: `import * as Updates from 'expo-updates';

const { isAvailable } = await Updates.checkForUpdateAsync();
if (isAvailable) {
  await Updates.fetchUpdateAsync();
  await Updates.reloadAsync();
}`,
  },
  Shell: {
    language: 'bash',
    code: `#!/usr/bin/env bash
set -euo pipefail

trap 'echo "failed on line $LINENO" >&2' ERR

for svc in api web worker; do
  docker compose up -d "$svc"
done`,
  },
  Prometheus: {
    language: 'yaml',
    code: `groups:
  - name: portfolio
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~'5..'}[5m]) > 0.05
        for: 10m`,
  },
  Grafana: {
    language: 'json',
    code: `{
  "title": "Latency p95",
  "targets": [
    { "expr": "histogram_quantile(0.95, rate(http_duration_bucket[5m]))" }
  ]
}`,
  },
  'Clean Architecture': {
    language: 'ts',
    code: `// the use case knows the port, never the adapter
export class TransferMoney {
  constructor(private readonly accounts: AccountRepository) {}

  async execute(input: TransferInput): Promise<Result> {
    return this.accounts.transaction((tx) => tx.move(input));
  }
}`,
  },
  Git: {
    language: 'bash',
    code: `git log --graph --oneline --decorate

# a branch per slice keeps master green
git switch -c feature/redesign-skills`,
  },
  AWS: {
    language: 'yaml',
    code: `Resources:
  MyBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: my-app-bucket`,
  },
  Axios: {
    language: 'typescript',
    code: `// Axios Request
const api = axios.create({
  baseURL: 'https://api.example.com'
});

const getUser = async (id: number) => {
  const response = await api.get(\\`,
  },
  Azure: {
    language: 'bash',
    code: `az group create --name myResourceGroup --location eastus
az appservice plan create --name myAppServicePlan`,
  },
  'C++': {
    language: 'cpp',
    code: `// C++ Memory Management
std::unique_ptr<WindTurbine> turbine = std::make_unique<WindTurbine>();
turbine->calculatePowerOutput();`,
  },
  CSS: {
    language: 'css',
    code: `/* CSS Grid Layout */
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}`,
  },
  Cypress: {
    language: 'javascript',
    code: `// Cypress E2E Test
describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('https://example.cypress.io')
    cy.contains('type').click()
  })
})`,
  },
  DDD: {
    language: 'plaintext',
    code: `Bounded Contexts:
- Integreates Ubiquitous Language
- Entities, Value Objects, Aggregates
- Domain Services & Events`,
  },
  Docker: {
    language: 'dockerfile',
    code: `FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]`,
  },
  ESLint: {
    language: 'json',
    code: `{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "rules": {
    "react/prop-types": "off"
  }
}`,
  },
  Electron: {
    language: 'typescript',
    code: `// Electron Main Process
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}`,
  },
  Express: {
    language: 'javascript',
    code: `// Express Middleware
app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})`,
  },
  Figma: {
    language: 'json',
    code: `{
  "plugin": "Figma API",
  "action": "export",
  "format": "SVG",
  "scale": 2
}`,
  },
  Firebase: {
    language: 'json',
    code: `{
  "hosting": {
    "public": "public",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}`,
  },
  'GitHub Actions': {
    language: 'yaml',
    code: `steps:
  - uses: actions/checkout@v2
  - name: Run a one-line script
    run: echo Hello, world!`,
  },
  HTML: {
    language: 'html',
    code: `<!-- HTML5 Semantic Structure -->
<article>
  <header>
    <h1>Article Title</h1>
    <p>Posted by John Doe</p>
  </header>
  <p>Article content goes here...</p>
</article>`,
  },
  JWT: {
    language: 'javascript',
    code: `// JWT Sign
const token = jwt.sign(
  { foo: 'bar' },
  'shhhhh',
  { expiresIn: '1h' }
);`,
  },
  Jest: {
    language: 'typescript',
    code: `// Mobile Test
test('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});`,
  },
  Kubernetes: {
    language: 'yaml',
    code: `apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.14.2`,
  },
  MVVM: {
    language: 'kotlin',
    code: `// MVVM ViewModel
class UserViewModel : ViewModel() {
    private val _users = MutableLiveData<List<User>>()
    val users: LiveData<List<User>> = _users
}`,
  },
  'Micro-frontends': {
    language: 'javascript',
    code: `// Module Federation
remotes: {
  app1: 'app1@http://localhost:3001/remoteEntry.js',
  app2: 'app2@http://localhost:3002/remoteEntry.js',
},`,
  },
  'Module Federation': {
    language: 'javascript',
    code: `new ModuleFederationPlugin({
  name: 'host_app',
  remotes: {
    remote_app: 'remote_app@http://localhost:3001/remoteEntry.js',
  },
}),`,
  },
  MongoDB: {
    language: 'javascript',
    code: `// MongoDB Aggregation
db.orders.aggregate([
  { $match: { status: "A" } },
  { $group: { _id: "$cust_id", total: { $sum: "$amount" } } }
])`,
  },
  Monorepo: {
    language: 'json',
    code: `// Turborepo Configuration
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    }
  }
}`,
  },
  MySQL: {
    language: 'sql',
    code: `-- MySQL Query
SELECT * FROM orders
INNER JOIN customers ON orders.customer_id = customers.id
WHERE customers.country = 'Brazil';`,
  },
  NestJS: {
    language: 'typescript',
    code: `// NestJS Controller
@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}`,
  },
  'Next.js': {
    language: 'typescript',
    code: `// Next.js Page (App Router)
export default async function Page() {
  const data = await getData();
  return <main>{data.title}</main>;
}`,
  },
  Performance: {
    language: 'javascript',
    code: `// Web Vitals
import { onCLS, onFID, onLCP } from 'web-vitals';

onCLS(console.log);
onFID(console.log);
onLCP(console.log);`,
  },
  PostgreSQL: {
    language: 'sql',
    code: `-- PostgreSQL Query
SELECT name, email
FROM users
WHERE created_at > NOW() - INTERVAL '1 month';`,
  },
  Prisma: {
    language: 'typescript',
    code: `// Prisma Query
const user = await prisma.user.findUnique({
  where: {
    email: 'alice@prisma.io',
  },
})`,
  },
  'REST / OpenAPI': {
    language: 'json',
    code: `{
  "resource": "/users",
  "method": "GET",
  "responses": {
    "200": { "description": "OK" },
    "404": { "description": "Not Found" }
  }
}`,
  },
  React: {
    language: 'tsx',
    code: `// React Hook
const [count, setCount] = useState(0);

useEffect(() => {
  document.title = \\`,
  },
  'React Navigation': {
    language: 'typescript',
    code: `// React Navigation Stack
<Stack.Navigator>
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="Details" component={DetailsScreen} />
</Stack.Navigator>`,
  },
  'React Query': {
    language: 'typescript',
    code: `// React Query
const { data, isLoading } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
});`,
  },
  Redis: {
    language: 'javascript',
    code: `// Redis Caching
await redisClient.set('user:1', JSON.stringify(user), {
  EX: 3600
});`,
  },
  Redux: {
    language: 'typescript',
    code: `// Redux Slice
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value++;
    },
  },
});`,
  },
  'SQL Server': {
    language: 'sql',
    code: `-- SQL Server T-SQL
SELECT TOP 10 *
FROM Sales.Orders
ORDER BY OrderDate DESC;`,
  },
  Sass: {
    language: 'scss',
    code: `// SCSS Nesting & Variables
$primary-color: #3498db;

.nav {
  background-color: $primary-color;
  ul {
    list-style: none;
    li { display: inline-block; }
  }
}`,
  },
  'Socket.IO': {
    language: 'javascript',
    code: `// Real-time Event
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});`,
  },
  SonarQube: {
    language: 'properties',
    code: `sonar.projectKey=my:project
sonar.projectName=My Project
sonar.projectVersion=1.0
sonar.sources=src`,
  },
  Storybook: {
    language: 'typescript',
    code: `// Storybook Story
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};`,
  },
  Swagger: {
    language: 'yaml',
    code: `openapi: 3.0.0
info:
  title: Sample API
  version: 0.1.9
paths:
  /users:
    get:
      summary: Returns a list of users`,
  },
  Tailwind: {
    language: 'css',
    code: `<!-- Tailwind CSS -->
<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div class="p-6 bg-white rounded-xl shadow-lg">
    <h2 class="text-xl font-bold text-gray-800">Card Title</h2>
  </div>
</div>`,
  },
  Terraform: {
    language: 'hcl',
    code: `resource "aws_instance" "app_server" {
  ami           = "ami-830c94e3"
  instance_type = "t2.micro"
  tags = {
    Name = "ExampleAppServerInstance"
  }
}`,
  },
  'Testing Library': {
    language: 'typescript',
    code: `// React Testing Library
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});`,
  },
  TypeScript: {
    language: 'typescript',
    code: `// TypeScript Interface
interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'user';
}

function getUser(id: number): Promise<User> {
  // fetch user implementation
}`,
  },
  Vercel: {
    language: 'json',
    code: `{
  "headers": [
    {
      "source": "/service-worker.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}`,
  },
  Vite: {
    language: 'typescript',
    code: `// Vite Config (vite.config.ts)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
});`,
  },
  Vitest: {
    language: 'typescript',
    code: `// Vitest Test
import { expect, test } from 'vitest'

test('should pass', () => {
  expect(true).toBe(true)
})`,
  },
  'styled-components': {
    language: 'typescript',
    code: `// Native Styled Component
const Container = styled.View\\`,
  },
};
