console.log('Welcome to Weather Report App')

let request = require('request');

//list of 5 API keys
let apiKey = ['252619877898b10cd7dbf0fd71f11ddf', '493c1ee2372eba2eb21a8974760e9efe',
'73b54712391f6a61643709993fb9d065','e592a210b10c79eb48645022bf06a389',
'38cc7eabe677f397aae5627a12d5e64b'];
//vriable to set start time for all API
let startTime = [];
//count variable for each api
let count = 1;
//to use as index value for all arrays
let i=0;
// Get process.stdin as the standard input object.

var val = 0;

var standard_input = process.stdin;

function duration(startTime) {
	let timeInterval = 	Math.floor(new Date() - startTime)/1000;
	return timeInterval; 
}
// Prompt user to input data in console.
console.log("Please input city name in command line.");



// When user input data and click enter key.
standard_input.on('data', function (data) {
	if (startTime.length<apiKey.length && count===1){
		startTime.push(new Date());
		count++;
	}
	else if (count===2) {
		let time = 	duration(startTime[i]);
		// console.log("interval: "+timeInterval);
		i++;
		count = 1;
		//see the time interval and use of API in that hour
		if (time<35 && i===5) {
			i=0;
			val = 1;
				
		}

		else if(i===5){
			i=0;
			startTime[i] =new Date();
			count=1;
			val = 0;
		}			
	}
	else {
		let t = duration(startTime[i]);
		if (t<35 && val===1) {
			console.log('Sorry! Your hourly limit for all 5 API has reached. Please come back later!');
			process.exit();	
		}
		count++;
	} 


   	let city = data.toString().trim()
   	if (city==='exit'){
   		process.exit();
   	}
    // Print user input in console.
    console.log('User Input Data : ' + city);

    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey[i]}`
	request(url, function (err, response, body) {
		if(err){
			console.log("The url is invalid request cant be made.");
			process.exit();
	   		// console.log('error:', error);

		} else {
			//print the data from json 
			let weather = JSON.parse(body);
			let code = `${weather.cod}`;
			if(code ==='200'){
		    let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
			console.log(message);
			
			console.log("Please input city name in command line or type exit to end the program.");
			
  			}
  			else {
  				console.log(`${weather.message}`);
  				console.log("Please input city name in command line or type exit to end the program.");

  			}
		}
		
	});

});
