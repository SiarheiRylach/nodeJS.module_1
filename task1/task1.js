/**
 * Created by Siarhei_Rylach on 10/4/2017.
 */
const fs = require('fs');
const currentDir = './';

function outputEvery2Line(){

	return new Promise((resolve, reject)=>{

		if (!fs.existsSync(getPathInputFile())){
			reject(new Error("File doesn't exist by this path"));
		}else{
			let input = fs.createReadStream(getPathInputFile());
			let rl = require('readline').createInterface({
		        input: input,
		        terminal: false
			 });

		    let result = "";
		    let counter = 1;
		    rl.on('line', line => {
		        if( (counter++ % 2) === 0) result += line + " ";
		    });

		    rl.on('close',()=>resolve(result));
		}
	});
   

    function getPathInputFile(){
    	let args = process.argv;
		for(let i = 2; i < args.length; ++i){
	        if(args[i] === "--inputDir"){
	            return args[i + 1];
	        }
		}
		return currentDir + 'text.txt';
    }

}

if(module.parent){
    module.exports = outputEvery2Line;
}else{
    outputEvery2Line().then((data) => console.log(data))
    				  .catch((err)=>console.log(err.toString()));
}
