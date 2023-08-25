(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// Creating barArray to store randomly generated numbers
let barArray = [];

// To create new barArray input size of barArray
const createNewArray = (noOfBars = 60) => {
    // calling helper function to delete old bars from dom
    deleteChild();

    // creating an barArray of random numbers
    barArray = [];
    for (let i = 0; i < noOfBars; i++) {
        barArray.push(Math.floor(Math.random() * 251));
    }
    // console.log(barArray);

    const bars = document.querySelector("#sorting");

    // create multiple element div using loop and adding class 'bar col'
    for (let i = 0; i < noOfBars; i++) {
        const bar = document.createElement("div");
        bar.style.height = `${barArray[i] * 2}px`;
        bar.classList.add("bar");
        bar.classList.add("flex-item");
        bar.classList.add(`barNo${i}`);
        if (bars) {
            bars.appendChild(bar);
        }
    }
};

// Helper function to delete all the previous bars so that new can be added
const deleteChild = () => {
    const bar = document.querySelector("#sorting");
    if (bar) {
        bar.innerHTML = "";
    }
};

module.exports = { createNewArray, deleteChild };

},{}],2:[function(require,module,exports){
// Disables sorting buttons used in conjunction with enable, so that we can disable during sorting and enable buttons after it
const disableSortingBtn = () => {
    if (
        document.querySelector(".bubbleSort") ||
        document.querySelector(".insertionSort") ||
        document.querySelector(".mergeSort") ||
        document.querySelector(".quickSort") ||
        document.querySelector(".selectionSort") ||
        document.querySelector(".heapSort")
    ) {
        document.querySelector(".bubbleSort").disabled = true;
        document.querySelector(".insertionSort").disabled = true;
        document.querySelector(".mergeSort").disabled = true;
        document.querySelector(".quickSort").disabled = true;
        document.querySelector(".selectionSort").disabled = true;
        document.querySelector(".heapSort").disabled = true;
    }
};

// Enables sorting buttons used in conjunction with disable
const enableSortingBtn = () => {
    if (
        document.querySelector(".bubbleSort") ||
        document.querySelector(".insertionSort") ||
        document.querySelector(".mergeSort") ||
        document.querySelector(".quickSort") ||
        document.querySelector(".selectionSort") ||
        document.querySelector(".heapSort")
    ) {
        document.querySelector(".bubbleSort").disabled = false;
        document.querySelector(".insertionSort").disabled = false;
        document.querySelector(".mergeSort").disabled = false;
        document.querySelector(".quickSort").disabled = false;
        document.querySelector(".selectionSort").disabled = false;
        document.querySelector(".heapSort").disabled = false;
    }
};

// Disables size slider used in conjunction with enable, so that we can disable during sorting and enable buttons after it
const disableSizeSlider = () => {
    if (document.querySelector("#size_input")) {
        document.querySelector("#size_input").disabled = true;
    }
};

const disableSpeedSlider = () => {
    if (document.querySelector("#speed_input")) {
        document.querySelector("#speed_input").disabled = true;
    }
};

const enableSpeedSlider = () => {
    if (document.querySelector("#speed_input")) {
        document.querySelector("#speed_input").disabled = false;
    }
};

// Enables size slider used in conjunction with disable
const enableSizeSlider = () => {
    if (document.querySelector("#size_input")) {
        document.querySelector("#size_input").disabled = false;
    }
};

// Disables newArray buttons used in conjunction with enable, so that we can disable during sorting and enable buttons after it
const disableNewArrayBtn = () => {
    if (document.querySelector(".new")) {
        document.querySelector(".new").disabled = true;
    }
};

const enableNewArrayBtn = () => {
    if (document.querySelector(".new")) {
        document.querySelector(".new").disabled = false;
    }
};

const enableStopSortingBtn = () => {
    if (document.querySelector(".stop")) {
        document.querySelector(".stop").disabled = false;
    }
};

const disableStopSortingBtn = () => {
    if (document.querySelector(".stop")) {
        document.querySelector(".stop").disabled = true;
    }
};

module.exports = {
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
};

},{}],3:[function(require,module,exports){
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

const ele = document.querySelectorAll(".bar");
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
async function merge(arr, low, mid, high) {
    const n1 = mid - low + 1;
    const n2 = high - mid;
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
async function mergeSort(arr, l, r) {
    if (l >= r) {
        // Base case: sorting complete
        return;
    }
    const m = l + Math.floor((r - l) / 2);
    await mergeSort(arr, l, m);
    await mergeSort(arr, m + 1, r);
    await merge(arr, l, m, r);
}
// Function to enable UI elements after sorting is done
async function performMergeSort(arr, l, r) {
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

},{"./controllers":1,"./helper":2,"./utils":6}],4:[function(require,module,exports){
const bubSortbtn = document.querySelector(".bubbleSort");
const newArrayButton = document.querySelector(".new");
const stopSortingButton = document.querySelector(".stop");
const heapSortbtn = document.querySelector(".heapSort");
const inSortbtn = document.querySelector(".insertionSort");
const mergeSortbtn = document.querySelector(".mergeSort");
const quickSortbtn = document.querySelector(".quickSort");
const selectionSortbtn = document.querySelector(".selectionSort");

const btn = {
    bubSortbtn,
    newArrayButton,
    stopSortingButton,
    heapSortbtn,
    inSortbtn,
    mergeSortbtn,
    quickSortbtn,
    selectionSortbtn,
};

module.exports = {
    btn,
};

},{}],5:[function(require,module,exports){
// Used in async function so that we can so animations of sorting, takes input time in ms (1000 = 1s)
const delayTime = (milisec) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("");
        }, milisec);
    });
};

module.exports = { delayTime };

},{}],6:[function(require,module,exports){
let { delayTime } = require("./delayTimeUtils");
let { swap } = require("./swapUtils");
const { btn } = require("./btnUtils");

module.exports = {
    delayTime,
    swap,
    btn,
};

},{"./btnUtils":4,"./delayTimeUtils":5,"./swapUtils":7}],7:[function(require,module,exports){
// swap function util for sorting algorithms takes input of 2 DOM elements with .style.height feature
/**
 * Swaps the heights of two DOM elements.
 *
 * @param {HTMLElement} el1 - The first DOM element.
 * @param {HTMLElement} el2 - The second DOM element.
 */

const swap = (el1, el2) => {
    let temp = el1.style.height; //third variable for swapping
    el1.style.height = el2.style.height;
    el2.style.height = temp;
};

module.exports = { swap };

},{}]},{},[3]);
