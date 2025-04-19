import './App.css'
import Navbar from './components/Navbar'
import NewsHome from './components/NewsHome'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <NewsHome />
      </main>
      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 EasyNews. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
