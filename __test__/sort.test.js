const { bubble } = require("../algorithms/bubbleSort");
const { quickSort } = require("../algorithms/quickSort");
const { performMergeSort } = require("../algorithms/mergeSort");

const { TextEncoder, TextDecoder } = require("util");
Object.assign(global, { TextDecoder, TextEncoder });

const { JSDOM } = require("jsdom");

const { document } = new JSDOM("").window;
global.document = document;
global.window = document.defaultView;

describe("bubble sort function", () => {
    const bar1 = document.createElement("div");
    const bar2 = document.createElement("div");
    const bar3 = document.createElement("div");
    const bar4 = document.createElement("div");

    bar1.classList.add("bar");
    bar2.classList.add("bar");
    bar3.classList.add("bar");
    bar4.classList.add("bar");

    document.body.appendChild(bar1);
    document.body.appendChild(bar2);
    document.body.appendChild(bar3);
    document.body.appendChild(bar4);

    const ele = document.querySelectorAll(".bar");

    it("bubble sort element", async () => {
        await bubble(ele);

        // Assertions
        // expect(ele[0].style.background).toBe("green");
    });

    // it("quick sort element", async () => {
    //     await quickSort(ele, 0, ele.length - 1);

    //     // Assertions
    //     expect(ele[0].style.background).toBe("green");
    // });

    // it("merge sort element", async () => {
    //     await performMergeSort(ele, 0, parseInt(ele.length) - 1);

    //     expect(ele[0].style.background).toBe("green");
    // });
});
