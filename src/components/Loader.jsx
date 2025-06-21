import React, { useEffect, useState } from 'react';

export default function Loader() {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHide(true), 1300); // kraći fadeout
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-[9999] flex items-center justify-center bg-black transition-all duration-1000 ease-in-out ${
        hide ? 'opacity-0 scale-110 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      <div className="relative flex items-center justify-center">
        <div className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-red-500 rounded-full animate-pulseRed relative">
          <div className="absolute inset-0 border-t-4 border-red-500 rounded-full animate-spin-slow" />
        </div>
      </div>
    </div>
  );
}
