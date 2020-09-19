const http = require('http');
const express = require('express');
//const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require("body-parser");
//const jsonfile = require('../city_list.json');
const apiKey= 'e81fb5cb36b485a64aa97c601e1bae2f';
const request = require("request");
//const music = require("./musicdir");
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

/*
   if (body.toUpperCase().trim() == "SONGS"){
     songtt=true;
    res.send(`<Response><Message> What genre of songs are you looking for? Eg (Chill, Hip hop, Rock, Pop, etc)</Message></Response>`);
  }
  else  if (body.toUpperCase().trim() == "CHILL"){
      res.send(`<Response><Message> Here's a good chill playlist on spotify: https://spoti.fi/2GrvKdu </Message></Response>`);
    }
    else if (body.toUpperCase().trim() == "HIP-HOP" || body.toUpperCase().trim() == "HIP HOP" || body.toUpperCase().trim() == "HIPHOP" ){
      music.findAll().then(users => {
        var arlist=[];
        var arlinklist=[];
        var pllist=[];
        var pllinklist=[];
        var allist=[];
        var allinklist=[];
        var pp=[];
        var pl=[];
        for(i in users){
          var data = users[i].dataValues.artist;
          if(users[i].dataValues.genre =="hip-hop"){
            if(arlist.includes(data)){}
            else{
            arlist.push(data);}
          }}
//        console.log(arlist);}

          for(i in users){
            var data = users[i].dataValues.artist_link;
            if(users[i].dataValues.genre =="hip-hop"){
              if(arlinklist.includes(data)){}
              else{
              arlinklist.push(data);}
            }}
  //        console.log(arlinklist);}

            for(i in users){
              var data = users[i].dataValues.playlist;
              if(users[i].dataValues.genre =="hip-hop"){
                if(pllist.includes(data)){}
                else{
                pllist.push(data);}
              }}
              for(i in users){
                var data = users[i].dataValues.playlist_link;
                if(users[i].dataValues.genre =="hip-hop"){
                  if(pllinklist.includes(data)){}
                  else{
                  pllinklist.push(data);}
                }}
                for(i in users){
                  var data = users[i].dataValues.album;
                  if(users[i].dataValues.genre =="hip-hop"){
                    allist.push( " "+data);
                  }}
                  for(i in users){
                    var data = users[i].dataValues.album_link;
                    if(users[i].dataValues.genre =="hip-hop"){

                      allinklist.push(" "+data);
                    }}

    //    arlist.split(",").join(', ')
            res.send(`<Response><Message> Here's Rap Caviar playlist on spotify that you might like:
https://spoti.fi/30NDDBE.
You might also like the artist(s):  `+ arlist +`. Here's their artist link if you want to explore: `+ arlinklist +` and their playlist "`+ pllist +`": `+ pllinklist +
` Some of their popular albums include: ` + allist + `.
Their links are: ` + allinklist+` </Message></Response>`);

  });
}
    else if (body.toUpperCase().trim() == "ROCK" || body.toUpperCase().trim() == "ROCKS"  ){
      res.send(`<Response><Message> Here's a Classic Rock playlist for you: https://spoti.fi/2JNK6H2 </Message></Response>`);
    }
    else if (body.toUpperCase().trim() == "POP"  ){
      music.findAll().then(users => {
        var arlist=[];
        var arlinklist=[];
        var pllist=[];
        var pllinklist=[];
        var allist=[];
        var allinklist=[];
        for(i in users){
          var data = users[i].dataValues.artist;
          if(users[i].dataValues.genre =="pop"){
            if(arlist.includes(data)){}
            else{
            arlist.push(data);}
          }}
//        console.log(arlist);}

          for(i in users){
            var data = users[i].dataValues.artist_link;
            if(users[i].dataValues.genre =="pop"){
              if(arlinklist.includes(data)){}
              else{
              arlinklist.push(data);}
            }}
  //        console.log(arlinklist);}

            for(i in users){
              var data = users[i].dataValues.playlist;
              if(users[i].dataValues.genre =="pop"){
                if(pllist.includes(data)){}
                else{
                pllist.push(data);}
              }}
              for(i in users){
                var data = users[i].dataValues.playlist_link;
                if(users[i].dataValues.genre =="pop"){
                  if(pllinklist.includes(data)){}
                  else{
                  pllinklist.push(data);}
                }}
                for(i in users){
                  var data = users[i].dataValues.album;
                  if(users[i].dataValues.genre =="pop"){

                    allist.push(" "+ data);
                  }}
                  for(i in users){
                    var data = users[i].dataValues.album_link;
                    if(users[i].dataValues.genre =="pop"){

                      allinklist.push(" " +data);
                    }}

    //    arlist.split(",").join(', ')
            res.send(`<Response><Message> Here's Today's Top Hits playlist for you:
https://spoti.fi/2K4KZdv
You might also like the artist(s):  `+ arlist +`. Here's their artist link if you want to explore: `+ arlinklist +` and their playlist "`+ pllist +`": `+ pllinklist +
` Some of their popular albums include: ` + allist + `.
Their links are: ` + allinklist+` </Message></Response>`);

});
}
    else if (body.toUpperCase().trim() == "COUNTRY"  && songtt==true){
      res.send(`<Response><Message> Here's Hot Country Hits playlist for you: https://spoti.fi/2JR6K1v   </Message></Response>`);
    }

    */
 if(body.toUpperCase().trim() == "WEATHER"){
  encity=true;
    res.send(`<Response><Message> Enter the name of the city </Message></Response>`);
  }
  /*
  else if(cnt.length > 0 && city.length >0){
    var id="";
    for(var i=0; i<jsonfile.length; i++){
    var fir = jsonfile[i];
    if(fir.name.toUpperCase() == city.toUpperCase() && fir.country.toUpperCase() == cnt.toUpperCase()){
    	id= (jsonfile[i].id);
    	break;
    }}
    var key = "http://api.openweathermap.org/data/2.5/weather?id="+id+"&APPID="+apiKey;
    city="";
    cnt="";
    request(key, {json:true}, (err,response,body) => {
			if (err){return console.log(err);}
			var temperature = ((body.main.temp)-273.15)*(9/5)+32;
			var des = (body.weather[0].description);
			res.send(`<Response><Message>The temperature is: `+ Number(temperature.toFixed(1))+`F. The weather is `+ des +`</Message></Response>`);

  });
}
*/
  else if (encity==true){
    encity=false;
    city=body;
     res.send(`<Response><Message> Enter your country (if its USA, just enter the name of the state) </Message></Response>`);
     encountry=true;
  }
  else if (encountry==true){
    encountry=false;
    if(statelist.includes(body.toUpperCase())) {
      state = body.toUpperCase();
      cnt = "USA";
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

/*
  else if(cnt_list.includes(body.toUpperCase() )){
    cnt=body;
    if (city.length >0){
    res.send(`<Response><Message> Type ok </Message></Response>`);
  }

  else{
      res.send(`<Response><Message> Enter your city </Message></Response>`);
  }
}
  else if(city_list.includes(body.toUpperCase())){
    city=body;
    if(cnt.length >0){
      res.send(`<Response><Message> Type ok </Message></Response>`);
    }
    else{
    res.send(`<Response><Message> Enter your country code </Message></Response>`);
  }
}


*/
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
  res.send(`<Response><Message> Enter the name of the country (if its USA, just enter the name of the state) </Message></Response>`);
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
    res.send(`<Response><Message> Enter your country (if its USA, just enter the name of the state) </Message></Response>`);
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
  res.send(`<Response><Message> Type weather to know the weather of your location, currency to convert currencies, restaurant to find restaurants in your city, or time to know the current time of any place in the world </Message></Response>`)
}
  //const twiml = new MessagingResponse();

//  twiml.message('The Robots are coming! Head for the hills!');

//  res.writeHead(200, {'Content-Type': 'text/xml'});
//  res.end(twiml.toString());
});
/*
http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});
*/
app.listen(process.env.PORT || 1337, () => console.log("listening"));
