var root_URL = "https://free.currconv.com/api/v7";
const path = require("path");
const request = require("request");
const fs= require("fs");
const readline = require("readline");
const api_keys = require("./keys_api");

function cur_list(callback){
    key = root_URL+ "/currencies?apiKey="+api_keys.curr_API;
    var ll=[];
    request(key, {json:true}, (err,res,body) => {
      for (i in body.results){
        ll.push(body.results[i].id);
      }
      return callback(ll);
    });
}


function find_currency(letter, callback){
  key = root_URL+ "/currencies?apiKey="+api_keys.curr_API;
  var info="";
  request(key, {json:true}, (err,res,body) => {
    for (i in body.results){
      if (body.results[i].id[0] == letter){
     info +=(body.results[i].currencyName+" is: "+body.results[i].id +".  ");

  }}
  return callback(info);
  });
}



function find_rate(from, to, amount, callback){
  var qr=from+"_"+to;
  var key = root_URL+"/convert?q="+from+"_"+to+"&compact=ultra&apiKey="+api_keys.curr_API;
  request(key, {json:true}, (err,res,body) => {
    var tot= (body[qr] * amount).toFixed(2);
    return callback(tot);
  });
}


module.exports={
  find_currency:find_currency,find_rate:find_rate, cur_list:cur_list
};
