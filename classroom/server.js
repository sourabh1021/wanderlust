const express = require("express");
const app = express(); 
const users = require("./router/users");
const posts  = require("./router/posts")
const cookieParser = require("cookie-parser")

app.use(cookieParser("secretcode"))

app.get("/getsignedcookie",(req,res)=>{
    res.cookie("Made-IN","India",{signed:true})
    res.send("Signed cookie sent")
})

app.get("/verify",(req,res)=>{
    console.log(req.signedCookies)
    res.send("verified")
})

app.get("/getcookie",(req,res)=>{
    res.cookie("greet" , "hello"); // name and value
    res.cookie("madeIn" , "india"); // name and value
    res.send("Sent you some cookie!")
})

app.get("/greet",(req,res)=>{
    let {name = "anonymous"}= req.cookies
    res.send(`hi, ${name}`);
})

app.get("/",(req,res)=>{
    console.dir(req.cookies)
    res.send("Welcome to Root")
})

// users//
app.use("/users",users)

// Posts
app.use("/posts",posts)


app.listen(3000 , ()=>{
    console.log("server is listening at 3000")
})