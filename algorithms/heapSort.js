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

const heapSortbtn = document.querySelector(".heapSort");
heapSortbtn.addEventListener("click", () => {
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
});
