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

const quickSortbtn = document.querySelector(".quickSort");

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

if (quickSortbtn) {
    quickSortbtn.addEventListener("click", handleQuickSort);
}

module.exports = { quickSort };
