import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            await api.post("/register", { login, password });
            alert("Регистрация успешна");
            navigate("/login");
        } catch {
            alert("Ошибка регистрации");
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2>Регистрация</h2>
            <input className="input" placeholder="Login" value={login} onChange={e => setLogin(e.target.value)} />
            <input className="input" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button className="btn" onClick={handleRegister}>Зарегистрироваться</button>
        </div>
    );
};

export default Register;
