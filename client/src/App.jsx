import "./App.css"
import PollPage from "./pages/PollPage.jsx"
import HomePage from "./pages/HomePage.jsx"
import { Routes, Route } from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/polls/:id" element={<PollPage />} />
    </Routes>
  )
}

export default App
