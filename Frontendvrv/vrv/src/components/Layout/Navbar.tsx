import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-indigo-600">RBAC</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {user && (
              <>
                {/* User Dashboard - Available to all logged-in users */}
                <button
                  onClick={() => navigate("/user-dashboard")}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  User Dashboard
                </button>

                {/* Moderator Dashboard - Available to moderators and admins */}
                {(user.role === "moderator" || user.role === "admin") && (
                  <button
                    onClick={() => navigate("/moderator-dashboard")}
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Moderator Dashboard
                  </button>
                )}

                {/* Admin Dashboard - Available only to admins */}
                {user.role === "admin" && (
                  <button
                    onClick={() => navigate("/admin-dashboard")}
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Admin Dashboard
                  </button>
                )}
                <button
                  onClick={() => navigate("/")}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </button>
                {/* User Info & Logout */}
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {user.username} ({user.role})
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}

            {!user && (
              <>
                <button
                  onClick={() => navigate("/auth/login")}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/auth/register")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
