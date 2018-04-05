const express = require('express');
const router = express.Router();
const Wiki = require('../models').Wiki;
const User = require('../models').User;
const collabQueries = require ('../queries/collaborator');
const wikiQueries = require ('../queries/wiki');
const Authorizer = require('../policy/wiki');


module.exports = {

  add(req,res,next){
    wikiQueries.getWiki(req.params.id,(err,wiki)=>{
      const authorized = new Authorizer(req.user, wiki).editCollab();
      if(authorized){
        collabQueries.create(req, (err,collab)=>{
          if(err){
            req.flash("notice", err);
            res.redirect(`/wiki/${req.params.id}/edit`);
          }
          else {
            res.redirect(`/wiki/${req.params.id}/edit`);
          }
        })
      }
      else {
        req.flash("notice", "You aren not authorized to do that");
        res.redirect(`/wiki/${req.params.id}/edit`);
      }
    })

  },

  subtract(req,res,next){
    wikiQueries.getWiki(req.params.id,(err,wiki)=>{
      const authorized = new Authorizer(req.user, wiki).editCollab();
      if(authorized){
        collabQueries.delete(req, (err,collab)=>{
          if(err){
            req.flash("notice", err);
            res.redirect(`/wiki/${req.params.id}/edit`);
          }
          else {
            res.redirect(`/wiki/${req.params.id}/edit`);
          }
        })
      }
      else {
        req.flash("notice", "You aren not authorized to do that");
        res.redirect(`/wiki/${req.params.id}/edit`);
      }
    })
  }



};
