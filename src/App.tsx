import { Header } from "./components/organism/Header";
import { Hero } from "./components/organism/Hero";
import "./App.css";
import { Skills } from "./components/organism/Skills";
function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Hero />
        <Skills />
      </main>
    </div>
  );
}

export default App;
