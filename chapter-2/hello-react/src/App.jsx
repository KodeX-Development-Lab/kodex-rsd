import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function List({ children }) {
  return (
    <ul>
      {children}
    </ul>
  )
}

function Item({ name, price }) {
  return (
    <li>{name} <i>(${price})</i></li>
  );
}

function Box() {
  const [state, setState] = useState("green");
  return (
    <div
      style={{
        width: 300,
        height: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        backgroundColor: state,
      }}>
      <button onClick={() => setState("red")}>Red</button>
      <button onClick={() => setState("green")}>Green</button>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Box />
    </>
  )
}

export default App
