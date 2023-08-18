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

// Event listener for the merge sort button
const mergeSortbtn = document.querySelector(".mergeSort");
mergeSortbtn.addEventListener("click", () => {
    let arr = document.querySelectorAll(".bar");
    let l = 0;
    let r = parseInt(arr.length) - 1;

    // Disable UI elements during sorting
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();

    // Call the async function within a regular function
    performMergeSort(arr, l, r);
});

// Function to enable UI elements after sorting is done
async function performMergeSort(arr, l, r) {
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
