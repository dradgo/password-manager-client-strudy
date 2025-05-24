import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const AddEntry: React.FC = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleAdd = async () => {
        try {
            await api.post("/add", { login, password });
            alert("Сохранено");
            navigate("/");
        } catch {
            alert("Ошибка");
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2>Добавить логин</h2>
            <input className="input" placeholder="Login" value={login} onChange={e => setLogin(e.target.value)} />
            <input className="input" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button className="btn" onClick={handleAdd}>Сохранить</button>
        </div>
    );
};

export default AddEntry;
