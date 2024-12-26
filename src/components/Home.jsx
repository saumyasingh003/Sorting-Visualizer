import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import Sidebar from "./Sidebar";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels // Register the plugin
);

const Home = () => {
  const generateRandomData = (size) => {
    return Array.from(
      { length: size },
      () => Math.floor(Math.random() * 100) + 1
    );
  };

  const chartRef = useRef(null);
  const [algorithm, setAlgorithm] = useState("Bubble Sort (Default)");
  const [speed, setSpeed] = useState("Fast");
  const [localArraySize, setLocalArraySize] = useState(15);
  const [colorBar, setColorBar] = useState("Blue");
  const [comparisonColor, setComparisonColor] = useState("Red");
  const [sortedColor, setSortedColor] = useState("Green");
  const [barData, setBarData] = useState(generateRandomData(localArraySize));

  const randomizeArray = () => {
    const newData = generateRandomData(localArraySize);
    setBarData(newData);
  };

  useEffect(() => {
    setBarData(generateRandomData(localArraySize));
  }, [localArraySize]);

  const data = {
    labels: Array.from({ length: localArraySize }, (_, i) => `Bar ${i + 1}`),
    datasets: [
      {
        label: "Array Values",
        data: barData,
        backgroundColor: colorBar,
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          display: false, // Hide x-axis labels
        },
      },
      y: {
        ticks: {
          display: false, // Hide y-axis labels
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled:true, 
      },
      datalabels: {
        anchor: "end", 
        align: "end",
        color: "black",
        font: {
          size: 14,
          weight: "bold",
        },
        formatter: (value) => value, // Display the value of each bar
      },
    },
  };

  const getSpeedInMs = (speed) => {
    switch (speed) {
      case "Slow":
        return 500;
      case "Medium":
        return 200;
      case "Fast":
        return 50;
      default:
        return 200;
    }
  };

  useEffect(() => {
    if (chartRef.current) {
      console.log("Chart instance is available:", chartRef.current);
    }
  }, [chartRef.current]);

  return (
    <div className="flex">
      <Sidebar
        algorithm={algorithm}
        setAlgorithm={setAlgorithm}
        speed={speed}
        setSpeed={setSpeed}
        localArraySize={localArraySize}
        handleArraySizeChange={(e) => setLocalArraySize(Number(e.target.value))}
        colorBar={colorBar}
        setColorBar={setColorBar}
        comparisonColor={comparisonColor}
        setComparisonColor={setComparisonColor}
        sortedColor={sortedColor}
        setSortedColor={setSortedColor}
        randomizeArray={randomizeArray}
        barData={barData}
        setBarData={setBarData}
        chartInstance={chartRef.current} 
      />

      {/* Horizontal Bar Graph */}
      <div className="flex-1 p-6">
        <h2 className="text-center text-5xl font-bold mb-4">{algorithm}</h2>
        <div className="w-full h-full">
          <canvas role="img" width={890} height={70} />
          <Bar ref={chartRef} data={data} options={options} />
      <p className="text-center fond-bold text-xl pt-10">Made with ❤️ by Saumya Singh </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
