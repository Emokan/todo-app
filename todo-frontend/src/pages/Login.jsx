import React from "react";
import LoginForm from "../components/LoginForm";

const Login = ({ setToken }) => {
    return (
        <div>
            <h1>Giriş Yap</h1>
            <LoginForm onLoginSuccess={setToken}/>
        </div>
    );
};

export default Login;