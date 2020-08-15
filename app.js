const express= require("express");
const https= require("https");
const bodyParser= require("body-parser");

const app= express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){

res.sendFile(__dirname + "/index.html");

});

app.post("/",function(req,res){
  const query= req.body.cityname;
    const apikey="11497fc272e73d9f33c91fd2573c549c";
    const unit= "metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + query+"&appid="+apikey+"&units="+unit;
  https.get(url, function(response){
    console.log(response.statuscode);


  response.on("data", function(data){
    const waether=JSON.parse(data);
    const temp= waether.main.temp;
    const weatherd= waether.weather[0].description
    const icon=waether.weather[0].icon
    const image="http://openweathermap.org/img/wn/" + icon + "@2x.png"
  res.write("<p>The weather is:"+ weatherd + "</p>")
  res.write("<h1>The temperature in "+query+" is "+temp+ " degrees Celcius.</h1>")
  res.write("<img src="+ image+">")
  res.send();
  })
  })
})

/*  */

app.listen(3000, function(){
  console.log("server started")
})
