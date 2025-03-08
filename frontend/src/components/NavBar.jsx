import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// ...existing code...
import { 
    FaBook, 
    FaChalkboardTeacher, 
    FaBriefcase, 
    FaProjectDiagram, 
    FaComments, 
    FaTrophy, 
    FaUserCircle, 
    FaSignOutAlt,
    FaCode, // New icon import
    FaVrCardboard // New icon import
  } from 'react-icons/fa';

const NavBar = ({ loggedInUser, activeMenu, setActiveMenu, handleLogout }) => {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);
    
    // Effect to apply dark mode to the body element
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [darkMode]);
    
// ...existing code...
const menuItems = [
    { name: "courses", icon: <FaBook />, label: "Courses" },
    { name: "mentorship", icon: <FaChalkboardTeacher />, label: "Mentorship" },
    { name: "interview", icon: <FaBriefcase />, label: "Interview" },
    { name: "projects", icon: <FaProjectDiagram />, label: "Projects" },
    { name: "community", icon: <FaComments />, label: "Community" },
    { name: "hackathon", icon: <FaTrophy />, label: "Hackathon" },
    { name: "codeplayground", icon: <FaCode />, label: "Code Playground" }, // New menu item
    { name: "vr", icon: <FaVrCardboard />, label: "VR Room" } // New menu item
];
    
    return (
        <header className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white'} shadow-md transition-colors duration-300`}>
            <div className="flex flex-wrap items-center justify-between px-4 py-3">
                {/* User Profile */}
                <div className="flex items-center gap-2 mr-4">
                    <FaUserCircle className={`text-lg ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                    <span className="font-medium text-sm">{loggedInUser}</span>
                </div>
                
                {/* Simplified Navigation Menu with just 6 items */}
                <nav className="flex flex-1 flex-wrap items-center justify-center gap-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.name}
                            className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 text-sm whitespace-nowrap ${
                                activeMenu === item.name
                                    ? "bg-indigo-600 text-white"
                                    : darkMode 
                                      ? "text-gray-300 hover:bg-indigo-800 hover:text-white" 
                                      : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-800"
                            }`}
                            onClick={() => {
                                setActiveMenu(item.name);
                                navigate(`/${item.name}`);
                            }}
                        >
                            <span>{item.icon}</span>
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>
                
                {/* Theme Toggle Button */}
                
                
                {/* Logout Button */}
                <button
                    className={`flex items-center gap-1 px-2 py-1 text-sm rounded-lg ml-2 ${
                        darkMode 
                          ? 'text-red-400 hover:bg-red-900 hover:text-red-300' 
                          : 'text-red-600 hover:bg-red-50'
                    }`}
                    onClick={handleLogout}
                >
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>
            </div>
        </header>
    );
};

export default NavBar;
