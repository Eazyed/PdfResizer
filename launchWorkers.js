const { Worker } = require('worker_threads');
const CONFIG = require('./config.json');

let i = 0;
for (let folder of CONFIG.foldersToExplore) {
    i++;
    new Worker("./workers/fileExplorerWorker.js", { workerData: { folderpath: folder, name: "Worker " + i } })
}