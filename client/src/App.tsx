import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return (
    <div className="App">
      <h2>Cinemate</h2>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
