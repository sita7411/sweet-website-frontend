// src/pages/AdminLogin.jsx
import { useState } from "react";
import { Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useAdminAuth } from "../context/AdminAuthContext";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await login(email, password);

    if (result.success && result.admin) {
      toast.success("Login successful! Redirecting...", {
        position: "top-right",
        autoClose: 1800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });

      // Give toast time to show before redirect
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 2200);
    } else {
      toast.error(result.message || "Login failed. Please check your email and password.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 sm:px-6 py-10 lg:py-6 bg-[var(--bg-main)]">

      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-10 lg:gap-16 xl:gap-24">
        {/* LEFT SIDE - Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div
            className="
              w-full max-w-md rounded-2xl p-6 sm:p-8 lg:p-0 space-y-8
              ml-0 lg:ml-16
              bg-white/70 lg:bg-transparent shadow-sm lg:shadow-none
            "
          >
            {/* MOBILE IMAGE */}
            <div className="flex lg:hidden justify-center">
              <img
                src="login_illustration.png"
                alt="Admin Illustration"
                className="h-48 sm:h-56 object-contain"
              />
            </div>

            {/* HEADING */}
            <div className="text-center lg:text-left space-y-3">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <span className="p-2 rounded-lg bg-[var(--primary)]/10">
                  <Lock size={22} className="text-[var(--primary)]" />
                </span>
                <h1 className="text-2xl lg:text-3xl font-semibold text-[var(--text-main)]">
                  Admin Login
                </h1>
              </div>

              <p className="text-[var(--text-muted)] text-sm max-w-sm mx-auto lg:mx-0">
                Secure access for administrators only. Please sign in to continue.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* EMAIL */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-[var(--text-muted)]">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@example.com"
                  autoFocus
                  className="
                    w-full px-4 py-3 rounded-lg border border-gray-300
                    focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20
                    outline-none transition-all
                  "
                />
              </div>

              {/* PASSWORD */}
              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-[var(--text-muted)]">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    aria-label="Password"
                    className="
                      w-full px-4 py-3 pr-12 rounded-lg border border-gray-300
                      focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20
                      outline-none transition-all
                    "
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="
                      absolute inset-y-0 right-3 flex items-center
                      text-gray-500 hover:text-[var(--primary)]
                    "
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading || !email.trim() || !password.trim()}
                className="
                  w-full py-3.5 font-medium text-white
                  bg-[var(--primary)] hover:bg-[var(--primary)]/90
                  transition-all flex items-center justify-center gap-2
                  rounded-lg disabled:opacity-70 active:scale-[0.98]
                "
              >
                {loading ? "Please wait..." : <>Sign In <ArrowRight size={18} /></>}
              </button>
            </form>

            <p className="text-center lg:text-left text-xs sm:text-sm text-[var(--text-muted)]">
              Protected area • Unauthorized access prohibited
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - Illustration (desktop only) */}
        <div className="hidden lg:flex justify-end items-center pr-10">
          <img
            src="login_illustration.png"
            alt="Admin Illustration"
            className="rounded-lg object-contain h-[320px] xl:h-[500px]"
          />
        </div>
      </div>
    </div>
  );
}