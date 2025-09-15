import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 

    const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

    try {
      const response = await fetch(`${apiURL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setError(data.message || "Email ou mot de passe invalide");
      }
    } catch (err) {
      console.error("Erreur lors de la connexion:", err);
      setError("Erreur réseau ou serveur indisponible.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          📇 Gestionnaire de contacts
        </h1>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              placeholder="Entrez votre email"
              required
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 dark:text-gray-300 mb-2"
              htmlFor="password"
            >
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Se connecter
          </button>
        </form>

        <h6 className="mt-4 text-gray-600 dark:text-gray-300">
          Tu n'as pas de compte ?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            S'inscrire
          </a>
        </h6>
      </div>
    </div>
  );
};

export default Login;
