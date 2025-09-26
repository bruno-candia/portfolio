import { SidebarMenuMobile } from "./components/organism/SidebarMenuMobile";
import "./App.css";
import { Header } from "./components/organism/Header";
import Me from "@/assets/me.svg";

function App() {
  return (
    <div className="container">
      <Header />
      <SidebarMenuMobile />
    </div>
  );
}

export default App;
