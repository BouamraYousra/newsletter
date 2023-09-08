

const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const mailchimp = require("@mailchimp/mailchimp_marketing");
const listId = "c9837af08b";
const request=require("request");

app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
 res.sendFile(__dirname + "/signup.html");
});
app.post("/",function(req,res){
var first=req.body.first;
var last=req.body.last;
var email=req.body.email;

var data={
  members:[
    {email_address:email,
    status:"subscribed",
    merge_fields: {
      FNAME: first,
      LNAME: last,

    }}
  ]
}
var jsondata=JSON.stringify(data);
console.log(email);
var options={
  url:"https://us21.api.mailchimp.com/3.0/lists/c9837af08b",
  method:"POST",
  headers:{
    "Authorization":"yousra e94e45790148fbe6e72fe01e9e673f92"
  },
  body:jsondata,

};
request(options,function(error, response, body){
  if(error){
    console.log(error);
    res.sendFile(__dirname +"/fail.html");
  }else {
    console.log(response.statusCode);
    if (response.statusCode===200) {
      res.sendFile(__dirname +"/success.html");
    }
    else {
        res.sendFile(__dirname +"/fail.html");
    }

  }
})
});
app.post("/fail",function(req, res) {
  res.redirect("/");
});
app.listen(process.env.PORT || 3000,function(){
  console.log("server runing on port 3000");
});
//e94e45790148fbe6e72fe01e9e673f92-us21
//c9837af08b
//"Braulio_Eichmann41@yahoo.com"
