import React from "react";

import Navbar from "../components/Navbar/Navbar";
import TopBar from "../components/Navbar/TopBar";
import Herosection from "../components/Herosection/Herosection";
import FeaturesSection from "../components/FeaturesSection/FeaturesSection";
import PopularItems from "../components/PopularItems/PopularItems";
import AboutUs from "../components/AboutUs/AboutUs";

const Home = () => {
    return (
        <div>
            <TopBar />
            <Navbar />
            <Herosection />
            <FeaturesSection />
            <PopularItems />
            <AboutUs />
            <Best
        </div >
    );
};

export default Home;
