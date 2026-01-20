import { useState } from "react";
import {
    User,
    Mail,
    Lock,
    Phone,
    MapPin,
    Eye,
    EyeOff,
    Users,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
    const { signup, login } = useAuth();
    const navigate = useNavigate();

    const [mode, setMode] = useState("signup");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        city: "",
        accountType: "",
        gender: "",
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (mode === "signup") {
                if (
                    !formData.firstName ||
                    !formData.lastName ||
                    !formData.email ||
                    !formData.password
                ) {
                    toast.error("First name, Last name, Email & Password are required");
                    setLoading(false);
                    return;
                }

                if (!formData.gender) {
                    toast.error("Please select gender");
                    setLoading(false);
                    return;
                }

                await signup(formData);
                toast.success("Account created! Please login.");
                setMode("login");
                setFormData((prev) => ({ ...prev, password: "" }));
            } else {
                await login({
                    email: formData.email,
                    password: formData.password,
                });

                toast.success("Login successful!");

                setTimeout(() => {
                    navigate("/");
                }, 1200);
            }
        } catch (err) {
            toast.error(
                err?.response?.data?.message ||
                err?.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#f9f3ef] relative font-sans flex flex-col">
            <div className="absolute inset-0 bg-[url('/login.png')] bg-cover bg-center opacity-80" />

            <header className="relative z-10 flex items-center justify-center mt-7 gap-2">
                <img src="/Logo_Marvel.png" className="w-25 h-25" alt="Marvel Logo" />
                <div className="text-center">
                    <h1 className="text-[20px] font-bold text-[#7a2e1d]">
                        Marvel Crunch Chikki
                    </h1>
                    <p className="text-[12px] text-[#9b6a4a] italic">
                        Test the crunch, Feel the Marvel
                    </p>
                </div>
            </header>

            <main className="relative z-10 flex flex-grow items-center justify-center -mt-7 px-3 py-6">
                <div
                    className={`bg-[#fffaf6] rounded-3xl shadow-xl w-full px-6 py-5
          ${mode === "signup" ? "max-w-[650px]" : "max-w-[400px] py-8 mt-7"}`}
                >
                    <div className="text-center mb-4">
                        <h2 className="text-xl font-semibold text-[#7a2e1d]">
                            {mode === "signup" ? "Create Account" : "Welcome Back"}
                        </h2>
                        <p className="text-xs text-[#8a6a52] mt-1">
                            {mode === "signup"
                                ? "Join us for crunchy happiness"
                                : "Login to continue"}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {mode === "signup" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Input icon={<User size={15} />} placeholder="First Name" name="firstName" value={formData.firstName} onChange={handleChange} />
                                <Input icon={<User size={15} />} placeholder="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} />
                                <Input icon={<Mail size={15} />} placeholder="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} />
                                <PasswordInput show={showPassword} toggleShow={() => setShowPassword(!showPassword)} value={formData.password} onChange={handleChange} />
                                <Input icon={<Phone size={15} />} placeholder="Mobile Number" name="phone" value={formData.phone} onChange={handleChange} />

                                <SelectInput
                                    icon={<Users size={15} />}
                                    placeholder="Gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    options={["Male", "Female", "Other"]}
                                />

                                <SelectInput
                                    icon={<User size={15} />}
                                    placeholder="Account Type"
                                    name="accountType"
                                    value={formData.accountType}
                                    onChange={handleChange}
                                    options={["Personal", "Wholesale", "Retailer"]}
                                />

                                <SelectInput
                                    icon={<MapPin size={15} />}
                                    placeholder="City"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    options={["Ahmedabad", "Surat", "Mumbai", "Delhi"]}
                                />
                            </div>
                        )}

                        {mode === "login" && (
                            <div className="max-w-[280px] mx-auto space-y-3">
                                <Input icon={<Mail size={15} />} placeholder="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} />
                                <PasswordInput show={showPassword} toggleShow={() => setShowPassword(!showPassword)} value={formData.password} onChange={handleChange} />
                            </div>
                        )}

                        <div className="flex justify-center pt-2">
                            <button
                                disabled={loading}
                                className="w-[55%] bg-[#b43424] hover:bg-[#9e2c1f] text-white py-2.5 rounded-full text-sm font-semibold shadow transition active:scale-95 disabled:opacity-70"
                            >
                                {loading
                                    ? mode === "signup"
                                        ? "Creating..."
                                        : "Logging in..."
                                    : mode === "signup"
                                        ? "CREATE ACCOUNT"
                                        : "LOGIN"}
                            </button>
                        </div>
                    </form>

                    <p className="text-xs text-center text-[#8a6a52] pt-4">
                        {mode === "signup" ? (
                            <>Already have an account? <span onClick={() => setMode("login")} className="text-[#7a2e1d] font-semibold cursor-pointer">Login</span></>
                        ) : (
                            <>New here? <span onClick={() => setMode("signup")} className="text-[#7a2e1d] font-semibold cursor-pointer">Create Account</span></>
                        )}
                    </p>
                </div>
            </main>

            {/* Toast */}
            <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                transition={Slide}
                toastStyle={{
                    background: 'var(--bg-soft)',
                    color: 'var(--secondary)',
                    fontWeight: 600,
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    padding: '14px 20px',
                }}
            />
        </div>
    );
}

/* ---------- Inputs ---------- */

function Input({ icon, placeholder, name, type = "text", value, onChange }) {
    return (
        <div className="relative">
            <span className="absolute left-4 top-3 text-[#b08b6f]">{icon}</span>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#f1e6dc] bg-[#fffdfb] text-xs focus:ring-2 focus:ring-[#7a2e1d]/20 outline-none"
            />
        </div>
    );
}

function PasswordInput({ show, toggleShow, value, onChange }) {
    return (
        <div className="relative">
            <span className="absolute left-4 top-3 text-[#b08b6f]"><Lock size={15} /></span>
            <input
                type={show ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={value}
                onChange={onChange}
                className="w-full pl-10 pr-10 py-2.5 rounded-full border border-[#f1e6dc] bg-[#fffdfb] text-xs focus:ring-2 focus:ring-[#7a2e1d]/20 outline-none"
            />
            <button type="button" onClick={toggleShow} className="absolute right-4 top-3 text-[#b08b6f]">
                {show ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
        </div>
    );
}

function SelectInput({ icon, placeholder, name, options, value, onChange }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <div
                onClick={() => setOpen(!open)}
                className="flex items-center w-full pl-10 pr-4 py-2.5 rounded-full border border-[#f1e6dc] bg-[#fffdfb] text-xs cursor-pointer"
            >
                <span className="absolute left-4 text-[#b08b6f]">{icon}</span>
                <span className={value ? "text-[#7a2e1d]" : "text-[#b08b6f]"}>
                    {name === "gender" && value
                        ? value.charAt(0).toUpperCase() + value.slice(1)
                        : value || placeholder}
                </span>
                <span className="ml-auto">⌄</span>
            </div>

            {open && (
                <ul className="absolute z-20 w-full mt-2 rounded-xl border bg-white shadow text-xs">
                    {options.map((opt) => (
                        <li
                            key={opt}
                            onClick={() => {
                                onChange({
                                    target: {
                                        name,
                                        value: name === "gender" ? opt.toLowerCase() : opt,
                                    },
                                });
                                setOpen(false);
                            }}
                            className="px-4 py-2 hover:bg-[#f9f3ef] cursor-pointer"
                        >
                            {opt}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
