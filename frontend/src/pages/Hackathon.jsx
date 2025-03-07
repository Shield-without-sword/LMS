import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FaSignOutAlt } from "react-icons/fa";

function Hackathon() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        navigate("/login");
    };

    const hackathons = [
        { name: "Explore AI", date: "2025-03-07", website: "https://hackathon1.com", prize: "$2000" },
        { name: "Hackathon 2", date: "2025-05-15", website: "https://hackathon1.com", prize: "$1500" },
        { name: "Hackathon 3", date: "2025-06-20", website: "https://hackathon1.com", prize: "$3000" },
        { name: "Hackathon 4", date: "2025-07-10", website: "https://hackathon1.com", prize: "$2500" },
        { name: "Hackathon 5", date: "2025-08-05", website: "https://hackathon1.com", prize: "$1000" },
        { name: "Hackathon 6", date: "2025-09-18", website: "https://hackathon1.com", prize: "$5000" },
    ];

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-semibold">Hackathon Dashboard</h1>
                <button className="text-red-600 flex items-center gap-2 hover:bg-red-100 px-3 py-2 rounded-md" onClick={handleLogout}>
                    <FaSignOutAlt />
                    Logout
                </button>
            </header>

            <main className="flex-1 p-6">
                {/* New Hackathon Section */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Upcoming and Past Hackathons</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {hackathons.map((hackathon, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-md p-6">
                                <h3 className="text-xl font-bold">{hackathon.name}</h3>
                                <p className="text-gray-500 mt-2">{hackathon.date}</p>
                                <p className={`text-sm mt-2 ${hackathon.website === "Completed" ? "text-green-600" : hackathon.website === "In Progress" ? "text-yellow-600" : "text-gray-600"}`}>
                                    Status: {hackathon.website}
                                </p>
                                <p className="text-lg font-semibold mt-4">Prize: {hackathon.prize}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <ToastContainer />
        </div>
    );
}

export default Hackathon;
