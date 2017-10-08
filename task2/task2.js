/**
 * Created by Siarhei_Rylach on 10/4/2017.
 */
"use strict";

сonst fs = require('fs');
const currentDir = './';

function validateJson(obj) {
    let errors = "";
    for(let key in obj) {
        if (obj.hasOwnProperty(key)) {
            switch (key) {
                case 'flag':
                    if (!(typeof obj[key] === 'boolean')) addError(key, obj[key]);
                    break;

                case 'myPromises':
                    if (!(typeof Array.isArray(obj[key]))) addError(key, obj[key]);
                    break;

                case 'element':
                    if (!(typeof obj[key] === "object")) addError(key, obj[key]);
                    break;

                case 'screenshot':
                    if (!(obj[key] === null)) addError(key, obj[key]);
                    break;

                case 'elementText':
                    if (!(typeof obj[key] === "string")) addError(key, obj[key]);
                    break;

                case 'allElementsText':
                    if ((obj[key].indexOf("const")) < 0) addError(key, obj[key]);
                    break;

                case 'counter':
                    if ((obj[key]) < 10) addError(key, obj[key]);
                    break;

                case 'config':
                    if (!(obj[key] === "Common")) addError(key, obj[key]);
                    break;

                case 'const':
                    if (!(obj[key].toLowerCase() === "first")) addError(key, obj[key]);
                    break;

                case 'parameters':
                    if ((obj[key].length) !== 8) addError(key, obj[key]);
                    break;

                case 'description':
                    if (((obj[key].length) < 5) || ((obj[key].length) > 13)) addError(key, obj[key]);
                    break;
            }
        }
    }

    return errors;


    function addError(key, value) {
        errors += `Property "${key}" equals "${value}"\n`;
    }
}

function printErrors(errors) {
    if (errors === "") errors = "OK";

    fs.writeFile('log.txt', errors, (err) => {
        if(err) console.log(err);
    });
}

function readJsonFromFile(path) {
    return require(path);
}

 function getPathInputJson(){
        let args = process.argv;
        for(let i = 2; i < args.length; ++i){
            if(args[i] === "--inputDir"){
                return args[i + 1];
            }
        }
        return currentDir + '4';
 }

printErrors(validateJson(readJsonFromFile(getPathInputJson())));
