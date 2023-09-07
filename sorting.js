let { delayTime, swap, btn } = require("./utils");
const {
    disableSortingBtn,
    enableSortingBtn,
    disableSizeSlider,
    disableSpeedSlider,
    enableSpeedSlider,
    enableSizeSlider,
    disableNewArrayBtn,
    enableNewArrayBtn,
    enableStopSortingBtn,
    disableStopSortingBtn,
} = require("./helper");
const { createNewArray } = require("./controllers");

let delay = 260;
let arraySize = document.querySelector("#size_input");
let hasPressedStop = false;

// Call to display bars right when you visit the site
createNewArray();

let delayElement = document.querySelector("#speed_input");

// Event listener to update the bars on the UI
if (arraySize) {
    arraySize.addEventListener("input", function () {
        // console.log(arraySize.value, typeof arraySize.value);
        createNewArray(parseInt(arraySize.value));
    });
}

// Event listener to update delay time
if (delayElement) {
    delayElement.addEventListener("input", function () {
        // console.log(delayElement.value, typeof delayElement.value);
        delay = 320 - parseInt(delayElement.value);
    });
}

// Selecting newarray button from DOM and adding eventlistener
if (btn.newArrayButton) {
    btn.newArrayButton.addEventListener("click", function () {
        hasPressedStop = false;
        enableSpeedSlider();
        console.log("From newArray " + arraySize.value);
        console.log("From newArray " + delay);
        enableSortingBtn();
        enableSizeSlider();
        createNewArray(arraySize.value);
    });
}

if (btn.stopSortingButton) {
    btn.stopSortingButton.addEventListener("click", function () {
        disableSortingBtn();
        disableSizeSlider();
        hasPressedStop = true;
    });
}

// ------------------HEAP SORT-------------------------
/**
 * @param {NodeListOf<Element>} arr
 * @param {int} n
 * @param {int} i
 */
async function heapify(arr, n, i) {
    let largest = i;
    const l = 2 * i + 1;
    const r = 2 * i + 2;

    // Compare with left child
    if (
        l < n &&
        parseInt(arr[l].style.height) > parseInt(arr[largest].style.height)
    ) {
        largest = l;
    }

    // Compare with right child
    if (
        r < n &&
        parseInt(arr[r].style.height) > parseInt(arr[largest].style.height)
    ) {
        largest = r;
    }

    // If the largest is not the root
    if (largest !== i) {
        // Swap elements
        swap(arr[i], arr[largest]);

        // Recursively heapify the affected sub-tree
        await heapify(arr, n, largest);
    }
}

/**
 * @param {NodeListOf<Element>} arr
 * @param {int} n
 */
async function heapSort(arr, n) {
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        if (hasPressedStop) {
            return;
        }
        await heapify(arr, n, i);
    }

    // Extract elements from the heap one by one
    for (let i = n - 1; i > 0; i--) {
        if (hasPressedStop) {
            return;
        }
        // Swap root with the last element
        swap(arr[0], arr[i]);
        arr[i].style.background = "green";
        await delayTime(delay);

        // Heapify the reduced heap
        await heapify(arr, i, 0);
    }
}

// ------------------INSERTION SORT-------------------------
/**
 * @param {NodeListOf<Element>} ele
 */
async function insertion(ele) {
    ele[0].style.background = "green";

    for (let i = 1; i < ele.length; i++) {
        if (hasPressedStop) {
            return;
        }

        let j = i - 1;
        let key = ele[i].style.height;
        ele[i].style.background = "blue";

        await delayTime(delay);

        if (hasPressedStop) {
            return;
        }

        while (j >= 0 && parseInt(ele[j].style.height) > parseInt(key)) {
            if (hasPressedStop) {
                return;
            }

            ele[j].style.background = "blue";
            ele[j + 1].style.height = ele[j].style.height;
            j--;

            await delayTime(delay);

            if (hasPressedStop) {
                return;
            }

            // Reset color for visualization
            for (let k = i; k >= 0; k--) {
                ele[k].style.background = "green";
            }
        }

        ele[j + 1].style.height = key;
        ele[i].style.background = "green";
    }
}

