import { useState } from "react";

const tabs = [
  { name: "Dishes", img: "https://via.placeholder.com/300x300.png?text=Dishes" },
  { name: "Dessert", img: "https://via.placeholder.com/300x300.png?text=Dessert" },
  { name: "Drinks", img: "https://via.placeholder.com/300x300.png?text=Drinks" },
  { name: "Platter", img: "https://via.placeholder.com/300x300.png?text=Platter" },
  { name: "Snacks", img: "https://via.placeholder.com/300x300.png?text=Snacks" },
];

export default function FoodSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [fade, setFade] = useState(false);

  const handleClick = (index) => {
    setFade(true);
    setTimeout(() => {
      setActiveTab(index);
      setFade(false);
    }, 300); // match transition duration
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-8 bg-gray-50 min-h-screen">
      {/* Left Text */}
      <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
        <h1 className="text-3xl font-bold mb-4">We Serve The Test You Love 😍</h1>
        <p className="text-gray-600 mb-4">
          This is a type of restaurant which typically serves food and drinks, in addition to light refreshments such as baked goods or snacks.
        </p>
        <div className="flex gap-4 justify-center md:justify-start">
          <button className="bg-yellow-500 text-white px-4 py-2 rounded">Explore Food</button>
          <button className="border border-yellow-500 text-yellow-500 px-4 py-2 rounded">Search</button>
        </div>
      </div>

      {/* Right Tabs + Image */}
      <div className="md:w-1/2 flex items-center justify-center relative">
        <img
          src={tabs[activeTab].img}
          alt={tabs[activeTab].name}
          className={`w-72 h-72 object-cover rounded-full transition-all duration-300 ease-in-out ${
            fade ? "scale-0 opacity-0" : "scale-100 opacity-100"
          }`}
        />

        <div className="absolute right-0 flex flex-col gap-4">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`px-4 py-2 rounded shadow ${
                activeTab === index ? "bg-yellow-500 text-white" : "bg-white text-black"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
