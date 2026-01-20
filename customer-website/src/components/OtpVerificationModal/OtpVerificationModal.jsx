import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

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
  const inputRefs = useRef([]);

  useEffect(() => {
    if (isOpen) {
      sendOtp();
      setCountdown(60);
      setResendDisabled(true);
      setOtp("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!resendDisabled) return;
    const timer = setInterval(() => {
      setCountdown((p) => {
        if (p <= 1) {
          setResendDisabled(false);
          clearInterval(timer);
          return 0;
        }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [resendDisabled]);

  const sendOtp = async () => {
    try {
      setLoading(true);
      await axios.post(`${API_BASE}/api/otp/send-email-otp`, {
        identifier: email.toLowerCase(),
        purpose,
      });
      toast.success("OTP sent");
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP send failed");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/api/otp/verify-otp`, {
        identifier: email.toLowerCase(),
        otp,
        purpose,
      });

      if (res.data.success) {
        toast.success("OTP verified");
        onVerified(); // 🔥 order complete
        onClose();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-2">Verify Email</h2>
        <p className="text-sm mb-4">OTP sent to {email}</p>

        <div className="flex gap-2 justify-center mb-4">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              maxLength={1}
              ref={(el) => (inputRefs.current[i] = el)}
              value={otp[i] || ""}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                const arr = otp.split("");
                arr[i] = val;
                setOtp(arr.join("").slice(0, 6));
                if (val && i < 5) inputRefs.current[i + 1].focus();
              }}
              className="w-10 h-12 border text-center text-xl"
            />
          ))}
        </div>

        <button
          onClick={verifyOtp}
          disabled={otp.length !== 6 || loading}
          className="w-full bg-brown-600 text-white py-2 rounded"
        >
          {loading ? <Loader2 className="animate-spin mx-auto" /> : "Verify"}
        </button>

        <button
          disabled={resendDisabled}
          onClick={sendOtp}
          className="mt-3 text-sm text-center w-full"
        >
          {resendDisabled ? `Resend in ${countdown}s` : "Resend OTP"}
        </button>
      </div>
    </div>
  );
};

export default OtpVerificationModal;
