import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userManager } from "../helpers/auth_helper"; 

const Callback: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleCallback = async () => {
            console.log("Callback component mounted");
            try {
                
                console.log("LocalStorage before callback:", localStorage);

                const user = await userManager.signinRedirectCallback();
                
    
                console.log("User logged in:", user);
                console.log("LocalStorage after callback:", localStorage);

                navigate("/");
            } catch (err) {
                console.error("Login failed:", err);
                console.log("LocalStorage during error:", localStorage);
            
            }
        };

        handleCallback();
    }, [navigate]);

    return <div>Loading...</div>;
};

export default Callback;