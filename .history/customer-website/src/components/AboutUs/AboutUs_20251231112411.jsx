// AboutUsSection.jsx
import React from "react";

const AboutUsSection = () => {
  return (
    <section className="bg-[#fffaf3] py-16 px-4 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Video */}
        <div className="md:w-1/2 w-full">
          <video
            className="w-full rounded-lg shadow-lg"
            controls
            src="/video/about-us-video.mp4" // replace with your video path
            poster="/images/video-poster.png" // optional poster image
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Text Content */}
        <div className="md:w-1/2 w-full flex flex-col gap-4">
          <h2 className="text-[#c63b2f] font-semibold text-lg">About Us</h2>
          <p className="text-[#3a2416] text-base md:text-lg">
            打開輕鬆，有淡淡的米麴香細口品嚐，流露天然水果味。
          </p>
          <p className="text-[#8a6a52] text-sm md:text-base">
            台南的經典米糕材料是主要原料，這裡採用先烤土雞配天然甘蔗糖的會果
            乾，確保每塊手工有自然果香味的香氣，並保持食材真材實料且具有自然的風味。
          </p>
          <p className="text-[#8a6a52] text-sm md:text-base">
            全程由一由傳統米糕製作的職人嚴格挑選，取自台灣優質米製作的頂級風味，將產品的口感及香味傳承。
          </p>
          <button className="mt-4 self-start bg-[#c63b2f] text-white px-6 py-2 rounded-lg hover:bg-[#a53127] transition">
            Read More
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
