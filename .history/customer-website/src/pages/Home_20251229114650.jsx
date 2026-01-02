import React from "react";
import Navbar from "../components/Navbar/Navbar"; // path check karo

const Home = () => {
  return (
    <div>
      <Navbar />  {/* Navbar render hoga */}

      {/* Page Content */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Marvel Crunch</h1>
        <p className="text-gray-700 text-lg text-center">
          Delicious chikkis and sweets made with love!
        </p>
      </div>
    </div>
  );
};

export default Home;
