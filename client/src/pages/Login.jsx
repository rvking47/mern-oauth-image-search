import React, { useEffect } from "react";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const base_url = "http://localhost:8000"

const Login = () => {
    const navigate = useNavigate();
    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        if (accessToken) {
            navigate("/home");
        }
    }, [accessToken, navigate])

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 via-white to-purple-100">
            <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md text-center transform transition-all hover:scale-[1.02] hover:shadow-3xl">
                <h2 className="text-3xl font-bold text-gray-800 mb-8" style={{fontWeight:"bold"}}>
                    Login to Your Account
                </h2>

                <div className="flex flex-col space-y-5 my-3">
                    <Button variant="google" onClick={() => window.open(`${base_url}/auth/google`, "_self")} />
                    <Button variant="github" onClick={() => window.open(`${base_url}/auth/github`, "_self")} />
                    <Button variant="facebook" />
                </div>

                <p className="text-gray-500 mt-8 text-sm">
                    By continuing, you agree to our{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                        Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-blue-600 hover:underline">
                        Privacy Policy
                    </a>.
                </p>
            </div>
        </div>
    );
};

export default Login;

