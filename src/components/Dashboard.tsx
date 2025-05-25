import React, {useEffect, useState} from "react";
import {deletePasswordByUuid, fetchUserCredentials, showPasswordByUuid} from '../api/credentialApi';
import { useNavigate } from "react-router-dom";
import { removeToken } from "../auth/auth";
import {Credential} from "../model/Credential";

const Dashboard: React.FC = () => {
    const [credentials, setCredentials] = useState<Credential[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const loadCredentials = async () => {
            try {
                const data = await fetchUserCredentials();
                setCredentials(data);
            } catch (error) {
                console.error('Failed to load credentials:', error);
            } finally {
                setLoading(false);
            }
        };

        loadCredentials();
    }, []);

    const handleShow = async (uuid: string) => {
        try {
            const password = await showPasswordByUuid(uuid);
            alert(`Password: ${password}`);
        } catch {
            alert("Ошибка получения пароля");
        }
    };

    const handleDelete = async (uuid: string) => {
        if (!window.confirm("Удалить запись?")) return;
        try {
            await deletePasswordByUuid(uuid);
            setCredentials(credentials.filter(e => e.uuid !== uuid));
        } catch {
            alert("Ошибка удаления");
        }
    };

    return (
        <div className="p-4">
            <h2>Менеджер паролей</h2>
            <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Your Logins</h2>

                {loading ? (
                    <p>Loading...</p>
                ) : credentials.length === 0 ? (
                    <p>No credentials found.</p>
                ) : (
                    <table className="min-w-full border border-gray-300">
                        <thead>
                        <tr>
                            <th className="border px-4 py-2 text-left">Login</th>
                            <th className="border px-4 py-2 text-left">URL</th>
                            <th className="p-2">Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {credentials.map((cred) => (
                            <tr key={cred.id}>
                                <td className="border px-4 py-2">{cred.login}</td>
                                <td className="border px-4 py-2">
                                    <a
                                        href={cred.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        {cred.url}
                                    </a>
                                </td>
                                <td className="p-2 text-center space-x-2">
                                    <button
                                        className="bg-green-600 text-white px-2 py-1 rounded"
                                        onClick={() => handleShow(cred.uuid)}
                                    >
                                        Показать
                                    </button>
                                    <button
                                        className="bg-red-600 text-white px-2 py-1 rounded"
                                        onClick={() => handleDelete(cred.uuid)}
                                    >
                                        Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
            <div>
                <button className="btn" onClick={() => navigate("/add")}>Добавить</button>
                <button className="btn" onClick={() => { removeToken(); navigate("/login"); }}>Выйти</button>
            </div>
        </div>
    );
};

export default Dashboard;
