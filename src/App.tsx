import { Header } from "./components/organism/Header";
import { Hero } from "./components/organism/Hero";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <main className="app__main">
        <Hero />
      </main>
    </div>
  );
}

export default App;
