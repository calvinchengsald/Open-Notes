
module.exports = {
  ensureAuthenticated(req, res, next){
    if(!req.user){
      req.flash("notice", "You must be signed in to do that!");
      return res.redirect("/user/signin");
    }
    else {
      next();
    }
  },
  ensureNormalMember(req, res, next){
    if(!req.user){
      req.flash("notice", "You must be signed in to do that!");
      return res.redirect("/user/signin");
    }
    else if(req.params.id != req.user.id){
      req.flash("notice", "You are not authorized for this account!");
      return res.redirect(`/user/${req.params.id}`);
    }
    else if (req.user.role === 0){
      next();
    }
    else {
      req.flash("notice", "Your account is already upgraded!");
      return res.redirect(`/user/${req.params.id}`);
    }
  },
  ensurePremiumMember(req, res, next){
    if(!req.user){
      req.flash("notice", "You must be signed in to do that!");
      return res.redirect("/user/signin");
    }
    else if(req.params.id != req.user.id){
      req.flash("notice", "You are not authorized for this account!");
      return res.redirect(`/user/${req.params.id}`);
    }
    else if (req.user.role === 1){
      next();
    }
    else {
      req.flash("notice", "Your account is not at Premium Status!");
      return res.redirect(`/user/${req.params.id}`);
    }
  },
}
