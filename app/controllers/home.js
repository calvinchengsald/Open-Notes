const express = require('express');
const router = express.Router();
const db = require('../models');
const userRoutes = require('../routes/users.js');
const wikiRoutes = require('../routes/wiki.js');

module.exports = (app) => {
  app.use('/', router);
  app.use( userRoutes);
  app.use( wikiRoutes);
};

router.get('/', (req, res, next) => {
  res.render("static/index.ejs", {
    title: "Open Notes"

  });
  
});
