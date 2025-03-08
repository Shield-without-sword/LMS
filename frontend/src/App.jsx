import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import RefrshHandler from './RefrshHandler';
import RoadmapPage from './pages/Projects'; // Import Projects Page
import Hackathon from './pages/Hackathon';
import Courses from './pages/Courses'; // Import Courses Page
import Mentorship from './pages/Mentorship'; // Import Mentorship Page
import AvatarQA from './components/AvatarQA';
import Quiz from './pages/Quiz';
import EmployeeManagementApp from './Elements/EmployeeManagementApp';
import EmployeeDetails from './Elements/EmployeeDetails';
import NavBar from './components/NavBar'; // Import NavBar component
import FrameVRRoom from './pages/FrameVRRoom';
import CodePlayground from './pages/CodePlayground';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeMenu, setActiveMenu] = useState("");
  const [loggedInUser, setLoggedInUser] = useState("User");
  const location = useLocation();

  // Update active menu based on current route
  useEffect(() => {
    const path = location.pathname.split('/')[1];
    if (path && ["courses", "mentorship", "interview", "projects", "community", "hackathon"].includes(path)) {
      setActiveMenu(path);
    }
  }, [location]);

  const handleLogout = () => {
    // Add your logout logic here
    setIsAuthenticated(false);
    // Clear any tokens or session data
    localStorage.removeItem('token'); // Adjust based on your auth implementation
    // Redirect to login page
    window.location.href = '/login';
  };

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? (
      <>
        <NavBar 
          loggedInUser={loggedInUser}
          activeMenu={activeMenu}
          setActiveMenu={setActiveMenu}
          handleLogout={handleLogout}
        />
        {children}
      </>
    ) : (
      <Navigate to="/login" />
    );
  };

  PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired
  };

  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/landing" />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setLoggedInUser={setLoggedInUser} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/interview" element={<PrivateRoute><AvatarQA /></PrivateRoute>} />
        <Route path="/community" element={<PrivateRoute><EmployeeManagementApp /></PrivateRoute>} />
        <Route path="/projects" element={<PrivateRoute><RoadmapPage /></PrivateRoute>} />
        <Route path="/hackathon" element={<PrivateRoute><Hackathon /></PrivateRoute>} />
        <Route path="/courses/*" element={<PrivateRoute><Courses /></PrivateRoute>} />
        <Route path="/mentorship" element={<PrivateRoute><Mentorship /></PrivateRoute>} />
        <Route path="employee/:id" element={<PrivateRoute><EmployeeDetails /></PrivateRoute>} />
        <Route path="/quiz/:moduleId" element={<PrivateRoute><Quiz /></PrivateRoute>} />
        <Route path="/quiz" element={<PrivateRoute><Quiz /></PrivateRoute>} />
        <Route path="/CodePlayground" element={<PrivateRoute><CodePlayground/></PrivateRoute>} />
        <Route path="/VR" element={<PrivateRoute><FrameVRRoom/></PrivateRoute>} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
