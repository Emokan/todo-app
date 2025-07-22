import React, { useState } from "react";
import { loginUser } from "../api"; 

const LoginForm = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const { ok, data } = await loginUser(email,password);
            if (ok) {
                localStorage.setItem("token", data.token);
                if (onLoginSuccess) onLoginSuccess(data.token);
                setMessage(`✅ ${data.message}`);
            } else {
                setMessage(`❌ ${data.message}`);
            }
        } catch (error) {
            console.error("Istek hatası:", error);
            setMessage("❌ Giriş sırasında bir hata oluştu.")
        }
    };

    return (
        <div>
            <h2>Giriş Yap</h2>
            <form onSubmit={handleLogin}>
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                /><br/><br/>
                <input
                type="password"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                /><br/><br/>
                <button type="submit">Giriş Yap</button>
            </form>
            <p>{message}</p>
        </div>
    );
};

export default LoginForm;