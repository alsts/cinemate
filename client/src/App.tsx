import WebApp from '@twa-dev/sdk'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { TelegramProvider } from './context/TelegramContext'
import { TopBar } from './components/TopBar'

function App() {
  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
    WebApp.disableVerticalSwipes();
    WebApp.setHeaderColor('#000000');
  }, [])

  return (
    <TelegramProvider>
      <div className="App flex flex-col min-h-screen bg-gray-900">
        <TopBar />
        <main className="flex-1">
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
    </TelegramProvider>
  )
}

export default App