// ------------------MERGE SORT-------------------------
// Function to merge two subarrays within 'ele'
// This function is responsible for merging two subarrays within the main array during the merge sort process. It also visualizes the merging process by changing the background color of elements.

/**
 * @param {NodeListOf<Element>} arr
 * @param {int} low
 * @param {int} mid
 * @param {int} high
 * represent the indices that define the two subarrays to be merged.
 */
async function merge(arr, low, mid, high) {
    // calculates the number of elements in the left subarray
    const n1 = mid - low + 1;
    //  calculates the number of elements in the right subarray
    const n2 = high - mid;

    // created to store the elements of the subarrays.
    let left = new Array(n1);
    let right = new Array(n2);

    // Populating the 'left' array
    for (let i = 0; i < n1; i++) {
        if (hasPressedStop) {
            return;
        }
        await delayTime(delay);
        arr[low + i].style.background = "orange";
        left[i] = arr[low + i].style.height;
    }

    // Populating the 'right' array
    for (let i = 0; i < n2; i++) {
        if (hasPressedStop) {
            return;
        }
        await delayTime(delay);
        arr[mid + 1 + i].style.background = "cyan";
        right[i] = arr[mid + 1 + i].style.height;
    }

    await delayTime(delay);
    let i = 0,
        j = 0,
        k = low;

    // Merging the two arrays
    while (i < n1 && j < n2) {
        if (hasPressedStop) {
            return;
        }
        await delayTime(delay);

        // Comparing elements and updating styles
        if (parseInt(left[i]) <= parseInt(right[j])) {
            arr[k].style.background =
                n1 + n2 === arr.length ? "green" : "lightgreen";
            arr[k].style.height = left[i];
            i++;
        } else {
            arr[k].style.background =
                n1 + n2 === arr.length ? "green" : "lightgreen";
            arr[k].style.height = right[j];
            j++;
        }
        k++;
    }

    // Copy the remaining elements from 'left' and 'right'
    while (i < n1) {
        if (hasPressedStop) {
            return;
        }
        await delayTime(delay);
        arr[k].style.background =
            n1 + n2 === arr.length ? "green" : "lightgreen";
        arr[k].style.height = left[i];
        i++;
        k++;
    }
    while (j < n2) {
        if (hasPressedStop) {
            return;
        }
        await delayTime(delay);
        arr[k].style.background =
            n1 + n2 === arr.length ? "green" : "lightgreen";
        arr[k].style.height = right[j];
        j++;
        k++;
    }
}

// Recursive function to perform merge sort on 'ele'
// The function recursively divides the array into smaller subarrays until it reaches the base case (when the subarray size is 1 or 0).
/**
 * @param {NodeListOf<Element>} arr
 * @param {int} l
 * @param {int} r
 */
async function mergeSort(arr, l, r) {
    // l and r represent the left and right boundaries of the subarray to be sorted.
    if (l >= r) {
        // Base case: sorting complete
        return;
    }
    const m = l + Math.floor((r - l) / 2);
    await mergeSort(arr, l, m);
    await mergeSort(arr, m + 1, r);
    await merge(arr, l, m, r);
}

/**
 * @param {NodeListOf<Element>} arr
 * @param {int} l
 * @param {int} r
 */
// Function to enable UI elements after sorting is done
async function performMergeSort(arr, l, r) {
    // track whether the user has stopped the sorting process.
    let hasPressedStop = false;
    await mergeSort(arr, l, r);

    if (hasPressedStop) {
        disableSpeedSlider();
    } else {
        enableSortingBtn();
        enableSizeSlider();
    }

    enableNewArrayBtn();
    disableStopSortingBtn();
}

// ------------------QUICK SORT-------------------------

/**
 *
 * @param {NodeListOf<Element>} ele
 * @param {int} l
 * @param {int} r
 */
