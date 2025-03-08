import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FaSignOutAlt, FaBriefcase, FaClipboardList, FaLaptopCode, FaChartLine, FaRocket, FaTrophy } from "react-icons/fa";

function Interview() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        navigate("/login");
    };

    const statsCards = [
        { label: "Mock Interviews", value: "8", icon: <FaBriefcase />, color: "blue" },
        { label: "Coding Challenges", value: "15", icon: <FaLaptopCode />, color: "green" },
        { label: "Technical Tests", value: "5", icon: <FaClipboardList />, color: "purple" },
    ];

    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-gray-100 to-gray-200">
            <header className="bg-white shadow-lg px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <FaRocket className="text-indigo-600 text-xl" />
                    <h1 className="text-xl font-bold text-gray-800">Interview Preparation Hub</h1>
                </div>
                <button 
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white flex items-center gap-2 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200" 
                    onClick={handleLogout}
                >
                    <FaSignOutAlt />
                    Logout
                </button>
            </header>

            <main className="flex-1 p-6 max-w-6xl mx-auto w-full">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FaChartLine className="text-indigo-500" />
                        Your Progress Dashboard
                    </h2>
                    <p className="text-gray-600 mt-1">Track your interview preparation journey</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {statsCards.map((card, index) => (
                        <div 
                            key={index} 
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-200 overflow-hidden transform hover:-translate-y-1"
                        >
                            <div className={`bg-${card.color}-600 h-2 w-full`}></div>
                            <div className="p-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-gray-500 text-sm font-medium">{card.label}</p>
                                        <h3 className="text-3xl font-bold mt-1">{card.value}</h3>
                                        <p className="text-${card.color}-600 text-sm font-medium mt-2">
                                            {index === 0 ? "+2 this week" : index === 1 ? "+4 this week" : "+1 this week"}
                                        </p>
                                    </div>
                                    <div className={`bg-${card.color}-100 p-3 rounded-full`}>
                                        {React.cloneElement(card.icon, { className: `text-${card.color}-600 text-xl` })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-10 bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <FaTrophy className="text-yellow-500 text-xl" />
                        <h2 className="text-xl font-bold text-gray-800">Upcoming Challenges</h2>
                    </div>
                    <div className="divide-y">
                        {[
                            { title: "System Design Interview", date: "Tomorrow, 2:00 PM", type: "Mock Interview" },
                            { title: "Data Structures Quiz", date: "March 10, 10:00 AM", type: "Technical Test" },
                            { title: "Algorithm Challenge", date: "March 12, 4:00 PM", type: "Coding Challenge" }
                        ].map((item, index) => (
                            <div key={index} className="py-4 flex justify-between items-center">
                                <div>
                                    <h3 className="font-medium text-gray-800">{item.title}</h3>
                                    <p className="text-gray-500 text-sm">{item.date}</p>
                                </div>
                                <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-sm font-medium">
                                    {item.type}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <ToastContainer />
        </div>
    );
}

export default Interview;
