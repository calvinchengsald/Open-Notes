const express = require('express');
const router = express.Router();
const db = require('../models');
const userRoutes = require('../routes/users.js');

module.exports = (app) => {
  app.use('/', router);
  app.use( userRoutes);
};

router.get('/', (req, res, next) => {
  db.Article.findAll().then((articles) => {
    // res.render('index', {
    //   title: 'Generator-Express MVC',
    //   articles: articles
    // });
    res.render("static/index.ejs", {
      title: "Open Notes"

    });
  });
});
