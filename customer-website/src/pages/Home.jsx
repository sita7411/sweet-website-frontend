import React from "react";

import Herosection from "../components/Herosection/Herosection";
import FeaturesSection from "../components/FeaturesSection/FeaturesSection";
import PopularItems from "../components/PopularItems/PopularItems";
import AboutUs from "../components/AboutUs/AboutUs";
import BestsellerSection from "../components/BestsellerSection/BestsellerSection";
import OfferSection from "../components/OfferSection/OfferSection";
import TestimonialsSection from "../components/TestimonialsSection/TestimonialsSection";
import StatsSection from "../components/StatsSection/StatsSection";
import SubscribeSection from "../components/SubscribeSection/SubscribeSection";

const Home = () => {
  return (
    <div>
      <Herosection />
      <FeaturesSection />
      <PopularItems />
      <AboutUs />
      <BestsellerSection />
      <OfferSection />
      <TestimonialsSection />
       <StatsSection />
      <SubscribeSection />
    </div>
  );
};

export default Home;
