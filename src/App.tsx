import { Header } from "./components/organisms/Header";
import { Hero } from "./components/organisms/Hero";
import "./App.css";
import { Skills } from "./components/organisms/Skills";
import { Experience } from "./components/organisms/Experience";
import { Education } from "./components/organisms/Education";
import { Footer } from "./components/organisms/Footer";
import tornPaper from "@/assets/torn-paper.svg";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Hero />
        <Skills />
        <div className="app_second-page">
          <div className="app__torn-paper">
            <img src={tornPaper} alt="" className="app__torn-edge" />
          </div>
          <Experience />
          <Education />
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;
