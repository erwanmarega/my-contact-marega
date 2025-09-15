import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        const apiURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

        try {
            const response = await fetch(`${apiURL}/api/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password, confirmPassword }),
            });

            if (response.ok) {
                navigate('/dashboard');
            } else {
                const data = await response.json();
                console.error('Signup échoué:', data.message);
            }
        }

        catch (err) {
            console.error('Error during signup:', err);
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
                      <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="username">
                          Email
                      </label>
                      <input
                          type="text"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                          placeholder="Entrez votre email"
                      />
                      </div>
                      <div className="mb-6">
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
                      />
                      </div>
                        <div className="mb-6">
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
                        />
                        </div>
                      <button
                          type="submit"
                          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
                          >
                          Se connecter
                      </button>
  
  
              </form>
          <h6 className=''>
              tu as déjà un compte ?
              <a href="/" className="text-blue-500 hover:underline ml-1">
                  Se connecter
              </a>
          </h6>
        </div>
  </div>

        );
}

export default Signup;