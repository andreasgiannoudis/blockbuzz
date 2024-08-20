import './App.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HomePage from './components/HomePage/HomePage';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';
import Contact from './components/Contact/Contact';
import About from './components/About/About';

function App() {

  return (
    <>
    <Router>
      <ScrollToTop />
      <Header />

      <Routes>
        <Route path="/blockbuzz/" element={<HomePage />} />
        <Route path='/blockbuzz/contact' element={<Contact />} />
        <Route path="/blockbuzz/privacy-policy" element={<PrivacyPolicy />} />
        <Route path='/blockbuzz/about' element={<About />} />
      </Routes>

      <Footer />

    </Router>
      
    </>
  )
}

export default App
