import React, { useEffect, useState } from "react";
import { FaClock, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

const base_url = "http://localhost:8000";

const Sidebar = ({ onClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [history, setHistroy] = useState([]);
    const [loading, setLoading] = useState(false);
    const accessToken = localStorage.getItem("accessToken");

    const handleHistroy = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${base_url}/api/histroy`, {
                headers: { Authorization: `Bearer ${accessToken}` },
                withCredentials: true,
                validateStatus: () => true
            });
            if (res.status === 200) {
                setHistroy(res.data);
            }
        }
        catch (err) {
            toast.error("Server Error:", err);
        }
        finally {
            setLoading(false);
        }
    }



    useEffect(() => {
        handleHistroy();
    }, [])

    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed top-5 left-2.5 z-[9999] bg-blue-600 text-white p-1 rounded-md shadow-md hover:bg-blue-700 transition-all lg:hidden"
            >
                {isOpen ? (
                    <FaTimes className="text-lg" />
                ) : (
                    <FaBars className="text-lg" />
                )}
            </button>
            <aside
                className={`fixed top-0 z-[9999] left-0 h-full bg-body-tertiary border-r border-gray-200 shadow-sm flex flex-col justify-between transition-all duration-300 z-40
        ${isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"} lg:translate-x-0`}
            >
                <div className="mt-4 overflow-y-auto flex-1">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="fixed top-5 left-2.5 z-[9999] bg-blue-600 text-white p-1 rounded-md shadow-md hover:bg-blue-700 transition-all lg:hidden"
                    >
                        {isOpen ? (
                            <FaTimes className="text-lg" />
                        ) : (
                            <FaBars className="text-lg" />
                        )}
                    </button>
                    <h2 className="text-center text-xl font-semibold text-blue-600 mb-8 font-sans">
                        Search History
                    </h2>
                    {loading && (
                        <p className="text-center text-gray-600 mt-6 font-medium">
                            Loading images...
                        </p>
                    )}

                    <div className="px-4 flex flex-col gap-3 mt-5 overflow-y-auto max-h-[70vh] pr-2">
                        {!loading && history.length > 0 ? (
                            history.map((val, i) => (
                                <div
                                    key={i}
                                    className="flex flex-col bg-gray-50 px-3 py-2 rounded-md hover:bg-blue-50 transition-all"
                                >

                                    <div className="flex items-center gap-2 text-gray-800">
                                        <FaClock className="text-blue-600 text-sm" />
                                        <span className="text-sm truncate font-sans">{val.term}</span>
                                    </div>
                                    <span className="text-xs text-gray-500 ml-6 mt-1">
                                        {formatDateTime(val.timestamp)}
                                    </span>
                                </div>
                            ))
                        ) : (
                            !loading && (
                                <span className="text-gray-500 italic text-sm text-center">
                                    No Search History
                                </span>
                            )
                        )}
                    </div>
                </div>

                <div className="border-t border-gray-100 p-4">
                    <button onClick={onClick} className="flex items-center gap-3 w-full px-3 py-2 text-red-600 hover:bg-red-100 rounded-md transition-all">
                        <FaSignOutAlt className="text-lg" />
                        <span className="font-sans">Logout</span>
                    </button>
                </div>
            </aside >
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed  inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-30 lg:hidden"
                ></div>
            )
            }
            <Toaster />
        </>
    );
};

export default Sidebar;
