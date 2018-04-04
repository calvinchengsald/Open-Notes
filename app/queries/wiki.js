const Wiki = require('../models').Wiki;
const Authorizer = require('../policy/wiki');

module.exports = {
  getAllWikis(callback){
    return Wiki.all()
    .then((wikis)=>{
      callback(null, wikis);
    })
    .catch((err)=>{
      console.log(err);
      callback(err, null);
    })
  },

  create(req, callback){
    return Wiki.create({
      title: req.body.title,
      body: req.body.body,
      private: req.body.private,
      userId: req.user.id
    })
    .then((wiki)=>{
      callback(null, wiki);
    })
    .catch((err)=>{
      console.log(err);
      callback(err);
    })
  },

  getWiki(id, callback){
    return Wiki.findById(id)
    .then((wiki) => {
      callback(null, wiki);
    })
    .catch((err) => {
      console.log(err);
      callback(err);
    })
  },

  updateWiki(req, callback){
    return Wiki.findById(req.params.id)
    .then((wiki) => {
      if(!wiki){
        return callback("Wiki not found");
      }
      const authorized = new Authorizer(req.user, wiki).edit();
      if(authorized){
        let updatedWiki = {
          title: req.body.title,
          body: req.body.body,
          private: req.body.private
        };
        wiki.update(updatedWiki, {
          fields: Object.keys(updatedWiki)
        })
        .then(() => {
          callback(null, wiki);
        })
        .catch((err) => {
          console.log(err)
          callback(err);
        });
      }
      else {
        req.flash("notice", "You are not authorized to do that.");
        callback(err);
      }


    });

  },

  deleteWiki(req, callback){
    return Wiki.findById(req.params.id)
    .then((wiki)=>{
      if(!wiki){
        return callback("Wiki not found");
      }
      const authorized = new Authorizer(req.user, wiki).destroy();
      if(authorized){
        wiki.destroy().
        then((delected)=>{
          callback(null, delected);
        })
        .catch((err) => {
          callback(err, wiki);
        })
      }
      else {
        req.flash("notice", "You are not authorized to do that.");
        callback(err);
      }

    });


  },

  makePublic(id, callback){
    return Wiki.all()
    .then((wikis)=>{
      wikis.map((wiki,index)=>{
        if(wiki.private == false || wiki.userId != id){

        }
        else {
          let updatedWiki = {
            private : false
          }
          wiki.update(updatedWiki, {
            fields: Object.keys(updatedWiki)
          })
          .then(() => {

          })
          .catch((err) => {
            console.log(err);
          });
        }

      });
      callback(null, null);
    })
  }

}
