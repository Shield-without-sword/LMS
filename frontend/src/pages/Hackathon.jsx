import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaTrophy, FaCalendarAlt, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

function Hackathon() {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(false);
    const [filter, setFilter] = useState("all");

    // Get username from localStorage
    const username = localStorage.getItem("loggedInUser") || "User";

    useEffect(() => {
        // Check for user preferences
        const savedMode = localStorage.getItem("darkMode");
        if (savedMode === "true") {
            setDarkMode(true);
            document.documentElement.classList.add("dark");
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        localStorage.setItem("darkMode", newMode.toString());
        document.documentElement.classList.toggle("dark");
    };

    const handleRegister = (url) => {
        // Open the external registration URL
        window.open(url, "_blank");
        toast.success("Opening registration page...");
    };

    // Current date for comparison
    const today = new Date();

    const hackathons = [
        { 
            id: 1,
            name: "Explore AI", 
            date: "2025-03-17", 
            status: "Registration Open", 
            prize: "$2,000", 
            tags: ["AI", "Machine Learning"],
            featured: true,
            registrationUrl: "https://learn.microsoft.com/en-us/plans/w255c4z7dm4dgr?learnerGroupId=50cc3919-c486-4867-8ef5-b52eb56d6030&wt.mc_id=nxg_studentamb_exp1_wwl_268588"
        },
        { 
            id: 2,
            name: "Tata Crucible Corporate Quiz 2025", 
            date: "2025-03-15",
            status: "Coming Soon", 
            prize: "10,86,000", 
            tags: ["Openn inovation"],
            featured: false,
            participants: 210,
            registrationUrl: "https://unstop.com/quiz/tata-crucible-corporate-quiz-2025-tata-group-1253161"
        },
        { 
            id: 3,
            name: "Hackathon",
            date: "2025-03-06",
            status: "Coming Soon", 
            prize: "25,000",
            tags: ["Coders"],
            featured: true,
            participants: 183,
            registrationUrl: "https://unstop.com/hackathons/hackathon-ignite2k25-srm-easwari-engineering-college-1419653"
        },
        { 
            id: 4,
            name: "AI Hackathon", 
            date: "2025-07-10", 
            status: "Coming Soon", 
            prize: "10,000", 
            tags: ["AI" ],
            featured: false,
            participants: 129,
            registrationUrl: "https://unstop.com/hackathons/ai-hackathon-axis25-vnit-nagpur-1404474"
        },
        { 
            id: 5,
            name: "MapmyIndia Hackathon", 
            date: "2025-03-10", 
            status: "Completed", 
            prize: "$500", 
            tags: ["Inovations"],
            featured: false,
            participants: 256,
            registrationUrl: "https://unstop.com/hackathons/mapmyindia-hackathon-iit-delhi-1421205"
        },
        { 
            id: 6,
            name: "Software Hackathont", 
            date: "2025-04-03", 
            status: "Completed", 
            prize: "$55,000", 
            tags: ["Finance", "Security"],
            featured: true,
            participants: 408,
            registrationUrl: "https://unstop.com/hackathons/software-hackathon-mkssss-cummins-college-of-engineering-for-women-ccoew-pune-1409208"
        },
    ];

    // Filter hackathons based on selection
    const filteredHackathons = hackathons.filter(hackathon => {
        const hackathonDate = new Date(hackathon.date);
        
        if (filter === "upcoming") {
            return hackathonDate > today && hackathon.status !== "Completed";
        } else if (filter === "past") {
            return hackathonDate < today || hackathon.status === "Completed";
        } else if (filter === "featured") {
            return hackathon.featured;
        } else {
            return true; // "all"
        }
    });

    // Theme classes
    const theme = {
        bg: darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-blue-50 to-indigo-100",
        card: darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100",
        button: darkMode ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-500 hover:bg-indigo-600",
        header: darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200",
        tag: darkMode ? "bg-gray-700 text-gray-300" : "bg-blue-100 text-blue-800"
    };

    return (
        <div className={`flex flex-col min-h-screen ${theme.bg} transition-colors duration-300`}>
            <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h2 className="text-2xl font-bold">Hackathon Dashboard</h2>
                        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                            Discover exciting hackathons and showcase your skills
                        </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                        <button 
                            onClick={() => setFilter("all")} 
                            className={`px-4 py-2 rounded-md transition-colors ${filter === "all" 
                                ? "bg-indigo-500 text-white" 
                                : "bg-gray-200 dark:bg-gray-700"}`}
                        >
                            All
                        </button>
                        <button 
                            onClick={() => setFilter("upcoming")} 
                            className={`px-4 py-2 rounded-md transition-colors ${filter === "upcoming" 
                                ? "bg-indigo-500 text-white" 
                                : "bg-gray-200 dark:bg-gray-700"}`}
                        >
                            Upcoming
                        </button>
                        <button 
                            onClick={() => setFilter("past")} 
                            className={`px-4 py-2 rounded-md transition-colors ${filter === "past" 
                                ? "bg-indigo-500 text-white" 
                                : "bg-gray-200 dark:bg-gray-700"}`}
                        >
                            Past
                        </button>
                        <button 
                            onClick={() => setFilter("featured")} 
                            className={`px-4 py-2 rounded-md transition-colors ${filter === "featured" 
                                ? "bg-indigo-500 text-white" 
                                : "bg-gray-200 dark:bg-gray-700"}`}
                        >
                            Featured
                        </button>
                    </div>
                </div>

                {/* Featured Hackathon Banner (if available) */}
                {filter !== "past" && hackathons.some(h => h.featured && new Date(h.date) > today) && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`${darkMode ? "bg-indigo-900/50" : "bg-indigo-600"} rounded-2xl overflow-hidden shadow-xl mb-8`}
                    >
                        <div className="relative">
                            <div className="absolute top-0 right-0 bg-yellow-500 text-white px-4 py-1 rounded-bl-lg font-medium flex items-center">
                                <FaStar className="mr-1" /> Featured
                            </div>
                            <div className="p-8 text-white">
                                <h3 className="text-2xl font-bold mb-2">AI Innovation Summit</h3>
                                <p className="opacity-90 mb-4">Join the premier AI hackathon and showcase your innovative solutions</p>
                                
                                <div className="flex flex-wrap gap-6 mb-6">
                                    <div className="flex items-center">
                                        <FaCalendarAlt className="mr-2" />
                                        <span>March 17-19, 2025</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaTrophy className="mr-2" />
                                        <span>$2,000 in prizes</span>
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                                        </svg>
                                        <span>342 participants</span>
                                    </div>
                                </div>
                                
                                <button 
                                    className="px-6 py-2 bg-white text-indigo-700 rounded-md font-medium hover:bg-gray-100 transition-colors"
                                    onClick={() => handleRegister("https://ai-innovation-summit.com/register")}
                                >
                                    Register Now
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Hackathon Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredHackathons.map((hackathon) => (
                        <motion.div 
                            key={hackathon.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                            className={`${theme.card} rounded-xl shadow-lg overflow-hidden border transition-all duration-300`}
                        >
                            {hackathon.featured && (
                                <div className="bg-yellow-500 text-white px-4 py-1 text-xs font-medium flex items-center justify-center">
                                    <FaStar className="mr-1" /> FEATURED EVENT
                                </div>
                            )}
                            
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2">{hackathon.name}</h3>
                                
                                <div className="flex items-center text-sm mb-3">
                                    <FaCalendarAlt className={`mr-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`} />
                                    <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                                        {new Date(hackathon.date).toLocaleDateString('en-US', { 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric' 
                                        })}
                                    </span>
                                </div>
                                
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {hackathon.tags.map((tag, idx) => (
                                        <span 
                                            key={idx} 
                                            className={`${theme.tag} text-xs px-2 py-1 rounded-md font-medium`}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center">
                                        <FaTrophy className={`mr-2 ${darkMode ? "text-yellow-400" : "text-yellow-600"}`} />
                                        <span className="font-bold">
                                            {hackathon.prize}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center text-sm">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                                        </svg>
                                        <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                                            {hackathon.participants} participants
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        hackathon.status === "Registration Open" 
                                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                                            : hackathon.status === "Completed" 
                                                ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300" 
                                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                                    }`}>
                                        {hackathon.status}
                                    </span>
                                    
                                    <button 
                                        onClick={() => handleRegister(hackathon.registrationUrl)}
                                        className={`${theme.button} text-white px-4 py-2 rounded-md transition-colors`}
                                    >
                                        Register
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                {/* Empty state */}
                {filteredHackathons.length === 0 && (
                    <div className={`${theme.card} rounded-xl shadow-md p-8 text-center`}>
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <h3 className="text-xl font-medium mb-2">No hackathons found</h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            There are no hackathons matching your current filter.
                        </p>
                    </div>
                )}
            </main>

            <footer className={`${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-t py-4 text-center text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                © 2025 HackHub. All rights reserved.
            </footer>

            <ToastContainer position="bottom-right" theme={darkMode ? "dark" : "light"} />
        </div>
    );
}

export default Hackathon;
