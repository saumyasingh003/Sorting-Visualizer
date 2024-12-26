export function getSelectionSortAnimations(array) {
    const animations = [];
    const n = array.length;
  
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;
      for (let j = i + 1; j < n; j++) {
        animations.push({ type: "compare", indices: [minIdx, j] });
        
        if (array[j] < array[minIdx]) {
          minIdx = j;
        }
      }
  
      if (minIdx !== i) {
        animations.push({ type: "overwrite", indices: [i, minIdx], values: [array[minIdx], array[i]] });
        [array[i], array[minIdx]] = [array[minIdx], array[i]];
      }
    }
    return animations;
  }
  