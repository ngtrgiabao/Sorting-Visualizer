// Function to merge two subarrays within 'ele'
async function merge(ele, low, mid, high) {
    console.log("In merge()");
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
        ele[low + i].style.background = "orange";
        left[i] = ele[low + i].style.height;
    }

    // Populating the 'right' array
    for (let i = 0; i < n2; i++) {
        if (hasPressedStop) {
            return;
        }
        await delayTime(delay);
        ele[mid + 1 + i].style.background = "cyan";
        right[i] = ele[mid + 1 + i].style.height;
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

        if (parseInt(left[i]) <= parseInt(right[j])) {
            ele[k].style.background =
                n1 + n2 === ele.length ? "green" : "lightgreen";
            ele[k].style.height = left[i];
            i++;
            k++;
        } else {
            ele[k].style.background =
                n1 + n2 === ele.length ? "green" : "lightgreen";
            ele[k].style.height = right[j];
            j++;
            k++;
        }
    }

    // Copy the remaining elements from 'left' and 'right'
    while (i < n1) {
        if (hasPressedStop) {
            return;
        }
        await delayTime(delay);
        ele[k].style.background =
            n1 + n2 === ele.length ? "green" : "lightgreen";
        ele[k].style.height = left[i];
        i++;
        k++;
    }
    while (j < n2) {
        if (hasPressedStop) {
            return;
        }
        await delayTime(delay);
        ele[k].style.background =
            n1 + n2 === ele.length ? "green" : "lightgreen";
        ele[k].style.height = right[j];
        j++;
        k++;
    }
}

// Recursive function to perform merge sort on 'ele'
async function mergeSort(ele, l, r) {
    if (l >= r) {
        // Base case: sorting complete
        return;
    }
    const m = l + Math.floor((r - l) / 2);
    await mergeSort(ele, l, m);
    await mergeSort(ele, m + 1, r);
    await merge(ele, l, m, r);
}

// Event listener for the merge sort button
const mergeSortbtn = document.querySelector(".mergeSort");
mergeSortbtn.addEventListener("click", () => {
    let ele = document.querySelectorAll(".bar");
    let l = 0;
    let r = parseInt(ele.length) - 1;

    // Disable UI elements during sorting
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();

    // Call the async function within a regular function
    performMergeSort(ele, l, r);
});

async function performMergeSort(ele, l, r) {
    await mergeSort(ele, l, r);

    if (hasPressedStop) {
        disableSpeedSlider();
    } else {
        enableSortingBtn();
        enableSizeSlider();
    }
    enableNewArrayBtn();
    disableStopSortingBtn();
}
