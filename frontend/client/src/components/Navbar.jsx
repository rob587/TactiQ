import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-gray-900 border-b border-gray-800 px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-indigo-400">TactiQ</span>
            <span className="text-gray-500 text-sm">AI Tactical Assistant</span>
          </div>

          {/* Nav links */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/dashboard")}
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/dashboard"
                  ? "text-indigo-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate("/history")}
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/history"
                  ? "text-indigo-400"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Storico
            </button>
          </div>

          {/* User + Logout */}
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm">{user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-gray-800 hover:bg-gray-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
