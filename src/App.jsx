

import {BrowserRouter as Router, Routes, Route,Link} from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';
import Registrations from './components/RegistrationPage.jsx';
import CoursePages from './components/coursePages.jsx';
import CourseTypePage from './components/CourseTypes.jsx';
import OfferingsPages from './components/offeringsPages.jsx';
import './App.css';
function App()
{
  return(
  <Router>
    <header>
    <nav>
  <Link to="/">Dashboard</Link>
  <Link to="/CourseTypes">Course Types</Link>
  <Link to="/Courses">Course</Link>
  <Link to="/offerings">Course Offerings</Link>
  <Link to="/registrations">Registrations</Link>
  </nav>
  </header>
  <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/CourseTypes" element={<CourseTypePage />} />
        <Route path="/Courses" element={<CoursePages />} />
        <Route path="/offerings" element={<OfferingsPages />} />
        <Route path="/registrations" element={<Registrations />} />
      </Routes>
  </Router>
  );


}
export default App;
