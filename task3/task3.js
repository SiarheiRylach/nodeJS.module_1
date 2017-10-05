/**
 * Created by Siarhei_Rylach on 10/5/2017.
 */

const xlsx = require('xlsx-populate');
const fs = require('fs');
const path = require('path');


function jsonFromDir(pathDir){
    let objects = [];

    return new Promise((resolve)=>{
        fs.readdir(pathDir, (err, files) => {
            resolve(files);
        });
    }).then((files)=>{
        files.forEach((file)=>{
            if(path.extname(file) === ".json"){
                objects.push(require(`${pathDir}/${file}`));
            }
        });
    }).then(()=>{return objects});
}


Promise.resolve(jsonFromDir('C:/Users/Siarhei_Rylach/Downloads/Module 1/Module 1/Task 3')).then(data=>console.log(data));


