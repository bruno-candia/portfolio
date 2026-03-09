import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiRedux,
  SiReactquery,
  SiAxios,
  SiTailwindcss,
  SiSass,
  SiStyledcomponents,
  SiDocker,
  SiGit,
  SiGithubactions,
  SiVite,
  SiStorybook,
  SiNodedotjs,
  SiNestjs,
  SiExpress,
  SiPrisma,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiJsonwebtokens,
  SiSwagger,
  SiJest,
  SiVitest,
  SiTestinglibrary,
  SiCypress,
  SiEslint,
  SiFigma,
  SiExpo,
  SiElectron,
  SiReactrouter,
  SiVercel,
  SiKubernetes,
  SiTerraform,
  SiSonarqube,
  SiFirebase,
  SiCplusplus,
  SiRedis,
  SiSocketdotio,
} from 'react-icons/si';
import {
  FaLayerGroup,
  FaRobot,
  FaServer,
  FaDatabase,
  FaAws,
} from 'react-icons/fa';
import { TbApi } from 'react-icons/tb';
import { MdArchitecture, MdAccountTree, MdSpeed } from 'react-icons/md';

import { GoWorkflow } from 'react-icons/go';
import { VscSymbolInterface } from 'react-icons/vsc';
import { AiOutlineApartment } from 'react-icons/ai';
import { IconType } from 'react-icons';
import { AzureIcon, AzurePipelinesIcon } from '../components/CustomIcons';

export interface TechStack {
  id: string;
  icon: IconType;
  learning?: boolean;
  language?: string;
  codeSnippet?: string;
  color?: string;
}

export interface SkillCategory {
  id: string;
  image: string;
  defaultLanguage: string;
  defaultIcon: IconType;
  defaultCode: string;
  defaultColor: string;
  stacks: TechStack[];
}

const frontendCode = `// React Component with TypeScript
interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button = ({ variant, children, onClick }: ButtonProps) => {
  return (
    <button
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};`;

const backendCode = `// Spring Boot REST Controller
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userService.findById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody UserDTO dto) {
        User user = userService.create(dto);
        return ResponseEntity.status(201).body(user);
    }
}`;

const mobileCode = `// React Native Component
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text>Go to Profile</Text>
      </TouchableOpacity>
    </View>
  );
};`;

const arquiteturaCode = `# Clean Architecture Layers
src/
├── domain/           # Enterprise Business Rules
│   ├── entities/
│   └── value-objects/
├── application/      # Application Business Rules
│   ├── use-cases/
│   └── ports/
├── infrastructure/   # Frameworks & Drivers
│   ├── repositories/
│   └── services/
└── presentation/     # Interface Adapters
    ├── controllers/
    └── presenters/`;

const devopsCode = `# GitHub Actions CI/CD Pipeline
name: Deploy Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build Docker Image
        run: docker build -t app:latest .

      - name: Push to Registry
        run: |
          docker tag app:latest \${{ secrets.REGISTRY }}/app:latest
          docker push \${{ secrets.REGISTRY }}/app:latest

      - name: Deploy to Kubernetes
        run: kubectl apply -f k8s/`;

