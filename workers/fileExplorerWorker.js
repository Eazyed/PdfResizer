const {
    parentPort,
    workerData
} = require('worker_threads');
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
                const fileRootName = file.split('.')[0];
                const fileExtension = file.split('.')[1];

                if (CONFIG.fileExtensions.includes(fileExtension)) {
                    let metadata = '';
                    let image_resized_path = `${CONFIG.pathToResult}${fileRootName}_resized.${fileExtension}`;
                    console.log("[" + workerData.name + "]" + file);
                    const metadata_path = `${folderpath}${fileRootName}.metadata`;
                    const image_path = `${folderpath}${fileRootName}.${fileExtension}`;
                    // Lecture du fichier metadata
                    fs.readFile(metadata_path, 'utf8', (err, data) => {
                        if (err) {
                            console.error(err);
                            return
                        }
                        console.log(data);
                        metadata = data;

                        // RESIZE DE L IMAGE ET DEPLACEMENT VERS image_resized_path 
                        sharp(image_path)
                            .resize({
                                height: CONFIG.heightResized,
                                width: CONFIG.widthResized
                            })
                            .toFile(image_resized_path)
                            .then(() => {
                                // Suppression de l'image de base
                                fs.unlink(image_path, (err) => {
                                    if (err) {
                                        console.error(err)
                                        return
                                    }
                                    //file removed
                                })

                                console.log(`${file} resized and moved to new folder`)

                                // Insertion en base
                                var sql = 'INSERT INTO images (image_path,metadata) VALUES (?,?)';
                                con.query(sql, [image_resized_path, metadata], function (err, result) {
                                    if (err) throw err;
                                    console.log(result);
                                });

                                // Suppression du fichier metadata
                                fs.unlink(metadata_path, (err) => {
                                    if (err) {
                                        console.error(err)
                                        return
                                    }
                                    //file removed
                                })
                            })
                            .catch((err) => console.log(err));



                    });

                } else if (file.split('.')[1] == 'metadata') {
                    // Logique liée au fichier source
                } else {
                    const oldPath = `${folderpath}${file}`;
                    const newPath = `${CONFIG.pathToTrash}${file}`;
                    fs.rename(oldPath, newPath, function (err) {
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