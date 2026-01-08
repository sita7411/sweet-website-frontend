import React, { useState, useRef, useEffect } from "react";

const MonthlyTargetCard = () => {
  const defaultTarget = 600000; // Default target
  const [target, setTarget] = useState(defaultTarget);
  const [percentage, setPercentage] = useState(85);
  const [editingTarget, setEditingTarget] = useState(false);

  const size = 140;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

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

  const handleTargetSave = (e) => {
    e.preventDefault();
    const value = parseInt(e.target.targetValue.value.replace(/\D/g, ""));
    if (!isNaN(value)) {
      setTarget(value);
      setPercentage(Math.min(Math.round((value / defaultTarget) * 100), 100));
    }
    setEditingTarget(false);
  };

  const handleReset = () => {
    setTarget(defaultTarget);
    setPercentage(85);
    setEditingTarget(false);
    setOpenMenu(false);
  };

  const handleViewDetails = () => {
    alert(
      `Target: ₹${target.toLocaleString()}\nRevenue: ₹510,000\nProgress: ${percentage}%`
    );
    setOpenMenu(false);
  };

  return (
    <div className=" p-4 sm:p-6 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto relative">

      {/* Header */}
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h2 className="text-sm sm:text-base font-semibold text-[#3a2416]">
          Monthly Target
        </h2>

        {/* 3 Dots + Dropdown */}
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

      {/* Chart */}
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
            +8.02%
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="text-center mb-4 sm:mb-5 -mt-10 sm:-mt-14">
        <p className="text-sm sm:text-base font-semibold text-[#3a2416]">
          Great Progress 🎉
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
            <form onSubmit={handleTargetSave} className="flex justify-center">
              <input
                name="targetValue"
                type="text"
                defaultValue={`₹${target.toLocaleString()}`}
                className="w-20 text-sm sm:text-base font-semibold text-[#3a2416] text-center border-b border-[#c63b2f] focus:outline-none"
                autoFocus
                onBlur={() => setEditingTarget(false)}
              />
            </form>
          ) : (
            <p className="text-sm sm:text-base font-semibold text-[#3a2416]">
              ₹{target.toLocaleString()}
            </p>
          )}
        </div>

        <div className="bg-white rounded-lg py-2 sm:py-3 shadow-sm">
          <p className="text-[10px] sm:text-[11px] text-[#8a6a52]">Revenue</p>
          <p className="text-sm sm:text-base font-semibold text-[#3a2416]">
            ₹51000
          </p>
        </div>
      </div>

      {/* Extra Note */}
      <div className="text-center text-[10px] sm:text-[11px] text-[#8a6a52]">
        Keep pushing! You're <span className="font-semibold text-[#3a2416]">{100 - percentage}%</span> away from your goal.
      </div>
    </div>
  );
};

export default MonthlyTargetCard;
