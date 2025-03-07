import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIUrl, handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import { FaBook, FaCode, FaProjectDiagram, FaComments, FaChalkboardTeacher, FaSignOutAlt, 
  FaUserCircle, FaBell, FaChartLine, FaGraduationCap, FaCalendarAlt, FaCog } from "react-icons/fa";

function Home() {
    const [loggedInUser, setLoggedInUser] = useState("");
    const [expenses, setExpenses] = useState([]);
    const [incomeAmt, setIncomeAmt] = useState(0);
    const [expenseAmt, setExpenseAmt] = useState(0);
    const [activeMenu, setActiveMenu] = useState("dashboard");
    const navigate = useNavigate();

    useEffect(() => {
        setLoggedInUser(localStorage.getItem("loggedInUser"));
    }, []);

    useEffect(() => {
        const amounts = expenses.map(item => item.amount);
        const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0);
        const exp = amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1;
        setIncomeAmt(income);
        setExpenseAmt(exp);
    }, [expenses]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        handleSuccess("User Logged Out");
        setTimeout(() => {
            navigate("/login");
        }, 1000);
    };

    const fetchExpenses = async () => {
        try {
            const url = `${APIUrl}/expenses`;
            const headers = {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            };
            const response = await fetch(url, headers);
            if (response.status === 403) {
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }
            const result = await response.json();
            setExpenses(result.data);
        } catch (err) {
            handleError(err);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const menuItems = [
        { name: "dashboard", icon: <FaChartLine />, label: "Dashboard" },
        { name: "courses", icon: <FaBook />, label: "Courses" },
        { name: "exercises", icon: <FaCode />, label: "Coding Exercises" },
        { name: "projects", icon: <FaProjectDiagram />, label: "Projects" },
        { name: "discussions", icon: <FaComments />, label: "Discussions" },
        { name: "mentorship", icon: <FaChalkboardTeacher />, label: "Mentorship" },
    ];

    return (
        <div className="flex h-screen p-4 bg-gray-50">
            {/* Sidebar */}
            <div className="w-72 bg-gradient-to-b from-indigo-800 to-purple-900 text-white shadow-xl">
                <div className="p-5">
                    <div className="flex items-center gap-3 mb-8">
                        <FaGraduationCap className="text-2xl text-indigo-300" />
                        <h2 className="text-2xl font-bold tracking-wide">Learning Hub</h2>
                    </div>
                    
                    <div className="mb-8 bg-indigo-900/30 rounded-lg p-4 flex items-center gap-3">
                        <FaUserCircle className="text-3xl text-indigo-300" />
                        <div>
                            <h3 className="font-semibold">{loggedInUser}</h3>
                            <p className="text-indigo-300 text-sm">Student</p>
                        </div>
                    </div>
                    
                    <nav className="space-y-2">
                        {menuItems.map((item) => (
                            <button 
                                key={item.name}
                                className={`flex items-center gap-3 w-full p-3 rounded-lg transition-all duration-200 ${
                                    activeMenu === item.name 
                                        ? "bg-indigo-700 text-white shadow-md" 
                                        : "text-indigo-200 hover:bg-indigo-700/50 hover:text-white"
                                }`} 
                                onClick={() => {
                                    setActiveMenu(item.name);
                                    if (item.name !== "dashboard") navigate(`/${item.name}`);
                                }}
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span>{item.label}</span>
                            </button>
                        ))}
                        
                        <div className="pt-4 mt-4 border-t border-indigo-700/50">
                            <button 
                                className="flex items-center gap-3 w-full p-3 text-red-300 hover:bg-red-800/30 hover:text-red-200 rounded-lg transition-all duration-200" 
                                onClick={handleLogout}
                            >
                                <FaSignOutAlt className="text-lg" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {/* Top Navigation */}
                <header className="bg-white shadow-sm p-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
                        <div className="flex items-center gap-4">
                            <button className="p-2 rounded-full hover:bg-gray-100">
                                <FaCalendarAlt className="text-gray-600" />
                            </button>
                            <button className="p-2 rounded-full hover:bg-gray-100 relative">
                                <FaBell className="text-gray-600" />
                                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <button className="p-2 rounded-full hover:bg-gray-100">
                                <FaCog className="text-gray-600" />
                            </button>
                        </div>
                    </div>
                </header>
            </div>

            <ToastContainer />
        </div>
    );
}

export default Home;