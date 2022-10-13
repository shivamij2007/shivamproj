const mongoose=require("mongoose");
const path=require("path");
const hbs=require("hbs")
require("./db/conn");
const User=require("./model/students");
const port=process.env.PORT||3000;
const express=require("express");
const staticPath=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../template/views");
const app=express();
app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set("view engine","hbs");
app.set("views",template_path)

app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/calculator",(req,res)=>{
    res.render("calculator.hbs")
})
app.get("/registration",(req,res)=>{
    res.render("registration.hbs")
})

// getting the data from form to database

app.post("/registration",async(req,res)=>{
   try{
    const password=req.body.Password;
    const cpassword=req.body.ConfirmPassword;
    console.log(password)
    console.log(cpassword)
    console.log(req.body.firstname)
    
    if(password===cpassword){
        const newUser= new User({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            mobileNumber:req.body.mobileNumber,
            EmailId:req.body.EmailId,
            Password:req.body.Password,
            ConfirmPassword:req.body.ConfirmPassword

        });
        const registeredData=await newUser.save();
        console.log(registeredData);
        res.status(201).render("index")
        // alert("registered succesfully");
    }
    else{
        res.send("password mismatch");
    }
   }catch{
    (e)=>{
        console.log(e);
    }
   }
})


// weather api integration

const fs=require("fs");
var requests = require("requests");
const homeFile = fs.readFileSync("./public/weather.html", "utf-8");
const replaceval = (tempval, orgval) => {
    let temperature = tempval.replace("{%temp%}", orgval.main.temp);
    temperature = temperature.replace("{%tempmin%}", orgval.main.temp_min);
    temperature = temperature.replace("{%tempmax%}", orgval.main.temp_max);
    temperature = temperature.replace("{%city%}", orgval.name);
    temperature = temperature.replace("{%country%}", orgval.sys.country);
    temperature = temperature.replace("{%tempcond%}", orgval.weather[0].main);

    return temperature;
}


app.get("/weather",(req,res)=>{
    const name=req.query.name;
    if(name){
        requests(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=4c9c5640d42e2a4ed796276d54ff1c0e&units=metric`)
            .on('data', (chunk) => {
               
                
                const objData = JSON.parse(chunk)
                // console.log(objData);
                
                if(objData.message=='city not found'){
                    requests(`https://api.openweathermap.org/data/2.5/weather?q=Raigarh&appid=4c9c5640d42e2a4ed796276d54ff1c0e&units=metric`)
                    .on('data', (chunk) => {
        
                        const objData1 = JSON.parse(chunk)
                        // console.log(objData1);
                        const arrData = [objData1];
                        // console.log("indise arrData",arrData);
                        // console.log(arrData[0].weather[0].main);
                        const realTimedata = arrData.map(val => replaceval(homeFile, val));
                        // console.log(realTimedata.join(""));
                        // res.write(realTimedata.join(""))
                    })
                    .on('end', function (err) {
                        if (err) return console.log('connection closed due to errors', err);
                        res.end();
        
                    });   
                }
               else{
                const arrData = [objData];
                // console.log(arrData);
                // console.log(arrData[0].weather[0].main);
                 const realTimedata = arrData.map(val => replaceval(homeFile, val));
                // console.log(realTimedata.join("")); 
                 res.write(realTimedata.join(""))                 
               }

              

            })
            .on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);
                res.end();

            })
            .on("error",function(req,res){
                console.log("inside error")
                res.write("wrong name")
            });
    }
    else{
        requests(`https://api.openweathermap.org/data/2.5/weather?q=Raigarh&appid=4c9c5640d42e2a4ed796276d54ff1c0e&units=metric`)
            .on('data', (chunk) => {

                const objData = JSON.parse(chunk)
                const arrData = [objData];
                // console.log(arrData);
                // console.log(arrData[0].weather[0].main);
                const realTimedata = arrData.map(val => replaceval(homeFile, val));
                // console.log(realTimedata.join(""));
                res.write(realTimedata.join(""))
            })
            .on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);
                res.end();

            });
    }
})

app.post("/weather",(req,res)=>{
    const name=req.body.city;
    console.log(name);
    if(name){
        requests(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=4c9c5640d42e2a4ed796276d54ff1c0e&units=metric`)
            .on('data', (chunk) => {
               
                
                const objData = JSON.parse(chunk)
                // console.log(objData);
                
                if(objData.message=='city not found'){
                    requests(`https://api.openweathermap.org/data/2.5/weather?q=Raigarh&appid=4c9c5640d42e2a4ed796276d54ff1c0e&units=metric`)
                    .on('data', (chunk) => {
        
                        const objData1 = JSON.parse(chunk)
                        // console.log(objData1);
                        const arrData = [objData1];
                        // console.log("indise arrData",arrData);
                        // console.log(arrData[0].weather[0].main);
                        const realTimedata = arrData.map(val => replaceval(homeFile, val));
                        // console.log(realTimedata.join(""));
                        // res.write(realTimedata.join(""))
                    })
                    .on('end', function (err) {
                        if (err) return console.log('connection closed due to errors', err);
                        res.end();
        
                    });   
                }
               else{
                const arrData = [objData];
                // console.log(arrData);
                // console.log(arrData[0].weather[0].main);
                 const realTimedata = arrData.map(val => replaceval(homeFile, val));
                // console.log(realTimedata.join("")); 
                 res.write(realTimedata.join(""))                 
               }

              

            })
            .on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);
                res.end();

            })
            .on("error",function(req,res){
                console.log("inside error")
                res.write("wrong name")
            });
    }
    else{
        requests(`https://api.openweathermap.org/data/2.5/weather?q=Raigarh&appid=4c9c5640d42e2a4ed796276d54ff1c0e&units=metric`)
            .on('data', (chunk) => {

                const objData = JSON.parse(chunk)
                const arrData = [objData];
                // console.log(arrData);
                // console.log(arrData[0].weather[0].main);
                const realTimedata = arrData.map(val => replaceval(homeFile, val));
                // console.log(realTimedata.join(""));
                res.write(realTimedata.join(""))
            })
            .on('end', function (err) {
                if (err) return console.log('connection closed due to errors', err);
                res.end();

            });
    }

})







app.listen(port,()=>{
    console.log(`listening to port number ${port}`)
})