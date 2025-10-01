import { Header } from "./components/organism/Header";
import { Hero } from "./components/organism/Hero";
import "./App.css";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  );
}

export default App;
