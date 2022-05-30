const http = require('http');
const express = require('express');
const bodyParser = require("body-parser");
const request = require("request");
const exchange = require("./currency")
const fs = require("fs");
const weather = require("./weather");
const zomato = require("./zomato")
const wtime = require("./worldclock");

var entime =false;
var timecountry=false;
var ordu=false;
var restu=false;
var restc=false;
var catu=false;
var ratu=false;
var statelist=["AK", "AL", "AR", "AS", "AZ", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "GU", "HI", "IA", "ID", "IL", "IN", "KS", "KY", "LA", "MA", "MD", "ME", "MI", "MN", "MO", "MP", "MS", "MT", "NC", "ND", "NE", "NH", "NJ", "NM", "NV", "NY", "OH", "OK", "OR", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UM", "UT", "VA", "VI", "VT", "WA", "WI", "WV", "WY"]
encity=false;
encountry=false;
var cc="";
var ss="";
var ccc="";
var cate="";
var sort="";
var order="";
var range = "";
var rate ="";
var city="";
var cnt = "";
var state="";
var curf="";
var curt="";
var c_name = false;
var songtt=false;
var city_list=[];
var cnt_list=[];
//console.log(jsonfile);
var curlist=[];
var array = fs.readFileSync('array.txt').toString().split("\n");
for(i in array) {
    curlist.push(array[i]);
}



const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/', async(req, res) => {
  console.log(req.body.Body);
  console.log(city);
  console.log(cnt);
  var body = req.body.Body.trim();

 if(body.toUpperCase().trim() == "WEATHER"){
  encity=true;
    res.send(`<Response><Message> Enter the name of the city </Message></Response>`);
  }
  else if (encity==true){
    encity=false;
    city=body;
     res.send(`<Response><Message> Enter the name of your country (if its USA, just enter the abbreviation of the state) </Message></Response>`);
     encountry=true;
  }
  else if (encountry==true){
    encountry=false;
    if(statelist.includes(body.toUpperCase())) {
      state = body.toUpperCase();
      cnt = "United States of America";
      weather.findweatherus(city, cnt, state, function(bd){
        res.send(`<Response><Message> `+bd+` </Message></Response>`);
      });
    }
    else {
      cnt = body;
      weather.findweather(city, cnt,  function(bd){
        res.send(`<Response><Message> `+bd+` </Message></Response>`);
      });
    }
  }


else if(body.toUpperCase().trim()=="CURRENCY"){
  res.send(`<Response><Message> Enter the name of the currency you want to convert from, the currency you want to convert to, and the amount you want to convert, all followed by a space. If you don't know the name of your currencies, enter 'CN'</Message></Response>`);
  }
  else if(body.toUpperCase().trim()=="CN"){
    c_name=true;
    res.send(`<Response><Message> Enter the first letter of the country your currency belongs to. </Message></Response>`);
    }
    else if(c_name ==true){
      c_name =false;
      exchange.find_currency(body, function(nameco){

        res.send(`<Response><Message>`+nameco+`
If you see your currency, then enter the currency you want to convert from, the currency you want to convert to, and the amount you want to convert, all followed by a space. Enter 'CN' to search for another currency</Message></Response>`)
      });
    }
    else if (curlist.includes(body.split(" ")[0].toUpperCase()) && curlist.includes(body.split(" ")[1].toUpperCase()))  {
      curf = body.split(" ")[0].toUpperCase();
      curt= body.split(" ")[1].toUpperCase();
      var am=body.split(" ")[2];
      exchange.find_rate(curf,curt,am,function(numb){
        res.send(`<Response><Message> The current exchange rate for the amount `+am+` from `+curf+ ` to `+curt+` is: `+numb+`</Message></Response>`)
      });

    }

else if (body.toUpperCase().trim()=="RESTAURANT" || body.toUpperCase().trim()=="RESTAURANTS"){
  restu = true;
  res.send(`<Response><Message> Enter the name of the city you want to search restaurants at</Message></Response>`);

}
else if(restu ==true){
  city = body;
  restu=false;
  res.send(`<Response><Message> Enter the name of the country (if its USA, just enter the abbreviation of the state) </Message></Response>`);
  restc=true;

}
else if(restc == true){
  restc=false;
  cnt = body;
  res.send(`<Response><Message> Enter the type or category of food you are looking for </Message></Response>`);
  catu=true;
}
else if(catu==true){
  catu=false;
  cate=body;
  ratu=true;
  res.send(`<Response><Message> Enter the price range(1-5) and the rating(1-5) you are looking for, followed by a space </Message></Response>`);
}
else if(ratu ==true){
  ratu=false;
  range = body.split(" ")[0];
  rate = body.split(" ")[1];
  res.send(`<Response><Message> Enter how you want to sort the results (cost or rating) and then in what order (asc or desc) both followed by a space </Message></Response>`);
  ordu = true;
}
else if(ordu ==true){
  ordu =false;
  sort = body.split(" ")[0].toLowerCase();
  order = body.split(" ")[1].toLowerCase();
  if(statelist.includes(cnt.toUpperCase())){
    zomato.getuscityid(city, cnt, "USA", function(bd){
      zomato.searchrestaurant(bd, cate, range, rate, 5, sort, order, function(ppp){
      res.send(`<Response><Message> `+ppp+` </Message></Response>`);
    });
  });
  }
  else{
    zomato.getcityid(city, cnt,  function(bd){
      zomato.searchrestaurant(bd, cate, range, rate, 5, sort, order, function(ppp){

      res.send(`<Response><Message> `+ppp+` </Message></Response>`);
    });
    });
  }
}

else if(body.toUpperCase().trim() == "TIME"){
 entime=true;
   res.send(`<Response><Message> Enter the name of the city that you want to know the current time of </Message></Response>`);
 }

 else if (entime==true){
   entime=false;
   cc=body;
    res.send(`<Response><Message> Enter the name of your country (if its USA, just enter the abbreviation of the state) </Message></Response>`);
    timecountry=true;
 }
 else if (timecountry==true){
   timecountry=false;
   if(statelist.includes(body.toUpperCase())) {
     ss = body.toUpperCase();
     ccc = "USA";
     wtime.getzoneus(cc, ccc, ss, function(bd){
       wtime.gettime(bd, function(kk){
       res.send(`<Response><Message> `+kk+` </Message></Response>`);
     });
   });
   }
   else {
     ccc = body;
     wtime.getzone(cc, ccc,  function(bd){
       wtime.gettime(bd, function(kk){
       res.send(`<Response><Message> `+kk+` </Message></Response>`);
     });
   });
   }
 }

else{
  songtt=false;
//  console.log(body.toUpperCase().split()[0]+body.toUpperCase().split()[1])
  res.send(`<Response><Message> Type 'weather' to find the weather of your location, 'currency' to convert currencies, 'restaurant' to find restaurants in your city, or 'time' to know the current time of any place in the world </Message></Response>`)
}

});

app.listen(process.env.PORT || 1337, () => console.log("listening"));
