const sharp = require('sharp');
const mysql = require('mysql');
const { Worker } = require('worker_threads')
const readline = require('readline');

const shell = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "imageresizer"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

        shell.question("Entrez un mot clé : ", (keyword) => {
            console.log(`Vous avez entré le mot clé ${keyword}`);
            keyword = `%${keyword}%`;
            var sql = 'SELECT image_path FROM images WHERE metadata like ? ';
            con.query(sql, [keyword], function (err, result) {
                if (err) throw err;
                console.log(result);
            });
        });    
  });



shell.on('close', () => {
    console.log("Au revoir");
});

