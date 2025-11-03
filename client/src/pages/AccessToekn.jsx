import React from 'react'
import { useEffect } from 'react'
import axios from "axios"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const base_url = "http://localhost:8000";

const AccessToekn = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const handleAuth = async () => {
            const params = new URLSearchParams(window.location.search);
            const accessToken = params.get("token");
            if (accessToken) {
                localStorage.setItem("accessToken", accessToken);
                try {
                    const res = await axios.get(`${base_url}/auth/me`, {
                        headers: { "Authorization": `Bearer ${accessToken}` }
                    });
                    if (res.data.success) {
                        localStorage.setItem("user", JSON.stringify(res.data.user));
                        navigate("/home");
                    }
                }
                catch (err) {
                    console.error("Error fetching user:", err);
                }
            }
        }
        handleAuth();
    }, [navigate]);
    return (
        <>
            Logging in...
        </>
    )
}

export default AccessToekn