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
