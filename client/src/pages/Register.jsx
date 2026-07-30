import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Heart } from "lucide-react";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/register", {
        name,
        email,
        password,
        bloodGroup,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Registration Successful ✅");

      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FDECEC] via-[#FDF5F3] to-[#FFF9F6] flex items-center justify-center px-4 py-16 font-['Inter']">
      <div className="w-full max-w-[560px] bg-white rounded-3xl shadow-2xl px-10 py-12 sm:px-14 sm:py-14">

        <div className="flex items-center justify-center gap-2 mb-3">
          <Heart className="text-[#C41E3A]" size={30} fill="#C41E3A" />
          <span className="text-[#1C1012] font-['Fraunces'] text-2xl font-semibold">
            BloodConnect
          </span>
        </div>

        <h1 className="text-[#1C1012] text-2xl font-semibold text-center mb-2">
          Create your account
        </h1>

        <p className="text-[#8A7876] text-sm text-center mb-12">
          Join us and start saving lives today.
        </p>

        <form onSubmit={handleRegister} className="space-y-7">

          <div>
            <label className="block text-[15px] font-bold text-[#1C1012] mb-2.5">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-white border border-[#E3D8D7] rounded-xl px-5 py-4 text-[16px] text-[#1C1012] placeholder:text-[#B3A6A4] focus:outline-none focus:ring-4 focus:ring-[#C41E3A]/10 focus:border-[#C41E3A]"
            />
          </div>

          <div>
            <label className="block text-[15px] font-bold text-[#1C1012] mb-2.5">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white border border-[#E3D8D7] rounded-xl px-5 py-4 text-[16px] text-[#1C1012] placeholder:text-[#B3A6A4] focus:outline-none focus:ring-4 focus:ring-[#C41E3A]/10 focus:border-[#C41E3A]"
            />
          </div>

          <div>
            <label className="block text-[15px] font-bold text-[#1C1012] mb-2.5">Blood Group</label>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              required
              className="w-full bg-white border border-[#E3D8D7] rounded-xl px-5 py-4 text-[16px] text-[#1C1012] focus:outline-none focus:ring-4 focus:ring-[#C41E3A]/10 focus:border-[#C41E3A]"
            >
              <option value="">Select Blood Group</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>

          <div>
            <label className="block text-[15px] font-bold text-[#1C1012] mb-2.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-white border border-[#E3D8D7] rounded-xl px-5 py-4 pr-12 text-[16px] text-[#1C1012] placeholder:text-[#B3A6A4] focus:outline-none focus:ring-4 focus:ring-[#C41E3A]/10 focus:border-[#C41E3A]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B3A6A4] hover:text-[#C41E3A]"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[15px] font-bold text-[#1C1012] mb-2.5">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full bg-white border border-[#E3D8D7] rounded-xl px-5 py-4 pr-12 text-[16px] text-[#1C1012] placeholder:text-[#B3A6A4] focus:outline-none focus:ring-4 focus:ring-[#C41E3A]/10 focus:border-[#C41E3A]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#B3A6A4] hover:text-[#C41E3A]"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C41E3A] text-white text-[16px] py-4 rounded-xl font-semibold hover:bg-[#a5182f] transition-colors mt-4 shadow-[0_4px_14px_rgba(196,30,58,0.25)] disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-[#8A7876] text-sm mt-8">
          Already have an account?{" "}
          <Link to="/login" className="text-[#C41E3A] font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;