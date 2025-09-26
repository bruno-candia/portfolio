import { SidebarMenuMobile } from "./components/organism/SidebarMenuMobile";
import "./App.css";
import { Header } from "./components/organism/Header";
import { Hero } from "./components/organism/Hero";

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
