import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaTrophy, FaCalendarAlt, FaStar, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

function Hackathon() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState("all");

    // Get username from localStorage
    const username = localStorage.getItem("loggedInUser") || "User";

    useEffect(() => {
        // Force dark mode
        document.documentElement.classList.add("dark");
    }, []);

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
            name: "AI Innovation Summit", 
            date: "2025-03-17", 
            status: "Registration Open", 
            prize: "$2,000", 
            tags: ["AI", "Machine Learning"],
            featured: true,
            participants: 342,
            registrationUrl: "https://learn.microsoft.com/en-us/plans/w255c4z7dm4dgr?learnerGroupId=50cc3919-c486-4867-8ef5-b52eb56d6030&wt.mc_id=nxg_studentamb_exp1_wwl_268588"
        },
        { 
            id: 2,
            name: "Web3 Builders Hackathon", 
            date: "2025-05-15", 
            status: "Coming Soon", 
            prize: "$1,500", 
            tags: ["Blockchain", "Crypto"],
            featured: false,
            participants: 210,
            registrationUrl: "https://web3-builders.io/register"
        },
        { 
            id: 3,
            name: "HealthTech Revolution", 
            date: "2025-06-20", 
            status: "Coming Soon", 
            prize: "$3,000", 
            tags: ["Health", "IoT"],
            featured: true,
            participants: 183,
            registrationUrl: "https://healthtech-revolution.org/join"
        },
        { 
            id: 4,
            name: "Sustainable Tech Challenge", 
            date: "2025-07-10", 
            status: "Coming Soon", 
            prize: "$2,500", 
            tags: ["Sustainability", "Climate"],
            featured: false,
            participants: 129,
            registrationUrl: "https://sustainabletech-challenge.com/register"
        },
        { 
            id: 5,
            name: "Education Innovators Hackathon", 
            date: "2025-02-15", 
            status: "Completed", 
            prize: "$1,000", 
            tags: ["Education", "SaaS"],
            featured: false,
            participants: 256,
            registrationUrl: "https://edu-innovators.org/register"
        },
        { 
            id: 6,
            name: "Global Fintech Summit", 
            date: "2025-01-18", 
            status: "Completed", 
            prize: "$5,000", 
            tags: ["Finance", "Security"],
            featured: true,
            participants: 408,
            registrationUrl: "https://globalfintech-summit.com/register"
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

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-950 text-white transition-colors duration-300">
            <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
                

                {/* Featured Hackathon Banner (if available) */}
                {filter !== "past" && hackathons.some(h => h.featured && new Date(h.date) > today) && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-2xl overflow-hidden shadow-2xl mb-8 border border-indigo-700/50"
                    >
                        <div className="relative">
                            <div className="absolute top-0 right-0 bg-yellow-500 text-white px-4 py-1 rounded-bl-lg font-medium flex items-center">
                                <FaStar className="mr-1" /> Featured
                            </div>
                            <div className="p-8 text-white backdrop-blur-sm bg-black/10">
                                <h3 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">AI Innovation Summit</h3>
                                <p className="opacity-90 mb-4">Join the premier AI hackathon and showcase your innovative solutions</p>
                                
                                <div className="flex flex-wrap gap-6 mb-6">
                                    <div className="flex items-center">
                                        <FaCalendarAlt className="mr-2 text-indigo-400" />
                                        <span>March 17-19, 2025</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaTrophy className="mr-2 text-yellow-400" />
                                        <span>$2,000 in prizes</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaUsers className="mr-2 text-indigo-400" />
                                        <span>342 participants</span>
                                    </div>
                                </div>
                                
                                <button 
                                    className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-md font-medium hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-indigo-600/30"
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
                            whileHover={{ y: -5, scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-700/50 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-600/10"
                        >
                            {hackathon.featured && (
                                <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-4 py-1 text-xs font-medium flex items-center justify-center">
                                    <FaStar className="mr-1" /> FEATURED EVENT
                                </div>
                            )}
                            
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">{hackathon.name}</h3>
                                
                                <div className="flex items-center text-sm mb-3">
                                    <FaCalendarAlt className="mr-2 text-indigo-400" />
                                    <span className="text-gray-400">
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
                                            className="bg-gray-700 text-indigo-300 text-xs px-3 py-1 rounded-full font-medium border border-indigo-700/30"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center">
                                        <FaTrophy className="mr-2 text-yellow-400" />
                                        <span className="font-bold text-white">
                                            {hackathon.prize}
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center text-sm">
                                        <FaUsers className="w-4 h-4 mr-1 text-indigo-400" />
                                        <span className="text-gray-400">
                                            {hackathon.participants} participants
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        hackathon.status === "Registration Open" 
                                            ? "bg-green-900/50 text-green-400 border border-green-700/30" 
                                            : hackathon.status === "Completed" 
                                                ? "bg-gray-700 text-gray-300 border border-gray-600/30" 
                                                : "bg-yellow-900/50 text-yellow-400 border border-yellow-700/30"
                                    }`}>
                                        {hackathon.status}
                                    </span>
                                    
                                    <button 
                                        onClick={() => handleRegister(hackathon.registrationUrl)}
                                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-md transition-all duration-300 shadow-md shadow-indigo-800/20"
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
                    <div className="bg-gray-800 rounded-xl shadow-md p-8 text-center border border-gray-700">
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        <h3 className="text-xl font-medium mb-2 text-white">No hackathons found</h3>
                        <p className="text-gray-400">
                            There are no hackathons matching your current filter.
                        </p>
                    </div>
                )}
            </main>

            <footer className="bg-gray-900 border-gray-800 border-t py-4 text-center text-sm text-gray-500">
                © 2025 HackHub. All rights reserved.
            </footer>

            <ToastContainer position="bottom-right" theme="dark" />
        </div>
    );
}

export default Hackathon;
