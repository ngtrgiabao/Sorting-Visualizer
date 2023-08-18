async function partitionLomuto(ele, l, r) {
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
    for (let k = 0; k < ele.length; k++) {
        if (ele[k].style.background !== "green") {
            ele[k].style.background = "#e43f5a";
        }
    }

    return i; // Return the pivot index
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

const quickSortbtn = document.querySelector(".quickSort");
quickSortbtn.addEventListener("click", async function () {
    let ele = document.querySelectorAll(".bar");
    let l = 0;
    let r = ele.length - 1;

    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();

    // Perform Quick Sort and handle UI updates
    await quickSort(ele, l, r);

    if (hasPressedStop) {
        disableSpeedSlider();
    } else {
        enableSortingBtn();
        enableSizeSlider();
    }
    enableNewArrayBtn();
    disableStopSortingBtn();
});
