import React, { useState } from "react";
import api from "../api";
import { setToken } from "../auth/auth";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await api.post<{ token: string }>("/login", { login, password });
            setToken(res.data.token);
            navigate("/");
        } catch {
            alert("Неверные данные");
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2>Вход</h2>
            <input className="input" placeholder="Login" value={login} onChange={e => setLogin(e.target.value)} />
            <input className="input" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button className="btn" onClick={handleLogin}>Войти</button>
        </div>
    );
};

export default Login;
