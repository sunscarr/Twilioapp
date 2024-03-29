const request = require("request");
const zomato_key ="c769bad147d4e6289b9814a368d928e3";
const latlon = require("./latlon");
const api_keys = require("./keys_api");




function getuscityid(city, state,country, callback){
latlon.uslonglat(city,state, country, function(bb){
  lat = bb.split(" ")[0];
  long = bb.split(" ")[1];
  console.log(lat+long);
request({
  method:'GET',
  url:"https://developers.zomato.com/api/v2.1/cities?lat="+lat+"&lon="+long,
  json:true,
  headers:{'user-key': api_keys.zomato_key},
},(err,res,body)=>{
  callback(body.location_suggestions[0].id);
});
});
}


function getcityid(city, country, callback){
latlon.getlonglat(city, country, function(bb){
  lat = bb.split(" ")[0];
  long = bb.split(" ")[1];
  console.log(lat+" "+long);
request({
  method:'GET',
  url:"https://developers.zomato.com/api/v2.1/cities?lat="+lat+"&lon="+long,
  json:true,
  headers:{'user-key': api_keys.zomato_key},
},(err,res,body)=>{
  callback(body.location_suggestions[0].id);
});
});
}




function searchrestaurant(cityid, type, price, rating, no_rest, sort, sort_type, callback){
  var rlist=[];
  request({
    method:'GET',
    url:"https://developers.zomato.com/api/v2.1/search?entity_id="+cityid+"&entity_type=city"+"&q="+type+"&sort="+sort+"&order="+sort_type+"&count="+no_rest,
    json:true,
    headers:{'user-key': api_keys.zomato_key},
  },(err,res,body)=>{

  //  console.log(body);
    for(i in body.restaurants){
      var rat=body.restaurants[i].restaurant.user_rating.aggregate_rating;
      if(body.restaurants[i].restaurant.user_rating.aggregate_rating ==0){rat ="No ratings"}
      rlist.push("Name: "+body.restaurants[i].restaurant.name+ ". Address: "+body.restaurants[i].restaurant.location.address + ". Price range: "+ body.restaurants[i].restaurant.price_range+ ". Average user rating: "+ rat+'\n')
    }
    callback(rlist);
    console.log(rlist);

});
}


module.exports={getuscityid:getuscityid, getcityid:getcityid, searchrestaurant:searchrestaurant};
