import React from "react";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import {toast} from "react-hot-toast";

import { getMergeSortAnimations } from "./algorithm/mergesort.js";
import { getBubbleSortAnimations } from "./algorithm/bubbleSort.js";
import { getCocktailSortAnimations } from "./algorithm/cocktailSort.js";
import { getHeapSortAnimations } from "./algorithm/heapSort.js";
import { getInsertionSortAnimations } from "./algorithm/insertionSort.js";
import { getSelectionSortAnimations } from "./algorithm/selectionSort.js";
import { getQuickSortAnimations } from "./algorithm/quickSort.js";


const Sidebar = ({
  randomizeArray,
  algorithm,
  setAlgorithm,
  speed,
  setSpeed,
  localArraySize,
  handleArraySizeChange,
  colorBar,
  setColorBar,
  comparisonColor,
  setComparisonColor,
  sortedColor,
  setSortedColor,
  barData,
  setBarData,
  chartInstance,
}) => {
  const sortFunctions = {
    "Bubble Sort (Default)": () => bubbleSort(),
    "Cocktail Sort": () => cocktailSort(),
    "Heap Sort": () => heapSort(),
    "Insertion Sort": () => insertionSort(),
    "Merge Sort": () => mergeSort(),
    "Quick Sort": () => quickSort(),
    "Selection Sort": () => selectionSort(),
  };


  const showSortCompletionToast = (algorithmName) => {
    toast(` Boom! ${algorithmName} just crushed the sorting game!`, {
      icon: '👏',
      style: {
        fontSize: '16px', // Adjust the font size
        padding: '20px', // Increase padding for a larger appearance
        borderRadius: '8px', // Add rounded corners
        minWidth: '300px', // Set a minimum width for the toast
      },
    });
  };


  const bubbleSort = async () => {
    console.log("Starting Bubble Sort...");

    if (!barData || !Array.isArray(barData)) {
        console.error("Invalid data for sorting");
        return;
    }

    const barDataCopy = [...barData];
    const animations = getBubbleSortAnimations(barDataCopy);

    const backgroundColors = new Array(barDataCopy.length).fill(colorBar);

    chartInstance.data.datasets[0].backgroundColor = backgroundColors;

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    for (const animation of animations) {
        const { type, indices, values } = animation;

        if (type === "compare") {
            const [i, j] = indices;

            backgroundColors[i] = comparisonColor;
            backgroundColors[j] = comparisonColor;

            chartInstance.data.datasets[0].backgroundColor = backgroundColors;
            chartInstance.update();
            await delay(getDelayFromSpeed(speed));

            // Reset color after comparison
            backgroundColors[i] = colorBar;
            backgroundColors[j] = colorBar;
        } else if (type === "overwrite") {
            const [i, j] = indices;
            barDataCopy[i] = values[0];
            barDataCopy[j] = values[1];

            // Update the dataset with the new values
            chartInstance.data.datasets[0].data[i] = values[0];
            chartInstance.data.datasets[0].data[j] = values[1];

            // Update the colors to show sorted state
            backgroundColors[i] = sortedColor;
            backgroundColors[j] = sortedColor;
        }

        // Update chart
        chartInstance.data.datasets[0].backgroundColor = backgroundColors;
        chartInstance.update();
        await delay(getDelayFromSpeed(speed));
    }

    // After the sort is complete, mark all bars as sorted
    for (let i = 0; i < barDataCopy.length; i++) {
        backgroundColors[i] = sortedColor;
    }
    chartInstance.data.datasets[0].backgroundColor = backgroundColors;
    chartInstance.update();

    setBarData([...barDataCopy]);
    setColorBar(sortedColor);

    console.log("Bubble Sort completed.");
    showSortCompletionToast('Bubble Sort');
};

  
  const selectionSort = async () => {
    console.log("Starting Selection Sort...");
  
    if (!barData || !Array.isArray(barData)) {
      console.error("Invalid data for sorting");
      return;
    }
  
    const barDataCopy = [...barData];
    const animations = getSelectionSortAnimations(barDataCopy);
  
    const backgroundColors = new Array(barDataCopy.length).fill(colorBar);
  
    chartInstance.data.datasets[0].backgroundColor = backgroundColors;
  
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
    for (const animation of animations) {
      const { type, indices, values } = animation;
  
      if (type === "compare") {
        const [i, j] = indices;
        backgroundColors[i] = comparisonColor;
        backgroundColors[j] = comparisonColor;
        chartInstance.data.datasets[0].backgroundColor = backgroundColors;
        chartInstance.update();
        await delay(getDelayFromSpeed(speed));
  
        backgroundColors[i] = colorBar;
        backgroundColors[j] = colorBar;
      } else if (type === "overwrite") {
        const [i, j] = indices;
        barDataCopy[i] = values[0];
        barDataCopy[j] = values[1];

        // Update the dataset with the new values
        chartInstance.data.datasets[0].data[i] = values[0];
        chartInstance.data.datasets[0].data[j] = values[1];

        // Update the colors to show sorted state
        backgroundColors[i] = sortedColor;
        backgroundColors[j] = sortedColor;
    }

  
      chartInstance.data.datasets[0].backgroundColor = backgroundColors;
      chartInstance.update();
      await delay(getDelayFromSpeed(speed));
    }
  
    for (let i = 0; i < barDataCopy.length; i++) {
      backgroundColors[i] = sortedColor;
    }
    chartInstance.data.datasets[0].backgroundColor = backgroundColors;
    chartInstance.update();
  
    setBarData([...barDataCopy]);
    setColorBar(sortedColor);
  
    console.log("Selection Sort completed.");
    showSortCompletionToast('Selection Sort');
  };
  
  
  const quickSort = async () => {
    console.log("Starting Quick Sort...");
  
    if (!barData || !Array.isArray(barData)) {
      console.error("Invalid data for sorting");
      return;
    }
  
    const barDataCopy = [...barData];
    const animations = getQuickSortAnimations(barDataCopy);
  
    const backgroundColors = new Array(barDataCopy.length).fill(colorBar);
  
    chartInstance.data.datasets[0].backgroundColor = backgroundColors;
  
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
    for (const animation of animations) {
      const { type, indices, values } = animation;
  
      if (type === "compare") {
        const [i, j] = indices;
        backgroundColors[i] = comparisonColor;
        backgroundColors[j] = comparisonColor;
        chartInstance.data.datasets[0].backgroundColor = backgroundColors;
        chartInstance.update();
        await delay(getDelayFromSpeed(speed));
  
        backgroundColors[i] = colorBar;
        backgroundColors[j] = colorBar;
      } else if (type === "overwrite") {
        const [i, j] = indices;
        barDataCopy[i] = values[0];
        barDataCopy[j] = values[1];

        // Update the dataset with the new values
        chartInstance.data.datasets[0].data[i] = values[0];
        chartInstance.data.datasets[0].data[j] = values[1];

        // Update the colors to show sorted state
        backgroundColors[i] = sortedColor;
        backgroundColors[j] = sortedColor;
    }

  
      chartInstance.data.datasets[0].backgroundColor = backgroundColors;
      chartInstance.update();
      await delay(getDelayFromSpeed(speed));
    }
  
    for (let i = 0; i < barDataCopy.length; i++) {
      backgroundColors[i] = sortedColor;
    }
    chartInstance.data.datasets[0].backgroundColor = backgroundColors;
    chartInstance.update();
  
    setBarData([...barDataCopy]);
    setColorBar(sortedColor);
  
    console.log("Quick Sort completed.");
    showSortCompletionToast('Quick Sort');
  };
  
  
  const heapSort = async () => {
    console.log("Starting Heap Sort...");
  
    if (!barData || !Array.isArray(barData)) {
      console.error("Invalid data for sorting");
      return;
    }
  
    // Copy the data for animation
    const barDataCopy = [...barData];
    const animations = getHeapSortAnimations(barDataCopy);
  
    const backgroundColors = new Array(barDataCopy.length).fill(colorBar);
    
    // Set initial background color
    chartInstance.data.datasets[0].backgroundColor = backgroundColors;
  
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
    // Loop through the animations
    for (const animation of animations) {
      const { type, indices, values } = animation;
  
      if (type === "compare") {
        // Highlight compared bars
        const [i, j] = indices;
        backgroundColors[i] = comparisonColor;
        backgroundColors[j] = comparisonColor;
        chartInstance.data.datasets[0].backgroundColor = backgroundColors;
        chartInstance.update();
        await delay(getDelayFromSpeed(speed));
  
        // Revert colors after comparison
        backgroundColors[i] = colorBar;
        backgroundColors[j] = colorBar;
      } else if (type === "overwrite") {
        // Update the bar data with the new values
        const [i, j] = indices;
        barDataCopy[i] = values[0];
        barDataCopy[j] = values[1];
  
        chartInstance.data.datasets[0].data[i] = values[0];
        chartInstance.data.datasets[0].data[j] = values[1];
  
        // Mark bars as sorted (overwrite)
        backgroundColors[i] = sortedColor;
        backgroundColors[j] = sortedColor;
      }
  
      // Update chart after each step
      chartInstance.data.datasets[0].backgroundColor = backgroundColors;
      chartInstance.update();
      await delay(getDelayFromSpeed(speed));
    }
  
    // Finalize sorted colors
    for (let i = 0; i < barDataCopy.length; i++) {
      backgroundColors[i] = sortedColor;
    }
    chartInstance.data.datasets[0].backgroundColor = backgroundColors;
    chartInstance.update();
  
    // Update the barData state
    setBarData([...barDataCopy]);
    setColorBar(sortedColor);
  
    console.log("Heap Sort completed.");
    showSortCompletionToast('Heap Sort');
  };
  
  
  const cocktailSort = async () => {
    console.log("Starting Cocktail Shaker Sort...");
  
    if (!barData || !Array.isArray(barData)) {
      console.error("Invalid data for sorting");
      return;
    }
  
    const barDataCopy = [...barData];
    const animations = getCocktailSortAnimations(barDataCopy);
  
    const backgroundColors = new Array(barDataCopy.length).fill(colorBar);
  
    chartInstance.data.datasets[0].backgroundColor = backgroundColors;
  
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
    for (const animation of animations) {
      const { type, indices, values } = animation;
  
      if (type === "compare") {
        const [i, j] = indices;
        backgroundColors[i] = comparisonColor;
        backgroundColors[j] = comparisonColor;
        chartInstance.data.datasets[0].backgroundColor = backgroundColors;
        chartInstance.update();
        await delay(getDelayFromSpeed(speed));
  
        backgroundColors[i] = colorBar;
        backgroundColors[j] = colorBar;
      } else if (type === "overwrite") {
        const [i, j] = indices;
        barDataCopy[i] = values[0];
        barDataCopy[j] = values[1];

        // Update the dataset with the new values
        chartInstance.data.datasets[0].data[i] = values[0];
        chartInstance.data.datasets[0].data[j] = values[1];

        // Update the colors to show sorted state
        backgroundColors[i] = sortedColor;
        backgroundColors[j] = sortedColor;
    }

      chartInstance.data.datasets[0].backgroundColor = backgroundColors;
      chartInstance.update();
      await delay(getDelayFromSpeed(speed));
    }
  
    for (let i = 0; i < barDataCopy.length; i++) {
      backgroundColors[i] = sortedColor;
    }
    chartInstance.data.datasets[0].backgroundColor = backgroundColors;
    chartInstance.update();
  
    setBarData([...barDataCopy]);
    setColorBar(sortedColor);
  
    console.log("Cocktail Shaker Sort completed.");
    showSortCompletionToast('Cocktail Sort');
  };
  

  const insertionSort = async () => {
    console.log("Starting Insertion Sort...");
  
    if (!barData || !Array.isArray(barData)) {
      console.error("Invalid data for sorting");
      return;
    }
  
    const barDataCopy = [...barData];
    const animations = getInsertionSortAnimations(barDataCopy);
  
    const backgroundColors = new Array(barDataCopy.length).fill(colorBar);
  
    chartInstance.data.datasets[0].backgroundColor = backgroundColors;
  
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
    for (const animation of animations) {
      const { type, indices, values } = animation;
  
      if (type === "compare") {
        const [i, j] = indices;
        backgroundColors[i] = comparisonColor;
        backgroundColors[j] = comparisonColor;
        chartInstance.data.datasets[0].backgroundColor = backgroundColors;
        chartInstance.update();
        await delay(getDelayFromSpeed(speed));
  
        backgroundColors[i] = colorBar;
        backgroundColors[j] = colorBar;
      }else if (type === "overwrite") {
        const [i, j] = indices;
        barDataCopy[i] = values[0];
        barDataCopy[j] = values[1];

        // Update the dataset with the new values
        chartInstance.data.datasets[0].data[i] = values[0];
        chartInstance.data.datasets[0].data[j] = values[1];

        // Update the colors to show sorted state
        backgroundColors[i] = sortedColor;
        backgroundColors[j] = sortedColor;
    }

      chartInstance.data.datasets[0].backgroundColor = backgroundColors;
      chartInstance.update();
      await delay(getDelayFromSpeed(speed));
    }
  
    for (let i = 0; i < barDataCopy.length; i++) {
      backgroundColors[i] = sortedColor;
    }
    chartInstance.data.datasets[0].backgroundColor = backgroundColors;
    chartInstance.update();
  
    setBarData([...barDataCopy]);
    setColorBar(sortedColor);
  
    console.log("Insertion Sort completed.");
    showSortCompletionToast('Insertion Sort');
  };
  
  const mergeSort = async () => {
    console.log("Starting Merge Sort...");
  
    if (!barData || !Array.isArray(barData)) {
      console.error("Invalid data for sorting");
      return;
    }
  
    // Copy the data for animation
    const barDataCopy = [...barData];
    const animations = getMergeSortAnimations(barDataCopy);

    const backgroundColors = new Array(barDataCopy.length).fill(colorBar);
  
    // Set initial background color
    chartInstance.data.datasets[0].backgroundColor = backgroundColors;
  
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
    for (const animation of animations) {
      const { type, indices, index, value } = animation;
  
      if (type === "compare") {
        // Highlight compared bars
        const [i, j] = indices;
        backgroundColors[i] = comparisonColor;
        backgroundColors[j] = comparisonColor;
        chartInstance.data.datasets[0].backgroundColor = backgroundColors;
        chartInstance.update();
        await delay(getDelayFromSpeed(speed));
  
        // Revert colors
        backgroundColors[i] = colorBar;
        backgroundColors[j] = colorBar;
      } else if (type === "overwrite") {
        // Update the bar data
        barDataCopy[index] = value;
        chartInstance.data.datasets[0].data[index] = value;
  
        // Mark bar as sorted
        backgroundColors[index] = sortedColor;
      }
  
      // Update chart after each step
      chartInstance.data.datasets[0].backgroundColor = backgroundColors;
      chartInstance.update();
      await delay(getDelayFromSpeed(speed));
    }
  
    // Finalize sorted colors
    for (let i = 0; i < barDataCopy.length; i++) {
      backgroundColors[i] = sortedColor;
    }
    chartInstance.data.datasets[0].backgroundColor = backgroundColors;
    chartInstance.update();
  
    // Update the barData state
    setBarData([...barDataCopy]);
    setColorBar(sortedColor);
  
    console.log("Merge Sort completed.");
    showSortCompletionToast('Merge Sort');
  };
  
  
  // Function to map speed to delay
  const getDelayFromSpeed = (speed) => {
    const speedMapping = {
      Slow: 500,
      Medium: 200,
      Fast: 50,
    };
    return speedMapping[speed];
  };



  const handleSpeedChange = async (e) => {
    const selectedSpeed = e.target.value;
    setSpeed(selectedSpeed);

    const speedMapping = {
      Slow: 500,
      Medium: 200,
      Fast: 50,
    };

    const delay = speedMapping[selectedSpeed];

    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      console.log(`Action executed after ${delay}ms delay!`);
    }
  };

  // Handler for the Sort button
  const handleSort = async () => {
    if (algorithm in sortFunctions) {
      await sortFunctions[algorithm]();
    } else {
      console.error("Selected algorithm not implemented.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="mt-4 mx-4 ">
        <div className="w-96 max-w-md bg-[#8EA604] text-white p-8 rounded-lg sidebar">
          <h1 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
            Sorting Visualizer
            <BsFillEmojiSmileFill className="ml-4 text-6xl" />
          </h1>

          <div className="space-y-6">
            <div className="flex flex-col items-center space-y-2">
              <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                className="w-full p-3 rounded bg-[#F5BB00] focus:outline-none shadow border border-gray-300"
              >
                <option disabled>Sorting Algorithm</option>
                {Object.keys(sortFunctions).map((alg, index) => (
                  <option key={index}>{alg}</option>
                ))}
              </select>
            </div>

            {/* Speed Dropdown */}
            <div className="flex flex-col items-center space-y-2">
              <select
                value={speed}
                onChange={handleSpeedChange}
                className="w-full p-3 rounded bg-[#F5BB00] focus:outline-none shadow border border-gray-300"
              >
                <option disabled>Speed</option>
                <option>Slow</option>
                <option>Medium</option>
                <option>Fast</option>
              </select>
            </div>

            {/* Array Size Dropdown */}
            <div className="flex flex-col items-center space-y-2">
              <select
                value={localArraySize}
                onChange={handleArraySizeChange}
                className="w-full p-3 rounded bg-[#F5BB00] focus:outline-none shadow border border-gray-300"
              >
                <option disabled>Array Size</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
              </select>
            </div>

            {/* Colors Dropdowns */}
            {[{ label: "Color of Bar", value: colorBar, setter: setColorBar },
              { label: "Color of Comparison", value: comparisonColor, setter: setComparisonColor },
              { label: "Sorted Array Color", value: sortedColor, setter: setSortedColor }].map((item, index) => (
                <div className="flex flex-col items-center space-y-2" key={index}>
                  <select
                    value={item.value}
                    onChange={(e) => item.setter(e.target.value)}
                    className="w-full p-3 rounded bg-[#F5BB00] focus:outline-none shadow border border-gray-300"
                  >
                    <option disabled>{item.label}</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Red">Red</option>
                  </select>
                </div>
              ))}

          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={randomizeArray}
              className="bg-[#BF3100] text-white py-2 px-4 rounded hover:bg-red-700"
            >
              Randomize Array
            </button>
            <button
              onClick={handleSort}
              className="bg-[#EC9F05] text-white py-2 px-6 rounded hover:bg-green-700"
            >
              Sort!
            </button>
          </div>

          <p className="text-center mt-4 text-sm text-gray-300">
            Feeling lazy? It's OK, just click Sort!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
