import React, { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const OtpVerificationModal = ({
  isOpen,
  onClose,
  email,           // this is the user's entered email from checkout form
  onVerified,
  purpose = "checkout",
}) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const [otpSent, setOtpSent] = useState(false);

  const inputRefs = useRef([]);

  // Send OTP automatically when modal opens (first time)
  useEffect(() => {
    if (isOpen && !otpSent) {
      sendOtp(false);
    }
  }, [isOpen, otpSent]);

  // Countdown timer for resend button
  useEffect(() => {
    if (!resendDisabled) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [resendDisabled]);

  const sendOtp = async (isResend = false) => {
    if (!email || !email.includes("@")) {
      toast.error("Valid email required");
      return;
    }

    if (loading) return;

    try {
      setLoading(true);

      // ────────────────────────────────────────────────────────────────
      // IMPORTANT: Use SAME email for send & verify (Resend sandbox limitation)
      // Change this to email.trim() ONLY after you verify your own domain in Resend
      const sendToEmail = "sitausdadiya7411@gmail.com"; // ← your working test email

      console.log("[OTP SEND] Attempting to send to:", sendToEmail);

      const res = await axios.post(`${API_BASE}/api/otp/send-email-otp`, {
        email: sendToEmail,
        purpose,
      });

      if (res.data.success) {
        toast.success(isResend ? "OTP resent successfully!" : "OTP sent!");
        setOtpSent(true);
        setResendDisabled(true);
        setCountdown(60);
        setOtp(""); // clear previous OTP

        setTimeout(() => {
          inputRefs.current[0]?.focus();
        }, 300);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to send OTP. Try again.";
      console.error("[OTP SEND ERROR]", err.response?.data || err.message);

      if (msg.includes("wait") || msg.includes("cooldown")) {
        toast.warn(msg);
        const match = msg.match(/(\d+)\s*seconds?/);
        if (match) {
          const sec = parseInt(match[1], 10);
          if (sec > 0 && sec < 120) {
            setResendDisabled(true);
            setCountdown(sec);
          }
        }
      } else {
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter complete 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      // MUST BE THE SAME EMAIL used in sendOtp
      const verifyWithEmail = "sitausdadiya7411@gmail.com"; // ← same as above

      console.log("[OTP VERIFY] Sending request with:", {
        phone: verifyWithEmail,
        otp,
        purpose,
      });

      const res = await axios.post(`${API_BASE}/api/otp/verify-otp`, {
        phone: verifyWithEmail,
        otp,
        purpose,
      });

      if (res.data.success) {
        toast.success("Email verified successfully!");
        onVerified();
        onClose();
      } else {
        toast.error(res.data.message || "Invalid OTP");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Verification failed. Please try again.";
      console.error("[OTP VERIFY ERROR]", err.response?.data || err.message);

      if (msg.includes("attempts") || msg.includes("Too many")) {
        toast.error(msg);
        setResendDisabled(true);
        setCountdown(60);
      } else if (msg.includes("expired") || msg.includes("not found")) {
        toast.error("OTP expired or invalid. Please request a new one.");
      } else {
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle paste into OTP fields
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length > 0) {
      setOtp(pasted);
      const nextFocus = Math.min(pasted.length, 5);
      inputRefs.current[nextFocus]?.focus();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-[#6b3f26] text-white px-6 py-5">
          <h3 className="text-xl font-bold">Verify Your Email</h3>
          <p className="text-white/80 mt-1 text-sm">
            Enter OTP sent to <strong>{email}</strong>
            {/* Debug note - visible only during testing */}
            <br />
            <small style={{ opacity: 0.7 }}>
              (testing: sending to sitausdadiya7411@gmail.com)
            </small>
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div className="flex justify-center gap-3" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={otp[i] || ""}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/, "");
                    const newOtp = otp.split("");
                    newOtp[i] = val;
                    setOtp(newOtp.join("").slice(0, 6));
                    if (val && i < 5) inputRefs.current[i + 1]?.focus();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !otp[i] && i > 0) {
                      inputRefs.current[i - 1]?.focus();
                    }
                  }}
                  onFocus={(e) => e.target.select()}
                  className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-[#6b3f26] focus:outline-none focus:ring-2 focus:ring-[#6b3f26]/30 transition"
                />
              ))}
          </div>

          <button
            onClick={verifyOtp}
            disabled={loading || otp.length !== 6}
            className={`w-full py-3.5 rounded-xl font-bold text-white text-lg transition flex items-center justify-center gap-2 shadow-sm
              ${loading || otp.length !== 6
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#6b3f26] hover:bg-[#8b5e3c] active:bg-[#5a351f]"}`}
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Email"
            )}
          </button>

          <div className="text-center text-sm pt-2">
            <button
              onClick={() => sendOtp(true)}
              disabled={resendDisabled || loading}
              className={`font-medium transition-colors
                ${resendDisabled || loading
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-[#6b3f26] hover:text-[#8b5e3c] underline-offset-2 hover:underline"}`}
            >
              {resendDisabled ? `Resend OTP in ${countdown}s` : "Resend OTP"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t text-center">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationModal;
