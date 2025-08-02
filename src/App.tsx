import './styles/emailBase.css'
import './styles/App.css'
import  {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navbar from '@/components/appComponents/Navbar'
import CreatePage from './pages/CreatePage'
import DuplicatePage from './pages/DuplicatePage'

function App() {

  return (
    <Router>
      <Navbar />
      <div className='container mx-auto'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/duplicate/:sourceId" element={<DuplicatePage />} />
      </Routes> 
      </div>
    </Router>
  )
}

export default App
