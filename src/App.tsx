import { Header } from "./components/organisms/Header";
import { Hero } from "./components/organisms/Hero";
import "./App.css";
import { Skills } from "./components/organisms/Skills";
import { Experience } from "./components/organisms/Experience";
import { Education } from "./components/organisms/Education";
import { Footer } from "./components/organisms/Footer";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Hero />
        <Skills />
        <Experience />
        <Education />
        <Footer />
      </main>
    </div>
  );
}

export default App;
