/**
 * Created by Siarhei_Rylach on 10/5/2017.
 */

const xlsx = require('xlsx-populate');
const fs = require('fs');
const path = require('path');
const currentDir = './';


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

Promise.resolve(jsonFromDir(getInputDirectory()))
    .then(data=>{
        let counterSheets = 1;
            xlsx.fromBlankAsync().then(workbook => {
                    data.forEach((jsonObj)=>{
                        let currentSheet = workbook.addSheet('obj' + counterSheets++);
                        writeObjIntoXlsx(jsonObj, currentSheet, 1, "A");
                    });
                    if(workbook.sheets().length < 2){
                        console.log("Directory doesn't have any .json files");
                    }else{
                        workbook.deleteSheet(0);
                        return workbook.toFileAsync(getOutputFile()); // Write to file
                    }
                });
    });

function writeObjIntoXlsx(obj, currentSheet, curRow, curCol) {
    let cRowCell = curRow;

    currentSheet.active(true);
    for(let key in obj) {
        if(obj.hasOwnProperty(key)){
            let cColCell = curCol;
            let fieldJson = obj[key];
            if(!Array.isArray(obj)) {
                currentSheet.cell(cColCell + cRowCell).value(key);
            }else{
                currentSheet.cell(cColCell + cRowCell).value("elem");
            }

            if (isObject(fieldJson)) {
                cColCell = nextLetter(cColCell);
                if (Array.isArray(fieldJson)) {
                    fieldJson.forEach((elem) => {
                        if (isObject(elem)) {
                            cRowCell += writeObjIntoXlsx(elem, currentSheet, ++cRowCell, nextLetter(cColCell)) + 1;
                        } else {
                            currentSheet.cell(cColCell + ++cRowCell).value(elem);
                        }

                    });
                } else {
                    for (let keyIn in fieldJson) {
                        if (fieldJson.hasOwnProperty(keyIn)) {
                            if (isObject(fieldJson[keyIn])) {
                                currentSheet.cell(cColCell + ++cRowCell).value(keyIn);
                                cRowCell += writeObjIntoXlsx(fieldJson[keyIn], currentSheet, ++cRowCell, nextLetter(cColCell)) + 1;
                            } else {
                                currentSheet.cell(cColCell + cRowCell).value(keyIn);
                                currentSheet.cell(nextLetter(cColCell) + cRowCell).value(fieldJson[keyIn]);
                                cRowCell++;
                            }
                        }

                    }
                }
            } else {
                cColCell = nextLetter(cColCell);
                currentSheet.cell(cColCell + cRowCell).value(fieldJson);
            }
            cRowCell++;
        }
    }

    return cRowCell - curRow;
}

function nextLetter(currentLetter) {
    return String.fromCharCode(currentLetter.charCodeAt(0) + 1);
}

function isObject(obj) {
    return typeof obj === "object";
}

function getInputDirectory(){
    let args = process.argv;
    for(let i = 2; i < args.length; ++i){
        if(args[i] === "--inputDir"){
            return args[i + 1];
        }
    }
    return currentDir;
}

function getOutputFile(){
    let args = process.argv;
    for(let i = 2; i < args.length; ++i){
        if(args[i] === "--outputDir"){
            return args[i + 1];
        }
    }
    return currentDir + 'out.xlsx';
}