async function partitionLomuto(ele, l, r) {
    if (ele) {
        let i = l - 1;
        ele[r].style.background = "cyan"; // Pivot

        for (let j = l; j <= r - 1; j++) {
            if (hasPressedStop) {
                return;
            }

            ele[j].style.background = "yellow"; // Current element
            await delayTime(delay);

            if (hasPressedStop) {
                return;
            }

            const currentHeight = parseInt(ele[j].style.height);
            const pivotHeight = parseInt(ele[r].style.height);

            if (currentHeight < pivotHeight) {
                i++;
                swap(ele[i], ele[j]);

                // Color
                ele[i].style.background = "orange";
                if (i !== j) ele[j].style.background = "orange";

                await delayTime(delay);
            } else {
                // Color if not less than pivot
                ele[j].style.background = "pink";
            }
        }

        i++;
        await delayTime(delay);

        // Swap pivot element into its correct position
        swap(ele[i], ele[r]);

        // Color
        ele[r].style.background = "pink";
        ele[i].style.background = "green";

        await delayTime(delay);

        // Reset colors
        for (const element of ele) {
            if (element.style.background !== "green") {
                element.style.background = "#e43f5a";
            }
        }

        return i; // Return the pivot index
    }
}

/**
 *
 * @param {NodeListOf<Element>} ele
 * @param {int} l
 * @param {int} r
 */
async function quickSort(ele, l, r) {
    if (l < r) {
        let pivotIndex = await partitionLomuto(ele, l, r);
        await Promise.all([
            quickSort(ele, l, pivotIndex - 1),
            quickSort(ele, pivotIndex + 1, r),
        ]);
    } else {
        // Highlight the already sorted segments
        if (l >= 0 && r >= 0 && l < ele.length && r < ele.length) {
            ele[r].style.background = "green";
            ele[l].style.background = "green";
        }
    }
}

// ------------------BUBBLE SORT-------------------------

/**
 *
 * @param {NodeListOf<Element>} ele
 */
async function bubble(ele) {
    if (!ele) return;

    for (let i = 0; i < ele.length - 1; i++) {
        for (let j = 0; j < ele.length - i - 1; j++) {
            if (hasPressedStop === true) {
                return; // Exit early if the stop button is pressed
            }

            ele[j].style.background = "cyan";
            ele[j + 1].style.background = "cyan";

            if (
                parseInt(ele[j].style.height) >
                parseInt(ele[j + 1].style.height)
            ) {
                await delayTime(delay);
                swap(ele[j], ele[j + 1]);
            }

            ele[j].style.background = "#e43f5a";
            ele[j + 1].style.background = "#e43f5a";
        }
        ele[ele.length - 1 - i].style.background = "green";
    }

    ele[0].style.background = "green";
}

// ------------------SELECTION SORT-------------------------
/**
 *
 * @param {NodeListOf<Element>} ele
 */
async function selection(ele) {
    for (let i = 0; i < ele.length; i++) {
        if (hasPressedStop == true) {
            return;
        }
        let min_index = i;
        // Change color of the bar being compared
        ele[i].style.background = "lightgreen";
        for (let j = i + 1; j < ele.length; j++) {
            if (hasPressedStop == true) {
                return;
            }
            // Change color of current bar
            ele[j].style.background = "cyan";

            await delayTime(delay);
            if (hasPressedStop == true) {
                return;
            }
            if (
                parseInt(ele[j].style.height) <
                parseInt(ele[min_index].style.height)
            ) {
                if (min_index !== i) {
                    // new min_index is found so change prev min_index color back to normal
                    ele[min_index].style.background = "#e43f5a";
                }
                min_index = j;
            } else {
                // if the currnent comparision is more than min_index change is back to normal
                ele[j].style.background = "#e43f5a";
            }
        }
        await delayTime(delay);
        if (hasPressedStop == true) {
            return;
        }
        swap(ele[min_index], ele[i]);
        // change the min element index back to normal as it is swapped
        ele[min_index].style.background = "#e43f5a";
        // change the sorted elements color to green
        ele[i].style.background = "green";
    }
}

