const express = require('express');
const router = express.Router();
const User = require('../models').User;
const userQueries = require ('../queries/user');
const passport = require("passport");


module.exports = {
  signUp(req, res, next){
    res.render("user/signup");
  },

  signUpPost(req, res, next){
    userQueries.signUp(req.body, (err,err2 ,result) =>{
      if(err){
        req.flash("error", "check logs");
        res.redirect(303, '/user/signup');
      }
      else if( err2){
        req.flash("notice", err2.msg);
        res.redirect(303, '/user/signup');
      }
      else {
        req.flash("notice", "Please confirm email");
        res.redirect( '/');
      }
    });
  },

  create(req, res, next){
    userQueries.create(req.body, (err,err2 ,result) =>{
      if(err || err2){
        res.render("user/signup" , {errors: err, error: err2});
      }
      else {
        passport.authenticate("local")(req, res, function () {
      //    console.log("i am here!");
          if(!req.user){
            req.flash("notice", "Sign in failed. Please try again.")
            res.redirect("/user/signin");
      //      console.log("i am here failed!");
          } else {
            req.flash("notice", "Account Created!");
            res.redirect("/");
      //      console.log("i am here passed!");
          }
        })
      }
    });
  },

  signIn(req, res, next){
    res.render("user/signin");
  },

  signInPost(req, res, next){
    passport.authenticate("local")(req, res, function () {
  //    console.log("i am here!");
      if(!req.user){
        req.flash("notice", "Sign in failed. Please try again.")
        res.redirect("/user/signin");
  //      console.log("i am here failed!");
      } else {
        req.flash("notice", `Welcome ${req.body.email}`);
        res.redirect("/");
  //      console.log("i am here passed!");
      }
    })
  },

  signOut(req,res, next){
    if(req.user){
      req.logout();
      req.flash("notice", "You've successfully signed out!");
      res.redirect("/");
    }
    else {
      req.flash("notice", "You've already signed out!");
      res.redirect("/");
    }
  }


};
