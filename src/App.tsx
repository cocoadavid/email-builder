import './styles/emailBase.css'
import './styles/App.css'
import  {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from '@/components/appComponents/Navbar'
import CreatePage from './pages/CreatePage'

function App() {

  return (
    <Router>
      <Navbar />
      <div className='container mx-auto'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes> 
      </div>
    </Router>
  )
}

export default App