const handleHeapSort = () => {
    let arr = document.querySelectorAll(".bar");
    let n = arr.length;

    let hasPressedStop = false;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();

    // Perform Heap Sort and handle the promise
    heapSort(arr, n)
        .then(() => {
            arr[0].style.background = "green";
            if (hasPressedStop) {
                disableSpeedSlider();
            } else {
                enableSortingBtn();
                enableSizeSlider();
            }
            enableNewArrayBtn();
            disableStopSortingBtn();
        })
        .catch((error) => {
            console.error("An error occurred during sorting:", error);
            // Handle the error condition if needed
        });
};
const handleInsertion = () => {
    const ele = document.querySelectorAll(".bar");

    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();

    // Perform Insertion Sort and handle UI updates
    insertion(ele)
        .then(() => {
            if (hasPressedStop) {
                disableSpeedSlider();
            } else {
                enableSortingBtn();
                enableSizeSlider();
            }
            enableNewArrayBtn();
            disableStopSortingBtn();
        })
        .catch((error) => {
            console.error("An error occurred during sorting:", error);
            // Handle the error condition if needed
        });
};
const handleSelection = () => {
    const ele = document.querySelectorAll(".bar");
    hasPressedStop = false;

    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();

    selection(ele)
        .then(() => {
            if (hasPressedStop) {
                disableSpeedSlider();
            } else {
                enableSortingBtn();
                enableSizeSlider();
            }
            enableNewArrayBtn();
            disableStopSortingBtn();
        })
        .catch((error) => {
            // Handle any errors that might occur during the sorting process
            console.error("An error occurred:", error);
            // Additional error handling logic if needed
        });
};
const handleMergeSort = () => {
    // It retrieves the array elements from the DOM.
    let arr = document.querySelectorAll(".bar");
    let l = 0;
    let r = parseInt(arr.length) - 1;

    // Disable UI elements during sorting
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();

    // Call the async function within a regular function
    if (arr) {
        performMergeSort(arr, l, r);
    }
};
const handleQuickSort = () => {
    const ele = document.querySelectorAll(".bar");
    const l = 0;
    const r = ele.length - 1;
    let hasPressedStop = false;

    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();

    // Perform Quick Sort and handle UI updates
    quickSort(ele, l, r)
        .then(() => {
            if (hasPressedStop) {
                disableSpeedSlider();
            } else {
                enableSortingBtn();
                enableSizeSlider();
            }
            enableNewArrayBtn();
            disableStopSortingBtn();
        })
        .catch((error) => {
            console.error("An error occurred during sorting:", error);
        });
};
const handleBubbleSort = async () => {
    const ele = document.querySelectorAll(".bar");
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();

    try {
        await bubble(ele);
        if (hasPressedStop) {
            disableSpeedSlider();
            disableStopSortingBtn();
        } else {
            enableSortingBtn();
            enableSizeSlider();
        }
        enableNewArrayBtn();
        disableStopSortingBtn();
    } catch (error) {
        console.error("An error occurred during sorting:", error);
        // Handle error
    }
};

if (btn.inSortbtn) {
    btn.inSortbtn.addEventListener("click", handleInsertion);
}
if (btn.heapSortbtn) {
    btn.heapSortbtn.addEventListener("click", handleHeapSort);
}
if (btn.bubSortbtn) {
    btn.bubSortbtn.addEventListener("click", handleBubbleSort);
}
if (btn.mergeSortbtn) {
    btn.mergeSortbtn.addEventListener("click", handleMergeSort);
}
if (btn.quickSortbtn) {
    btn.quickSortbtn.addEventListener("click", handleQuickSort);
}
if (btn.selectionSortbtn) {
    btn.selectionSortbtn.addEventListener("click", handleSelection);
}

module.exports = {
    bubble,
    quickSort,
    handleMergeSort,
    heapSort,
    selection,
    insertion,
    performMergeSort,
};
