import { Header } from "./components/organism/Header";
import { Hero } from "./components/organism/Hero";
import "./App.css";
import { Skills } from "./components/organism/Skills";
import { Experience } from "./components/organism/Experience";
import { Education } from "./components/organism/Education";
import { Footer } from "./components/organism/Footer";
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
