export function getBubbleSortAnimations(array) {
    const animations = [];
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
            animations.push({ type: "compare", indices: [j, j + 1] });

            if (array[j] > array[j + 1]) {
                // Swap animation
                animations.push({
                    type: "overwrite",
                    indices: [j, j + 1],
                    values: [array[j + 1], array[j]]
                });
                // Swap in the array
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
        }
    }
    return animations;
}
