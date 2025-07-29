import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import RegisterPage from "./pages/RegisterPages"
import LoginPage from "./pages/LoginPage"
import HomePage from "./pages/HomePage"
import StatsPage from "./pages/StatsPage"

import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </Router>
    </MantineProvider>
  )
}

export default App
