import React, { useState, useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const OtpVerificationModal = ({
  isOpen,
  onClose,
  email,
  onVerified,
  purpose = "checkout",
}) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(60);
  const [otpSent, setOtpSent] = useState(false);

  const inputRefs = useRef([]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setOtp("");
      setOtpSent(false);
      setResendDisabled(true);
      setCountdown(60);
    }
  }, [isOpen]);

  // Auto-send OTP when modal first opens (only once)
  useEffect(() => {
    if (isOpen && !otpSent) {
      sendOtp(false);
    }
  }, [isOpen, otpSent]);

  // Countdown for resend button
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
      toast.error("Valid email is required");
      return;
    }

    if (loading) return;

    try {
      setLoading(true);

      const sendToEmail = email.trim().toLowerCase();

      // ──── CORRECT ENDPOINT ────
      await axios.post(`${API_BASE}/api/otp/send-email-otp`, {
        identifier: sendToEmail,   // consistent with backend
        purpose,
      });

      toast.success(isResend ? "OTP resent successfully!" : "OTP sent successfully!");
      setOtpSent(true);
      setResendDisabled(true);
      setCountdown(60);
      setOtp("");

      // Focus first input after short delay
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 300);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        (isResend ? "Failed to resend OTP" : "Failed to send OTP");
      toast.error(msg);
      console.error("[OTP SEND ERROR]", {
        email: email.trim(),
        response: err.response?.data,
        message: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      toast.error("Please enter a complete 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const verifyEmail = email.trim().toLowerCase();

      const res = await axios.post(`${API_BASE}/api/otp/verify-otp`, {
        identifier: verifyEmail,
        otp,
        purpose,
      });

      if (res.data?.success) {
        toast.success("Email verified successfully!");
        onVerified();   // This should trigger order placement
        onClose();
      } else {
        toast.error(res.data?.message || "Invalid or expired OTP");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Verification failed";
      toast.error(msg);
      console.error("[OTP VERIFY ERROR]", {
        email: email.trim(),
        otp,
        response: err.response?.data,
        message: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    setOtp(pasted);
    if (pasted.length > 0) {
      inputRefs.current[Math.min(pasted.length - 1, 5)]?.focus();
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
                  maxLength={1}
                  value={otp[i] || ""}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, "");
                    const newOtp = otp.split("");
                    newOtp[i] = val;
                    setOtp(newOtp.join("").slice(0, 6));
                    if (val && i < 5) {
                      inputRefs.current[i + 1]?.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !otp[i] && i > 0) {
                      inputRefs.current[i - 1]?.focus();
                    }
                  }}
                  className="w-12 h-14 text-center text-2xl font-bold border-2 border-gray-300 rounded-lg focus:border-[#6b3f26] focus:outline-none focus:ring-1 focus:ring-[#6b3f26]/30 transition-all"
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

          <div className="text-center text-sm">
            <button
              onClick={() => sendOtp(true)}
              disabled={resendDisabled || loading}
              className={`font-medium transition
                ${resendDisabled
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-[#6b3f26] hover:underline"}`}
            >
              {resendDisabled ? `Resend OTP in ${countdown}s` : "Resend OTP"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t text-center">
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 text-sm font-medium transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerificationModal;