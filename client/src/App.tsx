import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { useEffect } from 'react'
import WebApp from '@twa-dev/sdk'

function App() {
  useEffect(() => {
    WebApp.expand()
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
