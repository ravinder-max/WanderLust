const express = require('express');
const router = express.Router();
const wrapAsync=require("../utils/wrapAsync");
const User = require("../models/user");
const passport = require('passport');
const {saveRedirectUrl} =require("../middleware");
const userController = require("../controllers/user")

router.get("/signup",userController.signupFormRender);

router.post("/signup",wrapAsync(userController.signup));

router.get('/login',(req,res)=>{
    res.render('users/login.ejs');
});

router.post("/login",saveRedirectUrl,passport.authenticate("local",{
    failureRedirect: "/login",
    failureFlash:true,
}),
userController.login);

router.get("/logout",userController.logout);
module.exports=router;