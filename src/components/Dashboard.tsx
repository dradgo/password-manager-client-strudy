import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../auth/auth";

const Dashboard: React.FC = () => {
    const [loginToSearch, setLoginToSearch] = useState("");
    const navigate = useNavigate();

    const getPassword = async () => {
        try {
            const res = await api.get<string>(`/get/${loginToSearch}`);
            alert(`Пароль: ${res.data}`);
        } catch {
            alert("Не найдено");
        }
    };

    const deleteLogin = async () => {
        try {
            await api.delete(`/remove/${loginToSearch}`);
            alert("Удалено");
        } catch {
            alert("Ошибка удаления");
        }
    };

    return (
        <div className="p-4">
            <h2>Менеджер паролей</h2>
            <input className="input" placeholder="Login" value={loginToSearch} onChange={e => setLoginToSearch(e.target.value)} />
            <div>
                <button className="btn" onClick={getPassword}>Показать</button>
                <button className="btn danger" onClick={deleteLogin}>Удалить</button>
                <button className="btn" onClick={() => navigate("/add")}>Добавить</button>
                <button className="btn" onClick={() => { removeToken(); navigate("/login"); }}>Выйти</button>
            </div>
        </div>
    );
};

export default Dashboard;
