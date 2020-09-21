const request = require("request");
const fs = require("fs");

const baseurl="https://api.opencagedata.com/geocode/v1/json?q="
const api_keys = require("./keys_api");

function uslonglat(city, state, country, callback){
  var key = baseurl+city+"&key="+api_keys.latAPI;
  console.log(key);
  request(key,{json:true}, (err,res,body) =>{
    for(i in body.results){
      var bod=body.results[i];
      if(bod.components._type == "city"){
      	console.log(bod.components.state_code);
				console.log(state);
        if(bod.components.city.toUpperCase()== city.toUpperCase().trim() && bod.components.country.toUpperCase()== country.toUpperCase().trim() && bod.components.state_code.toUpperCase()== state.toUpperCase().trim() ){
           callback(bod.geometry.lat+" "+bod.geometry.lng);
          break;
        }
      }
    //  console.log(body.results[i].components)
    }
  });
}
/*
uslonglat("San Francisco","CA","USA", function(bd){
  console.log(bd)
});
*/

function getlonglat(city, country, callback){
  var key = baseurl+city+"&key="+api_keys.latAPI;
//  console.log(key);
  if (country.toUpperCase()=="CHINA"){
    country = "PRC";
  }
  request(key,{json:true}, (err,res,body) =>{
    if(body.total_results ==0){
      callback("Couldn't find, try again")
    }
    loop1:
    for(i in body.results){
      var bod=body.results[i];
      loop2:
        for(j in bod.components){
          var com= bod.components[j];
    //      console.log("search is: "+com.toUpperCase());
      //    console.log("city is "+ city.toUpperCase());
        //  console.log("country is "+ country.toUpperCase());

          if (com.toUpperCase() == city.toUpperCase().trim() && bod.components.country.toUpperCase()== country.toUpperCase().trim()){
          //  console.log("final is: "+com.toUpperCase());
            //console.log("final city is "+ city.toUpperCase());
             callback(bod.geometry.lat+" "+bod.geometry.lng);
            break loop1;
          }
        }


    //  console.log(body.results[i].components)
    }
  });
}

/*

getlonglat("Kuala Lumpur","Malaysia", function(bd){
  console.log(bd)
});
*/
module.exports={uslonglat:uslonglat, getlonglat:getlonglat };
