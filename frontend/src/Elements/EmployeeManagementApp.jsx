import React, { useEffect, useState } from 'react';
import EmployeeTable from './EmployeeTable';
import AddEmployee from './AddEmployee';
import { DeleteEmployeeById, GetAllEmployees } from '../api';
import { ToastContainer } from 'react-toastify';
import { notify } from '../utils';
import { Button } from "@/components/ui/button"

const EmployeeManagementApp = () => {
    const [showModal, setShowModal] = useState(false);
    const [employeeObj, setEmployeeObj] = useState(null);
    const [employees, setEmployees] = useState([]);
    
    const fetchEmployees = async (search = '') => {
        console.log('Called fetchEmployees');
        try {
            // Set a large limit to get all employees, or remove limit parameter if your API supports it
            const data = await GetAllEmployees(search, 1, 1000);
            console.log(data);
            setEmployees(data.employees);
        } catch (err) {
            alert('Error', err);
        }
    };
    
    useEffect(() => {
        fetchEmployees();
    }, []);
    
    const handleSearch = (e) => {
        fetchEmployees(e.target.value);
    };
    
    const handleUpdateEmployee = async (emp) => {
        setEmployeeObj(emp);
        setShowModal(true);
    };
    
    return (
        <div className="min-h-screen bg-gray-800 text-gray-200 flex flex-col justify-center items-center w-full p-6">
            <div className="w-full max-w-7xl">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                        Community Portal
                    </h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-indigo-500 mx-auto mt-2"></div>
                </div>
                
                <div className="w-full rounded-xl overflow-hidden border border-gray-600 bg-gray-700 shadow-xl">
                    <div className="p-6 border-b border-gray-600 bg-gray-750">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <Button 
                                onClick={() => setShowModal(true)} 
                                className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-md transition duration-300 shadow-md"
                            >
                                <span className="mr-2">+</span> New Post
                            </Button>
                            
                            <div className="relative w-full md:w-1/2">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </div>
                                <input
                                    onChange={handleSearch}
                                    type="text"
                                    placeholder="Search community posts..."
                                    className="w-full pl-10 pr-4 py-2 bg-gray-600 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 placeholder-gray-400"
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="p-6">
                        <div className="overflow-hidden rounded-lg border border-gray-600 bg-gray-700 shadow-inner">
                            <EmployeeTable
                                employees={employees}
                                handleUpdateEmployee={handleUpdateEmployee}
                            />
                        </div>
                    </div>
                </div>
            </div>
            
            <AddEmployee
                fetchEmployees={fetchEmployees}
                showModal={showModal}
                setShowModal={setShowModal}
                employeeObj={employeeObj}
            />
            
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                theme="dark"
            />
        </div>
    );
};

export default EmployeeManagementApp;
