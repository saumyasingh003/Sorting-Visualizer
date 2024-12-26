import React, { useState, useEffect } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import { Toaster } from 'react-hot-toast';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setIsLoading(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
     <Toaster position="top-right" reverseOrder={false} />
    <BrowserRouter>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center pl-[36rem]">
          <ThreeCircles
            visible={true}
            height="160"
            width="160"
            outerCircleColor="#4fa94d"
            innerCircleColor="#ff5733"
            middleCircleColor="#1e90ff"
            ariaLabel="three-circles-loading"
          />
          <p className="mt-6 text-4xl font-semibold text-gray-700">
            Sorting Visualizer...
          </p>
        </div>
      ) : (
        <div className="h-screen grid grid-cols-3">
          <div className="col-span-2">
            <Routes>
              <Route path="/" element={<Home />} />
              
            </Routes>
          </div>
        </div>
      )}
    </BrowserRouter>
    </>
  );
}

export default App;
