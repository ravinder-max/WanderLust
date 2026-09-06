if(process.env.NODE_ENV != "production"){
require("dotenv").config()
}



const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError=require("./utils/ExpressErrors.js");
const flash = require('connect-flash');
const listingRouter = require('./routes/listings.js');
const reviewRouter = require('./routes/reviews.js');
const userRouter = require('./routes/user.js');
const session = require('express-session');
const dbUrl = process.env.ATLASDB_URL;
const { MongoStore } = require('connect-mongo');

const store= MongoStore.create({
    mongoUrl: dbUrl,
    crypto:{
        secret: process.env.SECRET,
    },
    touchAfter:24*3600,
});
store.on("error",(err)=>{
    console.log("ERROR in MONGO SESSION STORE",err);
})
const sessionoption={
    store,
    secret :process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie :{
        expires : Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpsOnly: true,
    }
};


//requiring passport and user
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');

app.use(session(sessionoption));
app.use(flash());
// using passport for authenticate 

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

main()
.then(()=>
    {console.log("connecting successful to DB")})
.catch(err => console.log(err));


async function main() {
  await mongoose.connect(dbUrl);
};


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
const wrapAsync =require("./utils/wrapAsync.js");

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser=req.user;
    next();
});
app.get("/", (req, res) => {
    res.redirect("/listings");
});

app.use('/listings', listingRouter);
app.use('/listings/:id/reviews', reviewRouter);
app.use('/',userRouter);
app.get("/demoUser",async (req,res)=>{
    let fakeUser = new User({
        email: "Student@gmail.com",
        username: "delta-student"
    });
    let registeredUser = await User.register(fakeUser,"Password");
    res.send(registeredUser);
});

// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","namste");
//     res.send("cookie alredy sent");
// })

const port = process.env.PORT || 8080;
app.listen(port,()=>{
    console.log(`server is listening on port ${port}`);
});



app.all("/*splat",(req,res,next)=>{
 next(new ExpressError(404,'Page not found'));
});

app.use((err,req,res,next)=>{
    
    let {statusCode = 500,message = 'Something went Wrong'}=err;
    if(statusCode >= 500){
        console.log(message);
    }
    res.render("error.ejs",{message}) ;
});
