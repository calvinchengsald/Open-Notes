const express = require('express');
const router = express.Router();
const User = require('../models').User;
const userQueries = require ('../queries/user');


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
        req.flash("notice", "Account Created!");
        res.redirect(303, '/');
      }
    });

  },

};
