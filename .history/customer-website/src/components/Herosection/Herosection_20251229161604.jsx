import React from 'react';

const ChikkiPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 flex items-center justify-between px-12 py-16 relative overflow-hidden font-sans">
      {/* Background Circle */}
      <div className="absolute -top-48 -right-48 w-96 h-96 md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] bg-pink-200 opacity-40 rounded-full -z-10"></div>

      {/* Left Section */}
      <div className="max-w-lg z-10">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
          We Serve The Chikki<br />
          You Love <span className="text-6xl">😍</span>
        </h1>

        <p className="mt-6 text-lg text-gray-600 leading-relaxed">
          Discover delicious varieties of chikki made from nuts, seeds, and jaggery. 
          We bring you the best traditional and innovative chikki flavors to enjoy.
        </p>

        <div className="mt-10 flex items-center gap-6">
          <button className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-full transition">
            Explore Chikki
          </button>

          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="pl-12 pr-6 py-4 w-56 bg-white border border-gray-300 rounded-full text-gray-700 focus:outline-none focus:border-amber-500"
            />
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl text-gray-400">🔍</span>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="relative flex flex-col items-center">
        {/* Plate with Main Chikki Stack */}
        <div className="relative w-96 h-96 md:w-[500px] md:h-[500px] bg-white rounded-full shadow-2xl flex items-center justify-center">
          {/* Main Strawberry Chikki Stack */}
          <img
            src="https://i5.walmartimages.com/seo/Bikaji-Mango-Dryfruit-Chikki-8-8-Oz_4d9e1882-5e73-4ddc-b168-ff2c07bc52ec.1476164e2c8b2a94fadc859c0bb524cd.jpeg"
            alt="Strawberry Chikki Stack"
            className="w-80 md:w-96 object-contain drop-shadow-lg"
          />

          {/* Decorative Fresh Strawberries on Top */}
          <img
            src="https://as2.ftcdn.net/jpg/01/15/42/45/1000_F_115424520_aC2EVHseK8gfZDPByZRLkS6oxiv2DEre.jpg"
            alt="Fresh Strawberries"
            className="absolute -top-8 right-12 w-32 md:w-40 object-contain"
          />
        </div>

        {/* Flavor List */}
        <div className="mt-12 flex flex-col gap-4">
          {/* Classic */}
          <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition">
            <img
              src="https://m.media-amazon.com/images/I/816LCD+tMXL._AC_UF894,1000_QL80_.jpg"
              alt="Classic"
              className="w-12 h-12 rounded-full object-cover"
            />
            <span className="text-gray-700 font-medium">Classic</span>
          </div>

          {/* Strawberry (Active/Highlighted) */}
          <div className="flex items-center gap-4 bg-amber-100 px-6 py-3 rounded-full shadow-lg ring-4 ring-amber-400">
            <img
              src="https://i5.walmartimages.com/seo/Bikaji-Mango-Dryfruit-Chikki-8-8-Oz_4d9e1882-5e73-4ddc-b168-ff2c07bc52ec.1476164e2c8b2a94fadc859c0bb524cd.jpeg"
              alt="Strawberry"
              className="w-12 h-12 rounded-full object-cover"
            />
            <span className="text-gray-800 font-semibold">Strawberry</span>
          </div>

          {/* Mango */}
          <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition">
            <img
              src="https://m.media-amazon.com/images/I/51wNDzReHiL._AC_UF1000,1000_QL80_.jpg"
              alt="Mango"
              className="w-12 h-12 rounded-full object-cover"
            />
            <span className="text-gray-700 font-medium">Mango</span>
          </div>

          {/* Chocolate */}
          <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition">
            <img
              src="https://img-cdn.publive.online/fit-in/1200x675/sanjeev-kapoor/media/post_banners/d4c148387c4c7ec90d82d8215862664b48dd0bf829eef9319d2ea3fde9e56382.jpg"
              alt="Chocolate"
              className="w-12 h-12 rounded-full object-cover"
            />
            <span className="text-gray-700 font-medium">Chocolate</span>
          </div>

          {/* Mixed */}
          <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg transition">
            <img
              src="https://www.cookwithmanali.com/wp-content/uploads/2019/12/Mixed-Nuts-Chikki-500x375.jpg"
              alt="Mixed"
              className="w-12 h-12 rounded-full object-cover"
            />
            <span className="text-gray-700 font-medium">Mixed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChikkiPage;