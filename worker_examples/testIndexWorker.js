const { Worker, workerData } = require('worker_threads');

let workers = [
    new Worker("./worker_examples/testWorker.js", { workerData: { tname: "Worker 1" } }),
    new Worker("./worker_examples/testWorker.js", { workerData: { tname: "Worker 2" } }),
    new Worker("./worker_examples/testWorker.js", { workerData: { tname: "Worker 3" } }),
    new Worker("./worker_examples/testWorker.js", { workerData: { tname: "Worker 4" } })
];

workers.forEach((wor) => {
    wor.on('online', () => {
        console.log("A thread is launched");
    });

    wor.on('message', (message) => {
        console.log(message);
    });
})