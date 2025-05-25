import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

const AddEntry: React.FC = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [url, setUrl] = useState(""); // ✅ Add URL state
    const navigate = useNavigate();

    const handleAdd = async () => {
        try {
            await api.post("/add", { login, password, url }); // ✅ Include URL in payload
            alert("Сохранено");
            navigate("/");
        } catch {
            alert("Ошибка");
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Добавить логин</h2>

            <input
                className="input mb-2 w-full p-2 border rounded"
                placeholder="Login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
            />
            <input
                className="input mb-2 w-full p-2 border rounded"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <input
                className="input mb-4 w-full p-2 border rounded"
                placeholder="URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />

            <button className="btn bg-blue-600 text-white px-4 py-2 rounded" onClick={handleAdd}>
                Сохранить
            </button>
        </div>
    );
};

export default AddEntry;
