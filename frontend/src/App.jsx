import { Navigate, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import PropTypes from 'prop-types'; // Add PropTypes import
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import RefrshHandler from './RefrshHandler';
import LandingPage from './pages/LandingPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Define PrivateRoute with PropTypes
  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };
  
  // Add PropTypes validation for PrivateRoute
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
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;