const sharp = require('sharp');
const { Worker } = require('worker_threads')
const readline = require('readline');

const shell = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

shell.question("Entrez un mot clé : ", (keyword) => {
    console.log(`Vous avez entré le mot clé ${keyword}`);
    shell.close();
});

shell.on('close', () => {
    console.log("Au revoir");
});