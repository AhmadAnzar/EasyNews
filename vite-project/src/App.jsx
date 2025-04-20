import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import NewsHome from './components/NewsHome'
import OpeningForm from './components/OpeningForm'

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<OpeningForm />} />
          <Route path="/home" element={<NewsHome />} />
        </Routes>
      </div>
    </Router>
    
  )
}

export default App
