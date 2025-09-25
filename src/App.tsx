import { useState } from 'react'
import './App.css'

function App() {
  const [isOpenMenu, setIsOpenMenu] = useState<"open" | "close">("close");

  function handleMenu(){
    setIsOpenMenu(prev => prev === "open" ? "close" : "open");
  }

  return (
    <div className='container'>
      <div className="menu" data-open={isOpenMenu}>
        <div className="menu__paper-ear" onClick={handleMenu}>Click</div>
        <nav className='menu__off-canvas'>
          <div className='menu__content'>
            <ul >
              <li><a href="#Home">teste</a></li>
              <li><a href="#teste">teste</a></li>
              <li><a href="#teste">teste</a></li>
              <li><a href="#teste">teste</a></li>
              <li><a href="#teste">teste</a></li>
              <li><a href="#teste">teste</a></li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default App
