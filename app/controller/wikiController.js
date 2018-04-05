const express = require('express');
const router = express.Router();
const Wiki = require('../models').Wiki;
const wikiQueries = require ('../queries/wiki');
const Authorizer = require('../policy/wiki');
const markdown = require( "markdown" ).markdown;


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
      if(req.body.title.length < 2){
        req.flash("notice", "Title must be at least 2 characters long");
        res.redirect("/wiki/new");
        return;
      }
      else if(req.body.body.length < 10){
        req.flash("notice", "Body must be at least 10 characters long");
        res.redirect("/wiki/new");
        return;
      }
      wikiQueries.create(req, (err,wiki)=>{
        if(err){
          req.flash("notice", err);
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

    wikiQueries.getWiki(req.params.id, (err,wiki)=>{
      if(err){
        req.flash("notice", err);
        console.log(err);
        res.redirect("/wiki");
      }
      else {
        const authorized = new Authorizer(req.user, wiki).show();

        if(authorized){
          console.log(wiki.body);
          wiki.body = markdown.toHTML(wiki.body);

            console.log("AFTER");
            console.log(wiki.body);
          res.render('wiki/show', {wiki});
        }
        else {
          req.flash("notice", "You are not authorized for this action");
          res.redirect('/wiki');
        }
      }
    })
  },

  edit(req,res,next){
    wikiQueries.getWiki(req.params.id, (err,wiki)=>{
      if(err){
        req.flash("notice", err);
        console.log(err);
        res.redirect("/wiki");
      }
      else {
        const authorized = new Authorizer(req.user, wiki).edit();
        if(authorized){
          res.render('wiki/edit', {wiki});
        }
        else {
          req.flash("notice", "You are not authorized for this action");
          res.redirect(`/wiki/${wiki.id}`);
        }
      }
    })
  },

  update(req,res,next){
    wikiQueries.updateWiki(req, (err,wiki)=>{
      if(err){
        req.flash("notice", err);
        console.log(err);
        res.redirect("/wiki/${wiki.id}/edit");
      }
      else {
        res.redirect(`/wiki/${wiki.id}`);
      }
    })
  },

  delete(req,res,next){
    wikiQueries.deleteWiki(req, (err,wki)=>{
      if(err){
        req.flash("notice", err);
        console.log(err);
        res.redirect(`/wiki/${wiki.id}`);
      }
      else {
        res.redirect(`/wiki`);
      }
    })
  }




};
