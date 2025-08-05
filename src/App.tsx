import './styles/emailBase.css'
import './styles/App.css'
import  {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from '@/components/appComponents/Navbar'
import HomePage from '@/pages/home/HomePage'
import CreatePage from '@/pages/create/CreatePage'
import DuplicatePage from '@/pages/duplicate/DuplicatePage'
import { Toaster } from 'sonner'

function App() {

  return (
    <Router>
      <Toaster richColors position="top-center" duration={2500}/>
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
