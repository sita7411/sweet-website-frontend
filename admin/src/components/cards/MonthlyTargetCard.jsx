import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const MonthlyTargetCard = () => {
  const [target, setTarget] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [editingTarget, setEditingTarget] = useState(false);
  const [tempTargetValue, setTempTargetValue] = useState("");
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  const size = 140;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  // Fetch both revenue and target
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("adminToken");
      if (!token) return;

      try {
        // 1. Fetch revenue (existing)
        const revRes = await axios.get(
          `${import.meta.env.VITE_API_BASE}/api/stats/monthly-revenue`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setRevenue(revRes.data.data?.revenue || 0);

        // 2. Fetch target (new)
        const targetRes = await axios.get(
          `${import.meta.env.VITE_API_BASE}/api/stats/monthly-target`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        const fetchedTarget = targetRes.data.data?.target || 0;
        setTarget(fetchedTarget);
        setTempTargetValue(fetchedTarget > 0 ? fetchedTarget.toString() : "");
      } catch (err) {
        console.error("Failed to load monthly data:", err);
      }
    };

    fetchData();
  }, []);

  // Recalculate percentage
  useEffect(() => {
    if (target > 0) {
      const prog = (revenue / target) * 100;
      setPercentage(Math.min(Math.round(prog), 100));
    } else {
      setPercentage(0);
    }
  }, [target, revenue]);

  // Click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setOpenMenu(!openMenu);

  const handleTargetSave = async (e) => {
    e.preventDefault();

    const raw = tempTargetValue.replace(/\D/g, "");
    const newValue = parseInt(raw, 10);

    if (isNaN(newValue) || newValue <= 0) {
      alert("Please enter a valid positive number");
      return;
    }

    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("Authentication required");
      return;
    }

    try {
      // Optimistic update
      setTarget(newValue);

      await axios.put(
        `${import.meta.env.VITE_API_BASE}/api/stats/monthly-target`,
        { targetAmount: newValue },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setEditingTarget(false);
      // You can show toast/success message here if you have one
    } catch (err) {
      console.error("Failed to save target:", err);
      alert("Failed to save target. Please try again.");
      // Rollback optimistic update if needed
      // setTarget(previousTarget); // you can store previous if you want
    }
  };

  const handleReset = async () => {
    if (!window.confirm("Reset monthly target to 0?")) return;

    const token = localStorage.getItem("adminToken");
    try {
      await axios.put(
        `${import.meta.env.VITE_API_BASE}/api/stats/monthly-target`,
        { targetAmount: 0 },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setTarget(0);
      setTempTargetValue("");
      setOpenMenu(false);
    } catch (err) {
      alert("Failed to reset target");
      console.error(err);
    }
  };

  const handleViewDetails = () => {
    alert(
      `Target: ₹${target.toLocaleString("en-IN")}\nRevenue: ₹${revenue.toLocaleString("en-IN")}\nProgress: ${percentage}%`,
    );
    setOpenMenu(false);
  };

  return (
    <div className="p-4 sm:p-6 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h2 className="text-sm sm:text-base font-semibold text-[#3a2416]">
          Monthly Target
        </h2>

        <div className="relative" ref={menuRef}>
          <span
            className="text-[#8a6a52] text-lg cursor-pointer select-none"
            onClick={toggleMenu}
          >
            ⋯
          </span>

          {openMenu && (
            <div className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-lg z-50">
              <ul className="text-sm text-[#3a2416]">
                <li
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setEditingTarget(true);
                    setOpenMenu(false);
                  }}
                >
                  Edit Target
                </li>
                <li
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleViewDetails}
                >
                  View Details
                </li>
                <li
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={handleReset}
                >
                  Reset
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Chart - semi circle */}
      <div className="relative h-28 sm:h-32 md:h-36 mb-4 sm:mb-5">
        <svg
          width={size}
          height={size / 2 + strokeWidth}
          className="absolute left-1/2 -translate-x-1/2"
        >
          <path
            d={`M ${strokeWidth / 2},${size / 2} A ${radius},${radius} 0 1,1 ${size - strokeWidth / 2},${size / 2}`}
            stroke="#fff1db"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
          />
          <path
            d={`M ${strokeWidth / 2},${size / 2} A ${radius},${radius} 0 1,1 ${size - strokeWidth / 2},${size / 2}`}
            stroke="#c63b2f"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-700 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#3a2416]">
            {percentage}%
          </div>
          <div className="text-[10px] sm:text-[11px] text-green-600 mt-0.5">
            {revenue > 0 ? `₹${revenue.toLocaleString("en-IN")}` : "-"}
          </div>
        </div>
      </div>

      {/* Message - can be made dynamic later */}
      <div className="text-center mb-4 sm:mb-5 -mt-10 sm:-mt-14">
        <p className="text-sm sm:text-base font-semibold text-[#3a2416]">
          {percentage >= 75 ? "Great Progress! 🎉" : "Keep Going!"}
        </p>
        <p className="text-xs sm:text-sm text-[#8a6a52] mt-1">
          Almost reaching your goal
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 text-center mb-3 sm:mb-4">
        <div className="bg-[#fff1db] rounded-lg py-2 sm:py-3">
          <p className="text-[10px] sm:text-[11px] text-[#8a6a52]">Target</p>

          {editingTarget ? (
            <form
              onSubmit={handleTargetSave}
              className="flex justify-center items-center gap-2"
            >
              <input
                type="text"
                value={tempTargetValue}
                onChange={(e) => setTempTargetValue(e.target.value)}
                className="w-24 text-sm sm:text-base font-semibold text-[#3a2416] text-center border-b border-[#c63b2f] focus:outline-none bg-transparent"
                placeholder="₹50,000"
                autoFocus
              />
              <button
                type="submit"
                className="text-green-600 text-xs font-medium hover:underline"
              >
                Save
              </button>
            </form>
          ) : (
            <p className="text-sm sm:text-base font-semibold text-[#3a2416]">
              {target > 0 ? `₹${target.toLocaleString("en-IN")}` : "Not set"}
            </p>
          )}
        </div>

        <div className="bg-white rounded-lg py-2 sm:py-3 shadow-sm">
          <p className="text-[10px] sm:text-[11px] text-[#8a6a52]">Revenue</p>
          <p className="text-sm sm:text-base font-semibold text-[#3a2416]">
            ₹{revenue.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {/* Extra Note */}
      <div className="text-center text-[10px] sm:text-[11px] text-[#8a6a52]">
        Keep pushing! You're{" "}
        <span className="font-semibold text-[#3a2416]">
          {target > 0 ? `${100 - percentage}%` : "—"}
        </span>{" "}
        away from your goal.
      </div>
    </div>
  );
};

export default MonthlyTargetCard;
