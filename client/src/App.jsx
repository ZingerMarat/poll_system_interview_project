import { useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import UserForm from "./components/UserForm.jsx"
import PollForm from "./components/PollForm.jsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UserForm />
      <PollForm />
    </>
  )
}

export default App
