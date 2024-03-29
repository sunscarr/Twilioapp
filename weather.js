const request = require("request");

const lattt= require("./latlon")
const api_keys = require("./keys_api");

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
  var key = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&APPID="+api_keys.weather_key;
  request(key, {json:true}, (err,res,body) => {
    if (err){return console.log(err);}
    var temperature = ((9/5)*((body.main.temp)-273.15))+32;
	//	console.log(temperature);
    var des = (body.weather[0].description);
    console.log(key);
	//	console.log(des);
    return callback("The temperature is "+temperature.toFixed(1) +" F. The weather description is "+ des+".");

});
});
}


function findweatherus(city, country, state, callback){
  lattt.uslonglat(city, state, country, function(bb){
    lat = bb.split(" ")[0];
    long = bb.split(" ")[1];
  var key = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&APPID="+api_keys.weather_key;
//  console.log(key);
  request(key, {json:true}, (err,res,body) => {
    if (err){return console.log(err);}
    var temperature = ((9/5)*((body.main.temp)-273.15))+32;
	//	console.log(temperature);
    var des = (body.weather[0].description);
    console.log(key);
	//	console.log(des);
    return callback("The temperature is "+temperature.toFixed(1) +" F. The weather description is "+ des+".");

});
});
}


module.exports={findweather:findweather, findweatherus:findweatherus};
