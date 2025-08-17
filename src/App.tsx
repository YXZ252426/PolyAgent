import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppProvider } from './contexts/AppContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AgentsPage from './pages/AgentsPage'
import CreateAgentPage from './pages/CreateAgentPage'
import GamesPage from './pages/GamesPage'
import GameDetailPage from './pages/GameDetailPage'
import LeaderboardPage from './pages/LeaderboardPage'
import AssetsPage from './pages/AssetsPage'
import './App.css'

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="agents" element={<AgentsPage />} />
            <Route path="agents/create" element={<CreateAgentPage />} />
            <Route path="games" element={<GamesPage />} />
            <Route path="games/:gameId" element={<GameDetailPage />} />
            <Route path="leaderboard" element={<LeaderboardPage />} />
            <Route path="assets" element={<AssetsPage />} />
          </Route>
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App
