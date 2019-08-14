const request = require("request");
const apiKey= 'e81fb5cb36b485a64aa97c601e1bae2f';
//var another = require('./sequelizes');
const lattt= require("./latlon")

function findid(city, country){
for(var i=0; i<jsonfile.length; i++){
var fir = jsonfile[i];
if(fir.name.toUpperCase() == city.toUpperCase() && fir.country.toUpperCase() == country.toUpperCase()){
	return (jsonfile[i].id);
	break;
}
}}

function findweather(city, country, callback){
  lattt.getlonglat(city, country, function(bb){
    lat = bb.split(" ")[0];
    long = bb.split(" ")[1];
  var key = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&APPID="+apiKey;
  request(key, {json:true}, (err,res,body) => {
    if (err){return console.log(err);}
    var temperature = ((9/5)*((body.main.temp)-273.15))+32;
	//	console.log(temperature);
    var des = (body.weather[0].description);
	//	console.log(des);
    return callback("The temperature is "+temperature.toFixed(1) +" F. The weather is "+ des);

});
});
}


function findweatherus(city, country, state, callback){
  lattt.uslonglat(city, state, country, function(bb){
    lat = bb.split(" ")[0];
    long = bb.split(" ")[1];
  var key = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&APPID="+apiKey;
//  console.log(key);
  request(key, {json:true}, (err,res,body) => {
    if (err){return console.log(err);}
    var temperature = ((9/5)*((body.main.temp)-273.15))+32;
	//	console.log(temperature);
    var des = (body.weather[0].description);
	//	console.log(des);
    return callback("The temperature is "+temperature.toFixed(1) +" F. The weather is "+ des);

});
});
}

findweatherus("Sacramento", "USA","CA", function(ww){
  console.log("haha");
  console.log(ww);
});


module.exports={findweather:findweather, findweatherus:findweatherus};
