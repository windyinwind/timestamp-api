var express = require('express');
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
var app = express();
var port = process.env.PORT || 8080;
app.get('/', function(req, res){
	res.status(200);
	res.send('Timestamp Server.');
	res.end();
});

app.get('/:date', function(req, res){
	res.setHeader('Content-type', 'application/json');
	var dateStr = req.params.date;
	console.log(dateStr);
	var result = {
		unix: null,
		natural: null
	};
	if(!dateStr){
		res.send(result);	
		res.end();
	}
	var cleanDate = Number(dateStr);
	if(isNaN(cleanDate)) { // param is natural date
		result.natural = dateStr;
		date = new Date(dateStr);	
		result.unix = Math.round(date.getTime() / 1000);
	} else { // timestamp
		date = new Date(cleanDate * 1000);
		result.unix = cleanDate;
		var monthName = monthNames[date.getMonth()];			
		var monthDate = date.getDate(); 
		var year = date.getFullYear();
		result.natural = monthName + ' ' + monthDate + ', ' + year;  
	}
	res.send(result);
	res.end();	
	
});

app.listen(port, function(){
	console.log(`App listening to port: ${port}`);
});
