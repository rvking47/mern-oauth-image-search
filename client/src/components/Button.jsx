import React from 'react'
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";

const Button = ({ onClick, variant }) => {

    const styles = {
        google: {
            icon: <FaGoogle className="text-red-500 text-xl group-hover:text-white transition-all duration-300" />,
            hoverColor: "hover:bg-red-500",
            label: "Login with Google",
        },
        github: {
            icon: <FaGithub className="text-gray-800 text-xl group-hover:text-white transition-all duration-300" />,
            hoverColor: "hover:bg-gray-800",
            label: "Login with GitHub",
        },
        facebook: {
            icon: <FaFacebook className="text-blue-600 text-xl group-hover:text-white transition-all duration-300" />,
            hoverColor: "hover:bg-blue-600",
            label: "Login with Facebook",
        },
    };

    const { icon, hoverColor, label } = styles[variant] || styles.google;

    return (
        <>
            <button
                onClick={onClick}
                className={`group flex items-center justify-center gap-3 border py-3 my-2 rounded-lg 
                 font-semibold text-gray-700 shadow-sm 
                 ${hoverColor} hover:text-white hover:shadow-lg 
                 transition-all duration-300 transform hover:-translate-y-1`}
            >
                {icon}
                <span>{label}</span>
            </button>
        </>
    )
}

export default Button