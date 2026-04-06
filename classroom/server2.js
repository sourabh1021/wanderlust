//1 npm i express-session
//2 npm i connect-flash
const express = require("express");
const app = express(); 
const users = require("./router/users");
const posts  = require("./router/posts")
const session = require("express-session")
const flash = require("connect-flash");
const { name } = require("ejs");
const path = require("path")

const sessionoption = {secret:"sourabh",resave:false,saveUninitialized:true}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(session(sessionoption))
app.use(flash())

app.use((req,res,next)=>{
    res.locals.successmsg  = req.flash("success") //Stores that message in res.locals 
    res.locals.errmsg  = req.flash("error") 
    // form using local messages  can use in all views file
    next()
})

app.get("/count",(req,res)=>{
    if(req.session.count){ // req.session tracks single session 
        req.session.count ++
    }else{
        req.session.count = 1
    }
    res.send(`You sent a requset ${req.session.count} times!`)
})


app.get("/register",(req,res)=>{
    const {name = "anonymous"} = req.query
    req.session.name = name
    // res.send(name)
    if(name === "anonymous"){
        req.flash("error","user not register") // key , message
    }else{
        req.flash("success","user register successfully") // key , message
    }
    res.redirect("/hello")
})


app.get("/hello",(req,res)=>{
    // console.log(req.flash("success"))
    res.render("page.ejs",{name:req.session.name })  // access by key
    // here we are in same session  
})

// app.get("/test",(req,res)=>{
//     res.send("test successful!")  // we get sesion id in cookie section
// })

app.listen(3000 , ()=>{
    console.log("server is listening at 3000")
})