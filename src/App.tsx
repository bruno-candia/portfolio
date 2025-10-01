import { SidebarMenuMobile } from "./components/organism/SidebarMenuMobile";
import { Header } from "./components/organism/Header";
import { Hero } from "./components/organism/Hero";
import { Skills } from "./components/organism/Skills";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <SidebarMenuMobile />
      <main className="container">
        <Hero />
      </main>
    </>
  );
}

export default App;
