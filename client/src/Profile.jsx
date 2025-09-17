// Pas terminé la page profile, à finir plus tard (à ne pas prendre en compte)

import React from "react";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    
    const token = localStorage.getItem("token");
    const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState("");
    const navigate = useNavigate();

    const getUserProfile = async () => {
        if (!token) {
            navigate("/");
            return;
        }
        try {
            const response = await fetch(`${apiURL}/api/profile`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            });
            if (!response.ok) throw new Error("Erreur chargement profil");
            const data = await response.json();
            setUser(data);
        } catch (err) {
            console.error("❌ Erreur chargement profil:", err);
            setError("Impossible de charger le profil.");
        } finally {
            setLoading(false);
        }
    };

return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950">
    <div className="absolute left-0">
      <Navbar />
    </div>
    <div className="size-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Votre profil
      </h2>
        {loading && <p className="text-gray-500">Chargement...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {user && (
            <div c>
                <p className="text-gray-700 dark:text-gray-300"><strong>Nom:</strong> {user.name}</p>
                <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> {user.email}</p>
            </div>
        )}

      </div>
    </div>
)

};





