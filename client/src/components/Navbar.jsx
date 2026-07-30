import { Link, NavLink } from "react-router-dom";
import { Heart } from "lucide-react";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-red-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">

        <div className="h-20 flex items-center justify-between">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg">
              <Heart
                size={24}
                fill="white"
                color="white"
              />
            </div>

            <div>
              <h1 className="text-3xl font-extrabold text-slate-800">
                Blood<span className="text-red-600">Connect</span>
              </h1>
            </div>
          </Link>

          {/* Nav Links */}

          <nav className="hidden md:flex items-center gap-10 font-medium text-slate-600">

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-red-600 border-b-2 border-red-600 pb-1"
                  : "hover:text-red-600 transition"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/donors"
              className={({ isActive }) =>
                isActive
                  ? "text-red-600 border-b-2 border-red-600 pb-1"
                  : "hover:text-red-600 transition"
              }
            >
              Donors
            </NavLink>

            <NavLink
              to="/requests"
              className={({ isActive }) =>
                isActive
                  ? "text-red-600 border-b-2 border-red-600 pb-1"
                  : "hover:text-red-600 transition"
              }
            >
              Requests
            </NavLink>

          </nav>

          {/* Buttons */}

          <div className="flex items-center gap-4">

            <Link
              to="/login"
              className="border border-red-500 text-red-600 px-6 py-2 rounded-xl hover:bg-red-50 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl shadow-lg transition"
            >
              Register
            </Link>

          </div>

        </div>

      </div>
    </header>
  );
}

export default Navbar;