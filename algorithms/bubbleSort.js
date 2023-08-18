
async function bubble() {
    const ele = document.querySelectorAll(".bar");

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

const bubSortbtn = document.querySelector(".bubbleSort");

const handleBubbleSort = () => {
    hasPressedStop = false;
    disableSortingBtn();
    disableSizeSlider();
    disableNewArrayBtn();
    enableStopSortingBtn();

    // Perform Bubble Sort and handle UI updates
    bubble()
        .then(() => {
            if (hasPressedStop === true) {
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

bubSortbtn.addEventListener("click", handleBubbleSort);
