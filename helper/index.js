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
