import React, { useState } from "react";
import { login } from '../../helpers/auth_helper';

const Login: React.FC = () => {
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        try {
            await login();
        } catch (e) {
            setError("Login failed. Please try again.");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin}>Login with Keycloak</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Login;