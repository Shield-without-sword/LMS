import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
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
import FrameVRRoom from './pages/FrameVRRoom';
import CodePlayground from './pages/CodePlayground';
import EmployeeManagementApp from './Elements/EmployeeManagementApp';
import EmployeeDetails from './Elements/EmployeeDetails';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/framevr" element={<PrivateRoute><FrameVRRoom /></PrivateRoute>} />
        <Route path="/codeplayground" element={<PrivateRoute><CodePlayground /></PrivateRoute>} />
        <Route path="/logout" element={<Navigate to="/login" />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/interview" element={<PrivateRoute><AvatarQA /></PrivateRoute>} />
        <Route path="/community" element={<PrivateRoute><EmployeeManagementApp /></PrivateRoute>} />
        <Route path="/projects" element={<PrivateRoute><RoadmapPage /></PrivateRoute>} />
        <Route path="/hackathon" element={<PrivateRoute><Hackathon /></PrivateRoute>} />
        <Route path="/courses/*" element={<Courses />} />
        <Route path="/mentorship" element={<PrivateRoute><Mentorship /></PrivateRoute>} />
        <Route path="employee/:id" element={<EmployeeDetails />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
