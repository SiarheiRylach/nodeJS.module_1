/**
 * Created by Siarhei_Rylach on 10/4/2017.
 */
function validateJson() {
    let obj = readJsonFromFile('C:/Users/Siarhei_Rylach/Downloads/Module 1/Module 1/Task 2/4');
    let errors = [];
    for(key in obj){
        if(!(typeof obj['flag'] === 'boolean')){

        }

        if( !(typeof Array.isArray(obj['myPromises'])) ){

        }

        if( !(typeof obj['element'] === "object") ){

        }

        if( !(typeof obj['element'] === "object") ){

        }

        if( !(typeof obj['elementText'] === "string") ){

        }

        if( (obj['allElementsText'].indexOf("const")) < 0 ){

        }

        if( (obj['counter']) < 10){

        }

        if( !(obj['config']) === "Common" ){

        }

        if( !(obj['const']) === "FiRst" ){

        }

        if( (obj['parameters'].length) !== 8 ){

        }

        if( ((obj['description'].length) < 5) || ((obj['description'].length) > 13)){

        }
    }

    function addError(key, value) {
        errors.push({prop: key, value: value});
    }
}

function readJsonFromFile(path) {
    return require(path);
}