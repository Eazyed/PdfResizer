const { parentPort, workerData } = require('worker_threads');
const fs = require('fs');
const sharp = require('sharp');
const CONFIG = require('../config.json');
const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "imageresizer"
  });

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
                    let metadata ='';
                    console.log("[" + workerData.name + "]" + file);
                    fs.readFile(`${folderpath}${file.split('.')[0]}.metadata`, 'utf8' , (err, data) => {
                        if (err) {
                          console.error(err);
                          return
                        }
                        console.log(data);
                        metadata = data;
                      })
                    
                } else if (file.split('.')[1]=='metadata')
                {
                    // Logique liée au fichier source
                } else {
                    const oldPath = `${folderpath}${file}`;
                    const newPath = `${CONFIG.pathToTrash}${file}`;
                    fs.rename(oldPath,newPath, function (err) {
                        if (err) throw err
                        console.log(`moved ${file} to trash`)
                      });
                }

            });
            console.log(workerData.name + " finished.");
        }
    });
}

run();