export const skillsData: SkillCategory[] = [
  {
    id: 'frontend',
    image: '/frontend.png',
    defaultLanguage: 'typescript',
    defaultIcon: SiTypescript,
    defaultCode: frontendCode,
    defaultColor: '#3178C6',
    stacks: [
      {
        id: 'javascript',
        icon: SiJavascript,
        language: 'javascript',
        color: '#F7DF1E',
        codeSnippet: `// Modern JavaScript
const fetchData = async () => {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};`,
      },
      {
        id: 'typescript',
        icon: SiTypescript,
        language: 'typescript',
        color: '#3178C6',
        codeSnippet: `// TypeScript Interface
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
      {
        id: 'react',
        icon: SiReact,
        language: 'tsx',
        color: '#61DAFB',
        codeSnippet: `// React Hook
const [count, setCount] = useState(0);

useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);`,
      },
      {
        id: 'nextjs',
        icon: SiNextdotjs,
        language: 'typescript',
        color: '#FFFFFF',
        codeSnippet: `// Next.js Page (App Router)
export default async function Page() {
  const data = await getData();
  return <main>{data.title}</main>;
}`,
      },
      {
        id: 'redux',
        icon: SiRedux,
        language: 'typescript',
        color: '#764ABC',
        codeSnippet: `// Redux Slice
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
      {
        id: 'react-query',
        icon: SiReactquery,
        language: 'typescript',
        color: '#FF4154',
        codeSnippet: `// React Query
const { data, isLoading } = useQuery({
  queryKey: ['todos'],
  queryFn: fetchTodos,
});`,
      },
      {
        id: 'html',
        icon: SiHtml5,
        language: 'html',
        color: '#E34F26',
        codeSnippet: `<!-- HTML5 Semantic Structure -->
<article>
  <header>
    <h1>Article Title</h1>
    <p>Posted by John Doe</p>
  </header>
  <p>Article content goes here...</p>
</article>`,
      },
      {
        id: 'css',
        icon: SiCss3,
        language: 'css',
        color: '#1572B6',
        codeSnippet: `/* CSS Grid Layout */
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}`,
      },
      {
        id: 'tailwind',
        icon: SiTailwindcss,
        language: 'css',
        color: '#06B6D4',
        codeSnippet: `<!-- Tailwind CSS -->
<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div class="p-6 bg-white rounded-xl shadow-lg">
    <h2 class="text-xl font-bold text-gray-800">Card Title</h2>
  </div>
</div>`,
      },
      {
        id: 'sass',
        icon: SiSass,
        language: 'scss',
        color: '#CC6699',
        codeSnippet: `// SCSS Nesting & Variables
$primary-color: #3498db;

.nav {
  background-color: $primary-color;
  ul {
    list-style: none;
    li { display: inline-block; }
  }
}`,
      },
      {
        id: 'styled-components',
        icon: SiStyledcomponents,
        language: 'typescript',
        color: '#DB7093',
        codeSnippet: `// Styled Components
const Button = styled.button<{ primary?: boolean }>\`
  background: \${props => props.primary ? "palevioletred" : "white"};
  color: \${props => props.primary ? "white" : "palevioletred"};
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
\`;`,
      },
      {
        id: 'vite',
        icon: SiVite,
        language: 'typescript',
        color: '#646CFF',
        codeSnippet: `// Vite Config (vite.config.ts)
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
});`,
      },
      {
        id: 'axios',
        icon: SiAxios,
        language: 'typescript',
        color: '#5A29E4',
        codeSnippet: `// Axios Request
const api = axios.create({
  baseURL: 'https://api.example.com'
});

const getUser = async (id: number) => {
  const response = await api.get(\`/users/\${id}\`);
  return response.data;
};`,
      },
      {
        id: 'figma',
        icon: SiFigma,
        color: '#F24E1E',
        language: 'json',
        codeSnippet: `{
  "plugin": "Figma API",
  "action": "export",
  "format": "SVG",
  "scale": 2
}`,
      },
      {
        id: 'storybook',
        icon: SiStorybook,
        language: 'typescript',
        color: '#FF4785',
        codeSnippet: `// Storybook Story
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};`,
      },
      {
        id: 'jest',
        icon: SiJest,
        language: 'typescript',
        color: '#C21325',
        codeSnippet: `// Jest Test
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});`,
      },
      {
        id: 'vitest',
        icon: SiVitest,
        language: 'typescript',
        color: '#6E9F18',
        codeSnippet: `// Vitest Test
import { expect, test } from 'vitest'

test('should pass', () => {
  expect(true).toBe(true)
})`,
      },
      {
        id: 'testing-library',
        icon: SiTestinglibrary,
        language: 'typescript',
        color: '#E33332',
        codeSnippet: `// React Testing Library
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});`,
      },
      {
        id: 'cypress',
        icon: SiCypress,
        language: 'javascript',
        color: '#17202C',
        codeSnippet: `// Cypress E2E Test
describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('https://example.cypress.io')
    cy.contains('type').click()
  })
})`,
      },

      {
        id: 'eslint',
        icon: SiEslint,
        language: 'json',
        color: '#4B32C3',
        codeSnippet: `{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "rules": {
    "react/prop-types": "off"
  }
}`,
      },
      {
        id: 'electron',
        icon: SiElectron,
        language: 'typescript',
        color: '#47848F',
        codeSnippet: `// Electron Main Process
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}`,
      },
    ],
  },
  {
    id: 'backend',
    image: '/backend.png',
    defaultLanguage: 'javascript',
    defaultIcon: SiNodedotjs, // Changed from FaJava
    defaultCode: backendCode,
    defaultColor: '#007396',
    stacks: [
      {
        id: 'nodejs',
        icon: SiNodedotjs,
        language: 'javascript',
        color: '#339933',
        codeSnippet: `// Node.js Express Server
const app = express();
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(3000);`,
      },
      {
        id: 'cpp',
        icon: SiCplusplus,
        language: 'cpp',
        color: '#00599C',
        codeSnippet: `// C++ Memory Management
std::unique_ptr<WindTurbine> turbine = std::make_unique<WindTurbine>();
turbine->calculatePowerOutput();`,
      },
      {
        id: 'nestjs',
        icon: SiNestjs,
        language: 'typescript',
        color: '#E0234E',
        codeSnippet: `// NestJS Controller
@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}`,
      },
      {
        id: 'express',
        icon: SiExpress,
        language: 'javascript',
        color: '#000000',
        codeSnippet: `// Express Middleware
app.use((req, res, next) => {
  console.log('Time:', Date.now())
  next()
})`,
      },
      {
        id: 'prisma',
        icon: SiPrisma,
        language: 'typescript',
        color: '#2D3748',
        codeSnippet: `// Prisma Query
const user = await prisma.user.findUnique({
  where: {
    email: 'alice@prisma.io',
  },
})`,
      },
      {
        id: 'postgresql',
        icon: SiPostgresql,
        language: 'sql',
        color: '#336791',
        codeSnippet: `-- PostgreSQL Query
SELECT name, email
FROM users
WHERE created_at > NOW() - INTERVAL '1 month';`,
      },
      {
        id: 'mysql',
        icon: SiMysql,
        language: 'sql',
        color: '#4479A1',
        codeSnippet: `-- MySQL Query
SELECT * FROM orders
INNER JOIN customers ON orders.customer_id = customers.id
WHERE customers.country = 'Brazil';`,
      },
      {
        id: 'sql-server',
        icon: FaDatabase,
        language: 'sql',
        color: '#CC2927',
        codeSnippet: `-- SQL Server T-SQL
SELECT TOP 10 *
FROM Sales.Orders
ORDER BY OrderDate DESC;`,
      },
      {
        id: 'mongodb',
        icon: SiMongodb,
        language: 'javascript',
        color: '#47A248',
        codeSnippet: `// MongoDB Aggregation
db.orders.aggregate([
  { $match: { status: "A" } },
  { $group: { _id: "$cust_id", total: { $sum: "$amount" } } }
])`,
      },
      {
        id: 'redis',
        icon: SiRedis,
        language: 'javascript',
        color: '#DC382D',
        codeSnippet: `// Redis Caching
await redisClient.set('user:1', JSON.stringify(user), {
  EX: 3600
});`,
      },
      {
        id: 'socket-io',
        icon: SiSocketdotio,
        language: 'javascript',
        color: '#010101',
        codeSnippet: `// Real-time Event
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});`,
      },
      {
        id: 'rest-api',
        icon: TbApi,
        language: 'json',
        color: '#009688',
        codeSnippet: `{
  "resource": "/users",
  "method": "GET",
  "responses": {
    "200": { "description": "OK" },
    "404": { "description": "Not Found" }
  }
}`,
      },
      {
        id: 'jwt',
        icon: SiJsonwebtokens,
        language: 'javascript',
        color: '#000000',
        codeSnippet: `// JWT Sign
const token = jwt.sign(
  { foo: 'bar' },
  'shhhhh',
  { expiresIn: '1h' }
);`,
      },

      {
        id: 'swagger',
        icon: SiSwagger,
        language: 'yaml',
        color: '#85EA2D',
        codeSnippet: `openapi: 3.0.0
info:
  title: Sample API
  version: 0.1.9
paths:
  /users:
    get:
      summary: Returns a list of users`,
      },
      {
        id: 'jest',
        icon: SiJest,
        language: 'typescript',
        color: '#C21325',
        codeSnippet: `// Backend Test
test('database connection', async () => {
  const db = await connect();
  expect(db.isConnected).toBeTruthy();
});`,
      },
      {
        id: 'wiremock',
        icon: FaServer,
        language: 'json',
        color: '#EBA900',
        codeSnippet: `{
  "request": {
    "method": "GET",
    "url": "/api/mytest"
  },
  "response": {
    "status": 200,
    "body": "More content"
  }
}`,
      },
      {
        id: 'robot-framework',
        icon: FaRobot,
        language: 'python',
        color: '#0070B8',
        codeSnippet: `*** Test Cases ***
Valid Login
    Open Browser To Login Page
    Input Username    demo
    Input Password    mode
    Submit Credentials
    Welcome Page Should Be Open`,
      },
    ],
  },
  {
    id: 'mobile',
    image: '/mobile.png',
    defaultLanguage: 'tsx',
    defaultIcon: SiReact,
    defaultCode: mobileCode,
    defaultColor: '#61DAFB',
    stacks: [
      {
        id: 'react-native',
        icon: SiReact,
        language: 'tsx',
        color: '#61DAFB',
        codeSnippet: mobileCode,
      },
      {
        id: 'expo',
        icon: SiExpo,
        language: 'typescript',
        color: '#000020',
        codeSnippet: `// Expo Camera
const [permission, requestPermission] = useCameraPermissions();

if (!permission) {
  return <View />;
}`,
      },
      {
        id: 'react-navigation',
        icon: SiReactrouter,
        language: 'typescript',
        color: '#7B61C1',
        codeSnippet: `// React Navigation Stack
<Stack.Navigator>
  <Stack.Screen name="Home" component={HomeScreen} />
  <Stack.Screen name="Details" component={DetailsScreen} />
</Stack.Navigator>`,
      },
      {
        id: 'styled-components',
        icon: SiStyledcomponents,
        language: 'typescript',
        color: '#DB7093',
        codeSnippet: `// Native Styled Component
const Container = styled.View\`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
\`;`,
      },

      {
        id: 'jest',
        icon: SiJest,
        language: 'typescript',
        color: '#C21325',
        codeSnippet: `// Mobile Test
test('renders correctly', () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});`,
      },
    ],
  },
  {
    id: 'arquitetura',
    image: '/frontend.png',
    defaultLanguage: 'plaintext',
    defaultIcon: MdArchitecture,
    defaultCode: arquiteturaCode,
    defaultColor: '#E0234E',
    stacks: [
      {
        id: 'clean-architecture',
        icon: MdArchitecture,
        color: '#E0234E',
        language: 'plaintext',
        codeSnippet: `Entities: Enterprise Business Rules
Use Cases: Application Business Rules
Controllers: Interface Adapters
Frameworks: External Interfaces`,
      },
      {
        id: 'ddd',
        icon: MdAccountTree,
        color: '#FF9900',
        language: 'plaintext',
        codeSnippet: `Bounded Contexts:
- Integreates Ubiquitous Language
- Entities, Value Objects, Aggregates
- Domain Services & Events`,
      },
      {
        id: 'micro-frontends',
        icon: AiOutlineApartment,
        color: '#29B6F6',
        language: 'javascript',
        codeSnippet: `// Module Federation
remotes: {
  app1: 'app1@http://localhost:3001/remoteEntry.js',
  app2: 'app2@http://localhost:3002/remoteEntry.js',
},`,
      },
      {
        id: 'module-federation',
        icon: VscSymbolInterface,
        learning: true,
        color: '#0B2C4E',
        language: 'javascript',
        codeSnippet: `new ModuleFederationPlugin({
  name: 'host_app',
  remotes: {
    remote_app: 'remote_app@http://localhost:3001/remoteEntry.js',
  },
}),`,
      },
      {
        id: 'monorepo',
        icon: FaLayerGroup,
        color: '#5C2D91',
        language: 'json',
        codeSnippet: `// Turborepo Configuration
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    }
  }
}`,
      },

      {
        id: 'performance',
        icon: MdSpeed,
        color: '#F44336',
        language: 'javascript',
        codeSnippet: `// Web Vitals
import { onCLS, onFID, onLCP } from 'web-vitals';

onCLS(console.log);
onFID(console.log);
onLCP(console.log);`,
      },
      {
        id: 'mvvm',
        icon: MdArchitecture,
        color: '#673AB7',
        language: 'kotlin',
        codeSnippet: `// MVVM ViewModel
class UserViewModel : ViewModel() {
    private val _users = MutableLiveData<List<User>>()
    val users: LiveData<List<User>> = _users
}`,
      },
    ],
  },
  {
    id: 'devops',
    image: '/devops.png',
    defaultLanguage: 'yaml',
    defaultIcon: SiDocker,
    defaultCode: devopsCode,
    defaultColor: '#2496ED',
    stacks: [
      {
        id: 'git',
        icon: SiGit,
        language: 'bash',
        color: '#F05032',
        codeSnippet: `git commit -m "feat: initial commit"
git push origin main
git checkout -b feature/new-page`,
      },
      {
        id: 'github-actions',
        icon: SiGithubactions,
        language: 'yaml',
        color: '#2088FF',
        codeSnippet: `steps:
  - uses: actions/checkout@v2
  - name: Run a one-line script
    run: echo Hello, world!`,
      },
      {
        id: 'azure-pipelines',
        icon: AzurePipelinesIcon,
        language: 'yaml',
        color: '#0078D7',
        codeSnippet: `pool:
  vmImage: 'ubuntu-latest'
steps:
- script: echo Hello, world!
  displayName: 'Run a one-line script'`,
      },
      {
        id: 'docker',
        icon: SiDocker,
        language: 'dockerfile',
        color: '#2496ED',
        codeSnippet: `FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]`,
      },
      {
        id: 'kubernetes',
        icon: SiKubernetes,
        language: 'yaml',
        learning: true,
        color: '#326CE5',
        codeSnippet: `apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.14.2`,
      },
      {
        id: 'terraform',
        icon: SiTerraform,
        language: 'hcl',
        learning: true,
        color: '#7B42BC',
        codeSnippet: `resource "aws_instance" "app_server" {
  ami           = "ami-830c94e3"
  instance_type = "t2.micro"
  tags = {
    Name = "ExampleAppServerInstance"
  }
}`,
      },
      {
        id: 'aws',
        icon: FaAws,
        language: 'yaml',
        color: '#FF9900',
        codeSnippet: `Resources:
  MyBucket:
    Type: AWS::S3::Bucket
    Properties:
      BucketName: my-app-bucket`,
      },
      {
        id: 'azure',
        icon: AzureIcon,
        language: 'bash',
        color: '#0078D4',
        codeSnippet: `az group create --name myResourceGroup --location eastus
az appservice plan create --name myAppServicePlan`,
      },
      {
        id: 'vercel',
        icon: SiVercel,
        language: 'json',
        color: '#FFFFFF',
        codeSnippet: `{
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
      {
        id: 'firebase',
        icon: SiFirebase,
        language: 'json',
        color: '#FFCA28',
        codeSnippet: `{
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
      {
        id: 'sonarqube',
        icon: SiSonarqube,
        language: 'properties',
        color: '#4E9BCD',
        codeSnippet: `sonar.projectKey=my:project
sonar.projectName=My Project
sonar.projectVersion=1.0
sonar.sources=src`,
      },
      {
        id: 'ci-cd',
        icon: GoWorkflow,
        language: 'yaml',
        color: '#4CAF50',
        codeSnippet: `stages:
  - build
  - test
  - deploy`,
      },
    ],
  },
];
