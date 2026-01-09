// src/pages/AdminLogin.jsx
import { useState } from 'react';
import { Lock, ArrowRight } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      console.log('Login attempt:', { email, password });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[var(--bg-main)]">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6 md:gap-12">

        {/* ===================== LEFT SIDE - Login Form ===================== */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="w-full max-w-md space-y-8 ml-10">
            <div className="text-center md:text-left mb-8">
              <Lock size={48} className="mx-auto md:mx-0 text-[var(--primary)] mb-4" />
              <h1 className="text-3xl font-bold text-[var(--text-main)]">Admin Login</h1>
              <p className="text-[var(--text-muted)] mt-2 text-sm">
                Secure access for administrators
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-[var(--text-muted)]">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@example.com"
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-[var(--text-muted)]">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded border border-gray-300 focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 px-4 font-medium text-white bg-[var(--primary)] hover:bg-[var(--primary)]/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed`}
              >
                {loading ? "Please wait..." : <>Sign In <ArrowRight size={18} /></>}
              </button>
            </form>

            <p className="text-center md:text-left text-sm text-[var(--text-muted)] mt-6">
              Protected area • Unauthorized access prohibited
            </p>
          </div>
        </div>

        {/* ===================== RIGHT SIDE - Illustration ===================== */}
        <div className="hidden md:flex justify-center items-center">
          <img
            src="login.png"
            alt="Admin Illustration"
            className="rounded-lg object-cover h-[580px] w-[540px] -mt-12"
          />
        </div>

      </div>
    </div>
  );
}
