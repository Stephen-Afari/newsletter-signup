//jshint esversion: 6
const express = require("express");
const request= require("request");
const https = require("https");
const bodyParser= require("body-parser");

const app= express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req,res){
  //console.log(res.statusCode);
    res.sendFile(__dirname + "/signup.html");

})
app.post("/", function(req,res){
  //console.log(req.body);
  const firstName= req.body.fName;
  const lastName= req.body.lName;
  const email= req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url="https://us10.api.mailchimp.com/3.0/lists/66b6828bb1" ;

  const options = {
    method: "POST",

   auth: "afari1:2422a882970023901a0a8485a041f200-us10",

  };

const request = https.request(url, options, function(response){
  response.on("data", function(data){
    if(response.statusCode===200){
        res.sendFile(__dirname +"/success.html");
    } else{
        res.sendFile(__dirname +"/failure.html");
    }
    console.log(JSON.parse(data));
  });
  });

request.write(jsonData);
request.end();


 //console.log(firstName, lastName, email);
});

app.post('/failure', function(req,res){
  res.redirect('/');
})
app.listen(process.env.PORT||3000, function(){
  console.log('Server started on Port 3000');

});
//API Key
// 13d219c4de086c25fd93359cac76ee8b-us10


//List_id
//66b6828bb1
