export function getQuickSortAnimations(array) {
    const animations = [];
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
  }
  
  function quickSortHelper(array, low, high, animations) {
    if (low < high) {
      const pi = partition(array, low, high, animations);
      quickSortHelper(array, low, pi - 1, animations);
      quickSortHelper(array, pi + 1, high, animations);
    }
  }
  
  function partition(array, low, high, animations) {
    let pivot = array[high];
    let i = low - 1;
  
    for (let j = low; j <= high - 1; j++) {
      animations.push({ type: "compare", indices: [j, high] });
  
      if (array[j] < pivot) {
        i++;
        animations.push({ type: "overwrite", indices: [i, j], values: [array[j], array[i]] });
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  
    animations.push({ type: "overwrite", indices: [i + 1, high], values: [array[high], array[i + 1]] });
    [array[i + 1], array[high]] = [array[high], array[i + 1]];
  
    return i + 1;
  }
  