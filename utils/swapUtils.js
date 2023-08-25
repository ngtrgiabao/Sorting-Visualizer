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
