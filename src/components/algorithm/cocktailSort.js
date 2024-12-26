export function getCocktailSortAnimations(array) {
    const animations = [];
    let start = 0;
    let end = array.length - 1;
    let swapped = true;
  
    while (swapped) {
      swapped = false;
  
      // Traverse the array from left to right
      for (let i = start; i < end; i++) {
        animations.push({ type: "compare", indices: [i, i + 1] });
  
        if (array[i] > array[i + 1]) {
          // Swap the elements if they are in the wrong order
          animations.push({ type: "overwrite", indices: [i, i + 1], values: [array[i + 1], array[i]] });
          [array[i], array[i + 1]] = [array[i + 1], array[i]];
          swapped = true;
        }
      }
  
      // If no elements were swapped, then the array is sorted
      if (!swapped) break;
  
      swapped = false;
      end--;
  
      // Traverse the array from right to left
      for (let i = end - 1; i >= start; i--) {
        animations.push({ type: "compare", indices: [i, i + 1] });
  
        if (array[i] > array[i + 1]) {
          // Swap the elements if they are in the wrong order
          animations.push({ type: "overwrite", indices: [i, i + 1], values: [array[i + 1], array[i]] });
          [array[i], array[i + 1]] = [array[i + 1], array[i]];
          swapped = true;
        }
      }
  
      start++;
    }
  
    return animations;
  }
  