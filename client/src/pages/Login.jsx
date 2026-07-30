import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Heart } from "lucide-react";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful ✅");

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDECEC] via-[#FDF5F3] to-[#FFF9F6] flex items-center justify-center px-4 py-16">

      <div className="w-full max-w-[520px] bg-white rounded-3xl shadow-2xl px-10 py-12 sm:px-14 sm:py-14">

        {/* Logo */}

        <div className="flex items-center justify-center gap-2 mb-3">
          <Heart className="text-[#C41E3A]" size={30} fill="#C41E3A" />
          <span className="text-[#1C1012] text-2xl font-semibold">
            BloodConnect
          </span>
        </div>

        <h1 className="text-[#1C1012] text-3xl font-semibold text-center mb-2">
          Log in to your account
        </h1>

        <p className="text-[#8A7876] text-sm text-center mb-10">
          Welcome back. Please enter your details.
        </p>

        <form onSubmit={handleLogin} className="space-y-7">

          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white border border-[#E3D8D7] rounded-2xl px-5 py-4 text-base focus:outline-none focus:ring-4 focus:ring-[#C41E3A]/10 focus:border-[#C41E3A]"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-semibold">Password</label>
              <Link to="/forgot-password" className="text-xs text-[#C41E3A] hover:underline">
                Forgot Password?
              </Link>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white border border-[#E3D8D7] rounded-2xl px-5 py-4 pr-12 text-base focus:outline-none focus:ring-4 focus:ring-[#C41E3A]/10 focus:border-[#C41E3A]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#C41E3A]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C41E3A] text-white py-4 rounded-2xl font-semibold hover:bg-[#a5182f] transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>

        </form>

        <p className="text-center text-[#8A7876] text-sm mt-8">
          Don't have an account?{" "}
          <Link to="/register" className="text-[#C41E3A] font-semibold hover:underline">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;