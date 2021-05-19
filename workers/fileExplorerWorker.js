const { parentPort, workerData } = require('worker_threads');
const fs = require('fs');
const CONFIG = require('../config.json')

/**
 * Parcourt le dossier spécifié dans workerData
 */
async function run() {
    let folderpath = workerData.folderpath;
    fs.readdir(folderpath, (err, files) => {
        if (err) {
            console.error("Something bad happened in thread " + workerData.name);
        } else {
            files.forEach(file => {
                if (CONFIG.fileExtensions.includes(file.split('.')[1])) {
                    console.log("[" + workerData.name + "]" + file);
                }
            });
            console.log(workerData.name + " finished.");
        }
    });
}

run();