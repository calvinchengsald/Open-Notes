const express = require('express');
const router = express.Router();
const Wiki = require('../models').Wiki;
const wikiQueries = require ('../queries/wiki');
const Authorizer = require('../policy/wiki');


module.exports = {
  index(req, res, next){
    wikiQueries.getAllWikis((err,wikis) =>{
      if(err){
        req.flash("error", err);
        res.redirect("/");
      }
      else {
        res.render("wiki/wiki", {wikis});
      }
    });
  },

  new(req,res,next){
    res.render("wiki/new");
  },

  create(req,res,next){

    const authorized = new Authorizer(req.user).new();
    if(authorized){
      wikiQueries.create(req, (err,wiki)=>{
        if(err){
          req.flash("error", err);
          console.log(err);
          res.redirect("/wiki");
        }
        else {
          req.flash("notice", "Successfully created");
          res.redirect(`/wiki/${wiki.id}`)
        }
      })
    }
    else {
      req.flash("notice", "You are not authorized for this action");
      res.redirect('/wiki');
    }
  },

  show(req,res,next){

    const authorized = new Authorizer(req.user).show();
    if(authorized){
      wikiQueries.getWiki(req.params.id, (err,wiki)=>{
        if(err){
          req.flash("error", err);
          res.redirect("/wiki");
        }
        else {
          res.render('wiki/show', {wiki});
        }
      })
    }
    else {
      req.flash("notice", "You are not authorized for this action");
      res.redirect('/wiki');
    }
  },

  edit(req,res,next){
    wikiQueries.getWiki(req.params.id, (err,wiki)=>{

      const authorized = new Authorizer(req.user, wiki).edit();
      if(authorized){
        if(err){
          req.flash("error", err);
          res.redirect("/wiki");
        }
        else {
          res.render('wiki/edit', {wiki});
        }
      }
      else {
        req.flash("notice", "You are not authorized for this action");
        res.redirect(`/wiki/${wiki.id}`);
      }
    })
  },

  update(req,res,next){
    wikiQueries.updateWiki(req, (err,wiki)=>{
      if(err){
        req.flash("error", err);
        res.redirect("/wiki");
      }
      else {
        res.redirect(`/wiki/${wiki.id}`);
      }
    })
  },

  delete(req,res,next){
    wikiQueries.deleteWiki(req, (err,wki)=>{
      if(err){
        req.flash("error", err);
        res.redirect(`/wiki/${wiki.id}`);
      }
      else {
        res.redirect(`/wiki`);
      }
    })
  }




};
