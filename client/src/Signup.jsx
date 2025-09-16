import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState("");
  
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); 

    const apiURL = import.meta.env.VITE_API_URL || "http://localhost:3000";

    try {
      const response = await fetch(`${apiURL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, confirmPassword, phone }),
      });

      if (response.ok) {
        setSuccess("Inscription réussie ! Vous pouvez maintenant vous connecter.");
        setError(""); 
    
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPhone("");
        setTimeout(() => navigate("/login"), 2000);
    
      } else {
        const data = await response.json();
        setError(data.message || "Échec de l'inscription");
        console.error("Signup échoué:", data.message);
      }
    } catch (err) {
      setError("Erreur serveur ");
      console.error("Error during signup:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          📇 Gestionnaire de contacts
        </h1>

        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">
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

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">
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

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="confirmPassword">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              placeholder="Confirmez votre mot de passe"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="phone">
              Téléphone
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              placeholder="Entrez votre numéro de téléphone"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 mb-4">{error}</p>
          )}

            {success && (
            <p className="text-green-500 mb-4">{success}</p>
            )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            S'inscrire
          </button>
        </form>

        <h6 className="mt-4 text-center text-gray-700 dark:text-gray-300">
          Tu as déjà un compte ?
          <Link to="/login" className="text-blue-500 hover:underline ml-1">
            Se connecter
          </Link>
        </h6>
      </div>
    </div>
  );
};

export default Signup;
