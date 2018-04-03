
module.exports = {
  ensureAuthenticated(req, res, next){
    if(!req.user){
      res.flash("notice", "You must be signed in to do that!");
      return res.redirect("user/signin");
    }
    else {
      next();
    }
  }
}
