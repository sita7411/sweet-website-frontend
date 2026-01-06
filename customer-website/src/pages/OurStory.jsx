import React from "react";

import Herosection from "../components/Herosection/Aboutbanner";
import RootedInTradition from "../components/Tradition/Tradition";
import ChikkiCollections from "../components/ChikkiCollections/ChikkiCollections";
import BehindTheScenes from "../components/BehindTheScenes/BehindTheScenes";
import TrustSection from "../components/TrustSection/TrustSection";

const OurStory = () => {
    return (
        <div>
         
            <Herosection />
            <RootedInTradition />
            <ChikkiCollections />
            <BehindTheScenes />
            <TrustSection />
        </div >
    );
};

export default OurStory;
