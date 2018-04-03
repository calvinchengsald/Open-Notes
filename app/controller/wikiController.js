const express = require('express');
const router = express.Router();
const Wiki = require('../models').Wiki;
const wikiQueries = require ('../queries/wiki');


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
  },

  show(req,res,next){
    wikiQueries.getWiki(req.params.id, (err,wiki)=>{
      if(err){
        req.flash("error", err);
        res.redirect("/wiki");
      }
      else {
        res.render('wiki/show', {wiki});
      }
    })
  },

  edit(req,res,next){
    wikiQueries.getWiki(req.params.id, (err,wiki)=>{
      if(err){
        req.flash("error", err);
        res.redirect("/wiki");
      }
      else {
        res.render('wiki/edit', {wiki});
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
