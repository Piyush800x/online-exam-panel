"use client";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import { useState, useEffect } from "react";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) { // Adjust this value if needed for mobile width
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    // Run the function on initial load
    handleResize();

    // Add event listener for resize
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
}, []);

if (isMobile) {
    return (
      <div className="fixed inset-0 z-100 flex items-center justify-center bg-black text-white text-center p-4">
        <div>
          <h1 className="text-2xl font-bold">Please open in desktop</h1>
          <p className="mt-2">This website is not optimized for mobile devices.</p>
        </div>
      </div>
    );
}

  return (
    <>
      <NavBar />
      <main className="">
        <Hero/>
      </main>
    </>
  );
}
