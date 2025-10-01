import { Header } from "./components/organism/Header";
import { Hero } from "./components/organism/Hero";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Hero />
        <section id="skills">
          <div className="skills__header">
            <h3 className="skills__title">Habilidades</h3>
            <p className="skills__description">
              Minhas competências abrangem o desenvolvimento front-end, back-end
              e DevOps, refletindo meu interesse contínuo pela inovação e minha
              dedicação ao aprendizado constante.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
