import { Header } from "./components/organism/Header";
import { Hero } from "./components/organism/Hero";
import "./App.css";
import { Skills } from "./components/organism/Skills";
import { Experience } from "./components/organism/Experience";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Hero />
        <Skills />
        <Experience />
      </main>
    </div>
  );
}

export default App;
