var curr_API = "dfb0bdd4c972d9728308";
var root_URL = "https://free.currconv.com/api/v7";
const path = require("path");
const request = require("request");
const fs= require("fs");
const readline = require("readline");

function cur_list(callback){
    key = root_URL+ "/currencies?apiKey="+curr_API;
    var ll=[];
    request(key, {json:true}, (err,res,body) => {
      for (i in body.results){
        ll.push(body.results[i].id);
      }
      return callback(ll);
    });
}


function find_currency(letter, callback){
  key = root_URL+ "/currencies?apiKey="+curr_API;
  var info="";
  request(key, {json:true}, (err,res,body) => {
    for (i in body.results){
      if (body.results[i].id[0] == letter){
     info +=(body.results[i].currencyName+" is: "+body.results[i].id +".  ");

  }}
  return callback(info);
  });
}

//find_currency('N');


function find_rate(from, to, amount, callback){
  var qr=from+"_"+to;
  var key = root_URL+"/convert?q="+from+"_"+to+"&compact=ultra&apiKey="+curr_API;
  request(key, {json:true}, (err,res,body) => {
    var tot= (body[qr] * amount).toFixed(2);
    return callback(tot);
  });
}


/*
var uurr="https://free.currconv.com/api/v7/currencies?apiKey=dfb0bdd4c972d9728308";

function writefile(){
  var ppll=[];
request(uurr, {json:true}, (err,res,body) => {
for (i in body.results){
  ppll.push(body.results[i].id);
}
console.log(ppll);
var file = fs.createWriteStream('array.txt');

fs.writeFile("./currencylist.txt", ppll,function(err) {
    if(err) {
        return console.log(err);
    }
  });

ppll.forEach(function(v) {file.write(v +'\n');});
file.end();

});
}

writefile();
*/

//var ppll="INR NPR";
//console.log(ppll.split(" ")[1])


/*

var curlist=[];
var array = fs.readFileSync('array.txt').toString().split("\n");
for(i in array) {
    curlist.push(array[i]);
}
console.log(curlist)
/*
var rd = readline.createInterface({
    input: fs.createReadStream('array.txt'),
  //  output: process.stdout,
    console: false
});

rd.on('line', function(line) {
    console.log(line[:3]);
});
/*
var paths = path.join(__dirname, 'currencylist.txt');
fs.readFile(paths, {encoding: 'utf-8'}, function(err,data){
    if (!err) {
      //  console.log('received data: ' + data);

    //    response.writeHead(200, {'Content-Type': 'text/html'});
      //  response.write(data);
      ////  response.end();
    } else {
        console.log(err);
    }
});


(find_rate("INR", "NPR", 10, function(res){
  console.log(res);
}));

*/
module.exports={
  find_currency:find_currency,find_rate:find_rate, cur_list:cur_list
};
