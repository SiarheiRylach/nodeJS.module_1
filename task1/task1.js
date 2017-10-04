/**
 * Created by Siarhei_Rylach on 10/4/2017.
 */
const fs = require('fs');

function outputEvery2Line(){
    let input = fs.createReadStream('C:/Users/Siarhei_Rylach/Downloads/Module 1/Module 1/Task 1/text.txt');
    let rl = require('readline').createInterface({
        input: input,
        terminal: false
    });

    let result = "";
    let counter = 1;
    rl.on('line', line => {
        if( (counter++ % 2) === 0) result += line + " ";
    });

    rl.on('close',()=>console.log(result.trim()));

}
if(module.parent){
    module.exports.outputEvery2Line = outputEvery2Line;
}else{
    outputEvery2Line();
}
