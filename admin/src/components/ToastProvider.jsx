import React, { useState, useEffect } from "react";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <ToastContainer
            position={isMobile ? "top-right" : "top-right"} 
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition={Slide}
            toastStyle={{
                background: "#fffaf0",
                color: "#3a2416",
                fontWeight: 600,
                borderRadius: "10px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
                padding: "16px 24px",
                width: isMobile ? "90%" : "350px",  
                margin: 0,
                boxSizing: "border-box",
            }}
        />
    );
}
