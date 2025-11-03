import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Sidebar from '../components/Sidebar';
import SearchUI from '../components/SearchUI';
import toast, { Toaster } from 'react-hot-toast';

const base_url = "https://mern-oauth-image-search-backend.onrender.com";

const Home = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState(null);
    const accessToken = localStorage.getItem("accessToken");

    const handleLogout = async () => {
        try {
            const response = await axios.get(`${base_url}/auth/logout`, {
                headers: { "Authorization": `Bearer ${accessToken}` },
                validateStatus: () => true
            });
            if (response.status === 200) {
                localStorage.clear();
                localStorage.removeItem("accessToken")
                navigate("/login");
            }
            else {
                toast.error("Something Error!!");
            }
        }
        catch (err) {
            toast.error("Server Error:", err);
        }
    }
    useEffect(() => {
        const storUser = localStorage.getItem("user");
        if (storUser) {
            try {
                const userParse = JSON.parse(storUser);
                setName(userParse.name);
                setEmail(userParse.email);
                setAvatar(userParse?.avatar)
            }
            catch (err) {
                toast.error("Invalid JSON in localStorage:", err)
            }
        }
    }, [])

    return (
        <>
            <Toaster />
            <div className="flex min-h-screen">
                <Sidebar onClick={handleLogout} />
                <div className="flex-1 lg:ml-64">
                    <Navigation name={name} avatar={avatar} />
                    <div>
                        <SearchUI />
                    </div>
                </div>
            </div>

        </>
    )
}


export default Home
