export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return [];
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;

  while (i <= middleIdx && j <= endIdx) {
    // Comparison animation
    animations.push({ type: "compare", indices: [i, j] });
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // Overwrite value in main array
      animations.push({ type: "overwrite", index: k, value: auxiliaryArray[i] });
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      animations.push({ type: "overwrite", index: k, value: auxiliaryArray[j] });
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    animations.push({ type: "compare", indices: [i, i] });
    animations.push({ type: "overwrite", index: k, value: auxiliaryArray[i] });
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    animations.push({ type: "compare", indices: [j, j] });
    animations.push({ type: "overwrite", index: k, value: auxiliaryArray[j] });
    mainArray[k++] = auxiliaryArray[j++];
  }
}
