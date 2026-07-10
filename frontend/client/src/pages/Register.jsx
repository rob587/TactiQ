import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { register } from "../services/api";

const Register = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await register(form);
      loginUser(response.data.token, response.data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Errore durante la registrazione");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-indigo-400 mb-2">TactiQ</h1>
            <p className="text-gray-400">AI Tactical Assistant</p>
          </div>

          {/* Form */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-white mb-2">
              Registrati
            </h2>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="il_tuo_username"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="la_tua@email.com"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900 text-white font-semibold py-3 rounded-lg transition-colors mt-2"
            >
              {loading ? "Registrazione..." : "Registrati"}
            </button>

            <p className="text-center text-gray-500 text-sm">
              Hai già un account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                Accedi
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
