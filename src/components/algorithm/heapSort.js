export function getHeapSortAnimations(array) {
    const animations = [];
    const n = array.length;
  
    // Build the max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      heapify(array, n, i, animations);
    }
  
    // Extract elements from the heap
    for (let i = n - 1; i > 0; i--) {
      // Compare the root with the current element
      animations.push({ type: "compare", indices: [0, i] });
  
      // Overwrite the root with the last element
      animations.push({ type: "overwrite", indices: [0, i], values: [array[i], array[0]] });
      [array[0], array[i]] = [array[i], array[0]];
  
      // Restore the heap property
      heapify(array, i, 0, animations);
    }
  
    return animations;
  }
  
  function heapify(array, n, i, animations) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
  
    // Compare left child with largest
    if (left < n && array[left] > array[largest]) {
      animations.push({ type: "compare", indices: [largest, left] });
      largest = left;
    }
  
    // Compare right child with largest
    if (right < n && array[right] > array[largest]) {
      animations.push({ type: "compare", indices: [largest, right] });
      largest = right;
    }
  
    // If largest is not the root, swap the elements and heapify again
    if (largest !== i) {
      animations.push({ type: "compare", indices: [i, largest] });
      animations.push({ type: "overwrite", indices: [i, largest], values: [array[largest], array[i]] });
      [array[i], array[largest]] = [array[largest], array[i]];
      heapify(array, n, largest, animations);
    }
  }
  