const express=require("express");

const cors = require("cors");

const bodyParser=require("body-parser");
const path=require("path");

const app=express();

app.use(cors());

//to parse URL-encoded & JSON data 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//to serve static files
app.use(express.static(__dirname));

//route to serve home.html
app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname,"home.html"));
});

  //route to serve addFundraiser.html
  app.get("/addFundraiser",(req,res)=>{
    res.sendFile(path.join(__dirname,"addFundraiser.html"));
  });

  //route to serve updateFundraiser.html
  app.get("/updateFundraiser",(req,res)=>{
    res.sendFile(path.join(__dirname,"updateFundraiser.html"));
  });

  //route to serve home.html

  app.get("/home",(req,res)=>{
    res.sendFile(path.join(__dirname,"home.html"));
  });


  //localhost, pory 8080
app.listen(8080,()=>{
  console.log("Running in 8080"); //if connection successful, console retrieve this message
 
});


