const request = require("request");
const latlon = require("./latlon");
var timezoneapi = "5OMKHOI4E62Q";

var months=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function getzone(city, country, callback){
    latlon.getlonglat(city, country, function(bb){
      lat = bb.split(" ")[0];
      long = bb.split(" ")[1];
      var key = "http://api.timezonedb.com/v2.1/get-time-zone?key=5OMKHOI4E62Q&format=json&by=position&lat="+lat+"&lng="+long;
      request(key, {json:true}, (err, res, body)=>{
        callback(body.zoneName);
      });
});
}



function getzoneus(city, country, state, callback){
    latlon.uslonglat(city, state, country, function(bb){
      lat = bb.split(" ")[0];
      long =bb.split(" ")[1];
      var key = "http://api.timezonedb.com/v2.1/get-time-zone?key=5OMKHOI4E62Q&format=json&by=position&lat="+lat+"&lng="+long;
      request(key, {json:true}, (err, res, body)=>{
        callback(body.zoneName);
      });
});
}

//getzone("Kathmandu", "Nepal");
//getzoneus("Hayward", "USA", "CA");


function gettime(zone, callback){
  var key ="http://worldtimeapi.org/api/timezone/"+zone;
  request(key, {json:true}, (err,res,body)=>{
    var time = body.datetime;
    var addi="";
    var d1=body.datetime[8,10];
    var month = body.datetime[5];
    var month2 = body.datetime[6];
    var hour = body.datetime.slice(11,13);
    var mins = body.datetime.slice(13,16);
    var year = body.datetime.slice(0,4);
    if(hour>=12){
      hour = hour%12;
      mins = mins+ " pm";
    }
    else{
      mins = mins + " am";
    }
    if (month ==0){
      addi=month2;}
      else if(month==1 && month2==0){
     addi=10;}
     else if(month==1 && month2==1){
    addi=11;}
    else if(month==1 && month2==2){
   addi=12;}

    var mwor= months[addi-1]
    callback("The time is "+hour+mins+" and the date is "+ mwor+" "+d1+", "+year);
  })
}

//gettime("Asia/Kathmandu");

module.exports={gettime:gettime, getzone:getzone, getzoneus:getzoneus};
