const { parentPort, workerData } = require('worker_threads');
const fs = require('fs');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function run() {
    for (let i = 0; i < 21; i++) {
        if (i % 5 == 0) parentPort.postMessage("Thread " + workerData.tname + " : i = " + i);
        await sleep(200);
    }
    parentPort.postMessage("Thread " + workerData.tname + " is done.");
}

run()