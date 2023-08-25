// Used in async function so that we can so animations of sorting, takes input time in ms (1000 = 1s)
const delayTime = (milisec) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("");
        }, milisec);
    });
};

module.exports = { delayTime };
